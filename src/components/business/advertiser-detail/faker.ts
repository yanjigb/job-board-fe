import { P2pTradingType } from '@/types/p2p'
import { IAd } from '@/types/p2p-advertiser-detail'

export const ONLINE_BUY_ADS: IAd[] = [
  { _id: '0', type: P2pTradingType.Buy },
  { _id: '1', type: P2pTradingType.Buy },
]

export const ONLINE_SELL_ADS: IAd[] = [
  { _id: '0', type: P2pTradingType.Sell },
  { _id: '1', type: P2pTradingType.Sell },
]
