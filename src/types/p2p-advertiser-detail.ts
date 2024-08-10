import { P2pTradingType } from './p2p'

export interface IAd {
  _id: string
  type: P2pTradingType
}

export enum FeedbackStatus {
  Positive = 'Positive',
  Negative = 'Negative',
}

export interface IFeedback {
  _id: string
  message: string
  url: string
  username: string
}

export interface IStatisticItem {
  label: string
  value: string
  tooltipContent?: React.ReactNode
  anotherContent?: React.ReactNode
}
