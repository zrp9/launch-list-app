import { createContext, ReactNode, useContext, useState } from 'react';
import { create, useStore } from 'zustand';

interface UserActions {
  setUser: (user: User) => void;
}

interface UserStore {
  user: User | null;
  actions: UserActions;
}

const createUserStore = () =>
  create<UserStore>()((set) => ({
    user: null,
    actions: {
      setUser: (usr: User) => set(() => ({ user: usr })),
    },
  }));

const UserStoreContext = createContext<ReturnType<typeof createUserStore> | null>(null);

export function UserStoreProvider({ children }: { children: ReactNode }) {
  const [userStore] = useState(createUserStore);

  return <UserStoreContext.Provider value={userStore}>{children}</UserStoreContext.Provider>;
}

export function useUser<U>(selector: (state: UserStore) => U) {
  const store = useContext(UserStoreContext);

  if (store === null) {
    throw new Error('useUser must be used with a provider');
  }

  return useStore(store, selector);
}
