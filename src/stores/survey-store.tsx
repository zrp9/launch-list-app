import type { ReactNode } from 'react';
import type { StoreStatus } from 'src/types/common';

import { create, useStore } from 'zustand';
import { useState, useContext, createContext } from 'react';

import { getSurvey } from 'src/actions/survey';

interface SurveyActions {
  loadOnce: () => Promise<void>;
  refresh: () => Promise<void>;
}

interface SurveyStore {
  survey: Survey | null;
  status: StoreStatus;
  actions: SurveyActions;
}

const createSurveyStore = () =>
  create<SurveyStore>()((set, get) => ({
    survey: null,
    status: 'idle',
    actions: {
      async loadOnce() {
        const { status, survey } = get();
        if (status === 'success' && survey) return;

        set({ status: 'loading' });
        try {
          const data = await getSurvey();
          set({ survey: data, status: 'success' });
        } catch (err) {
          set({ status: 'error' });
          throw err;
        }
      },
      async refresh() {
        set({ status: 'loading' });
        try {
          const data = await getSurvey();
          set({ survey: data, status: 'success' });
        } catch (err) {
          set({ status: 'error' });
          throw err;
        }
      },
    },
  }));

const SurveyStoreContext = createContext<ReturnType<typeof createSurveyStore> | null>(null);

export function SurveyStoreProvider({ children }: { children: ReactNode }) {
  const [surveyStore] = useState(createSurveyStore);

  return <SurveyStoreContext.Provider value={surveyStore}>{children}</SurveyStoreContext.Provider>;
}

export function useSurvey<U>(selector: (state: SurveyStore) => U) {
  const store = useContext(SurveyStoreContext);

  if (store === null) {
    throw new Error('useSurvey must be used with a provider');
  }

  return useStore(store, selector);
}
