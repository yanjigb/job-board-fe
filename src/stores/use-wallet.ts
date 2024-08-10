import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

import { StoreKeys } from './store-keys'

interface INetWork {
  symbol: string
  name: string
  estimatedTime: string
  confirmations: number
}

interface WalletStoreState {
  networks: INetWork[]
}

export const useWalletStore = create<WalletStoreState>(() => ({
  networks: [
    {
      symbol: 'TRX',
      name: 'Tron (TRC20)',
      estimatedTime: '≈ 2 mins',
      confirmations: 1,
    },
    {
      symbol: 'BSC',
      name: 'BNB Smart Chain (BEP20)',
      estimatedTime: '≈ 3 mins',
      confirmations: 15,
    },
    {
      symbol: 'ETH',
      name: 'Ethereum (ERC20)',
      estimatedTime: '≈ 4 mins',
      confirmations: 6,
    },
  ],
}))

export const walletStoreActions = {}

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool(StoreKeys.WalletStore, useWalletStore)
}
