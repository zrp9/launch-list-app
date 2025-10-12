import type { ReactNode } from 'react';

import { create, useStore } from 'zustand';
import { useState, useContext, createContext } from 'react';

interface SurveyActions {
  setSurvey: (survey: Survey) => void;
}

interface SurveyStore {
  survey: Survey | null;
  actions: SurveyActions;
}

const createSurveyStore = () =>
  create<SurveyStore>()((set) => ({
    survey: null,
    actions: {
      setSurvey: (surv: Survey) => set(() => ({ survey: surv })),
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
