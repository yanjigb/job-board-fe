import { Album, LayoutDashboard, Logs, PackagePlus, SquarePlus } from 'lucide-react'

import { ALL_VALUE, DEFAULT_VALUE } from '@/constants'
import { LocaleKeys } from '@/types/locales'

export const ASSETS_VALUE_DEFAULT = 'USDT'
export const TYPE_VALUE_DEFAULT = 'BUY'
export const FIAT_VALUE_DEFAULT = 'USD'

export const getAllPayPaymentsDefaultOption = (dictionary: LocaleKeys) => ({
  label: dictionary['All Payments'],
  value: ALL_VALUE,
})

export const getAllRegionsDefaultOption = (dictionary: LocaleKeys) => ({
  label: dictionary['All Regions'],
  value: ALL_VALUE,
})

export const getRefreshingDefaultOption = (dictionary: LocaleKeys) => ({
  label: dictionary.Manual,
  value: ALL_VALUE,
})

export const getPeriodDefaultOption = (dictionary: LocaleKeys) => ({
  label: dictionary.All,
  value: ALL_VALUE,
})

export const PERIOD_LIST = [
  { label: '15', value: '15' },
  { label: '30', value: '30' },
  { label: '45', value: '45' },
  { label: '60', value: '60' },
  { label: '120', value: '120' },
  { label: '180', value: '180' },
  { label: '240', value: '240' },
  { label: '300', value: '300' },
  { label: '360', value: '360' },
]

export const getAdsTypesList = (dictionary: LocaleKeys) => [
  { label: dictionary['Tradable Ads Only'], value: '1' },
  { label: dictionary['Verified Merchant Ads only'], value: '2' },
  { label: dictionary['Ads With No Verification Required'], value: '3' },
]

export const getOrderList = (dictionary: LocaleKeys) => [
  { label: dictionary['Price: lowest to highest'], value: DEFAULT_VALUE },
  { label: dictionary.Trades, value: 'trade_count' },
  { label: dictionary['Completion Rate'], value: 'completion_rate' },
]

export const getPageHeaderP2p = (dictionary: LocaleKeys) => [
  { label: dictionary['P2P Help Center'], href: '/', icon: Album },
  { label: dictionary.Orders, href: '/', icon: Logs },
  { label: dictionary['P2P User Center'], href: '/', icon: LayoutDashboard },
  { label: dictionary['My ads'], href: '/', icon: PackagePlus },
  { label: dictionary['Post new Ad'], href: '/', icon: SquarePlus },
]

export const getP2pTypeList = (dictionary: LocaleKeys) => [
  { label: dictionary.Buy.toUpperCase(), value: 'BUY' },
  { label: dictionary.Sell.toUpperCase(), value: 'SELL' },
]

export const getAmountStep = (dictionary: LocaleKeys) => [
  { label: '25%', value: 25 },
  { label: '50%', value: 50 },
  { label: '75%', value: 75 },
  { label: dictionary.Max, value: 100 },
]
