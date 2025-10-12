import type { ReactNode } from 'react';

// use this to pullout entire feature object in consumer import { useShallow } from 'zustand/shallow'
import { create, useStore } from 'zustand';
import { useState, useContext, createContext } from 'react';

type FeatureActions = {
  setFeatures: (features: Feature[]) => void;
};

type FeatureStoreState = { features: Feature[] };
type FeatureStore = FeatureStoreState & FeatureActions;

const createFeatureStore = () =>
  create<FeatureStore>()((set) => ({
    features: [],
    actions: {
      setFeatures: (feats: Feature[]) => set(() => ({ features: feats })),
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
