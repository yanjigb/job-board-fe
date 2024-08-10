import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

import { StoreKeys } from './store-keys'

interface P2pStoreState {
  isOpenModalTradeP2p: boolean
  setModalTradeP2p: (isOpen: boolean) => void
}

export const useP2pStore = create<P2pStoreState>((set) => ({
  isOpenModalTradeP2p: false,
  setModalTradeP2p: (isOpen: boolean) => set({ isOpenModalTradeP2p: isOpen }),
}))

export const p2pStoreActions = {
  setModalTradeP2p: useP2pStore.getState().setModalTradeP2p,
}

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool(StoreKeys.P2pStore, useP2pStore)
}
