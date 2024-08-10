import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

import { StoreKeys } from './store-keys'

interface AuthStoreState {
  user: string | null
  setUser: (user: string | null) => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
}))

export const authStoreActions = {
  setUser: (user: string | null) => useAuthStore.getState().setUser(user),
}

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool(StoreKeys.AuthStore, useAuthStore)
}
