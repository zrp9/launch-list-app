import type { ReactNode } from 'react';
import type { StoreStatus } from 'src/types/common';

import { create, useStore } from 'zustand';
import { useState, useContext, createContext } from 'react';

import { getTestimonials } from 'src/actions/testimonials';

type TestimonialActions = {
  loadOnce: () => Promise<void>;
  refresh: () => Promise<void>;
};

interface TestimonialStore {
  testimonials: Testimonial[];
  status: StoreStatus;
  actions: TestimonialActions;
}

const createTestimonialStore = () =>
  create<TestimonialStore>()((set, get) => ({
    testimonials: [],
    status: 'idle',
    actions: {
      async loadOnce() {
        const { status, testimonials } = get();
        if (status === 'success' && testimonials.length) return;

        set({ status: 'loading' });
        try {
          const data = await getTestimonials();
          set({ testimonials: data, status: 'success' });
        } catch (err: any) {
          set({ status: 'error' });
          throw err;
        }
      },
      async refresh() {
        set({ status: 'loading' });
        try {
          const data = await getTestimonials();
          set({ testimonials: data, status: 'success' });
        } catch (err) {
          set({ status: 'error' });
          throw err;
        }
      },
    },
  }));

const TestimonialStoreContext = createContext<ReturnType<typeof createTestimonialStore> | null>(
  null
);

export function TestimonialStoreProvider({ children }: { children: ReactNode }) {
  const [testimonialStore] = useState(createTestimonialStore);
  return (
    <TestimonialStoreContext.Provider value={testimonialStore}>
      {children}
    </TestimonialStoreContext.Provider>
  );
}

export function useTestimonials<U>(selector: (state: TestimonialStore) => U) {
  const store = useContext(TestimonialStoreContext);
  if (store === null) {
    throw new Error('useTestimonials must be used with a provider');
  }

  return useStore(store, selector);
}
