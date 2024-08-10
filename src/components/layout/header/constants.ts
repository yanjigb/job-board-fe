import { Gauge, HandCoins, ShieldCheck, User as UserIcon, Wallet } from 'lucide-react'

import RouteNames from '@/constants/routes'
import { LocaleKeys } from '@/types/locales'

export const getNavLinks = (dictionary: LocaleKeys) => [
  {
    label: dictionary.Home,
    href: RouteNames.Home,
  },
  {
    label: dictionary.P2P,
    href: RouteNames.P2p,
  },
  {
    label: dictionary['P2P User Center'],
    href: RouteNames.UserCenter,
  },
  {
    label: dictionary['My ADs'],
    href: RouteNames.MyAds,
  },
  {
    label: dictionary['Post AD'],
    href: RouteNames.PostAd,
  },
]

export const getUserMenus = (dictionary: LocaleKeys) => [
  {
    icon: Gauge,
    label: dictionary.Dashboard,
    href: RouteNames.Dashboard,
  },
  {
    icon: UserIcon,
    label: dictionary['My profile'],
    href: '/##',
  },
  {
    icon: ShieldCheck,
    label: dictionary.KYC,
    href: RouteNames.Kyc,
  },
  {
    icon: Wallet,
    label: dictionary.Wallet,
    href: RouteNames.Wallet,
  },
  {
    icon: UserIcon,
    label: dictionary['Transaction history'],
    href: RouteNames.TransactionHistory,
  },
  {
    icon: HandCoins,
    label: dictionary['P2P Trading'],
    href: '/##',
  },
]
