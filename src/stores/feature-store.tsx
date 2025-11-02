import type { ReactNode } from 'react';
import type { StoreStatus } from 'src/types/common';

// use this to pullout entire feature object in consumer import { useShallow } from 'zustand/shallow'
import { create, useStore } from 'zustand';
import { useState, useContext, createContext } from 'react';

import { getFeatures } from 'src/api/features';

type FeatureActions = {
  loadOnce: () => Promise<void>;
  refresh: () => Promise<void>;
};

interface FeatureStore {
  features: Feature[];
  status: StoreStatus;
  actions: FeatureActions;
}

const createFeatureStore = () =>
  create<FeatureStore>()((set, get) => ({
    features: [],
    status: 'idle',
    actions: {
      async loadOnce() {
        const { status, features } = get();
        if (status === 'success' && features.length) return;

        set({ status: 'loading' });
        try {
          const data = await getFeatures(1, 10);
          set({ features: data, status: 'success' });
        } catch (err) {
          set({ status: 'error' });
          throw err;
        }
      },
      async refresh() {
        set({ status: 'loading' });
        try {
          const data = await getFeatures(1, 10);
          set({ features: data, status: 'success' });
        } catch (err) {
          set({ status: 'error' });
          throw err;
        }
      },
    },
  }));

const FeatureStoreContext = createContext<ReturnType<typeof createFeatureStore> | null>(null);

export function FeatureStoreProvider({ children }: { children: ReactNode }) {
  const [featureStore] = useState(createFeatureStore);

  return (
    <FeatureStoreContext.Provider value={featureStore}>{children}</FeatureStoreContext.Provider>
  );
}

export function useFeatures<U>(selector: (state: FeatureStore) => U) {
  const store = useContext(FeatureStoreContext);

  if (store === null) {
    throw new Error('useFeatures must be used with a provider');
  }

  return useStore(store, selector);
}
