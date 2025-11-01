import type { ReactNode } from 'react';
import type { StoreStatus } from 'src/types/common';

import { create, useStore } from 'zustand';
import { useState, useContext, createContext } from 'react';

import { getQuePosition } from 'src/actions/user';

interface UserActions {
  getQuePosition: (email: string) => Promise<void>;
  refresh: () => Promise<void>;
}

interface UserStore {
  user: Partial<User> | null;
  status: StoreStatus;
  actions: UserActions;
}

const createUserStore = () =>
  create<UserStore>()((set, get) => ({
    user: null,
    status: 'idle',
    actions: {
      async getQuePosition(email: string) {
        const { status, user } = get();
        if (status === 'success' && user) return;

        set({ status: 'loading' });
        try {
          const data = await getQuePosition(email);
          set((state) => ({
            ...state,
            user: {
              ...state.user,
              quePosition: data,
            },
            status: 'success',
          }));
        } catch (err) {
          set({ status: 'error' });
          throw err;
        }
      },
      async refresh() {},
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
