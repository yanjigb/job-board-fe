import { Gauge, HandCoins, List, ShieldCheck, User, Wallet } from 'lucide-react'

import RouteNames from '@/constants/routes'
import { LocaleKeys } from '@/types/locales'

export const getSideBar = (dictionary: LocaleKeys) => [
  { href: RouteNames.Dashboard, label: dictionary.Dashboard, icon: Gauge },
  { href: RouteNames.Kyc, label: dictionary.KYC, icon: ShieldCheck },
  { href: RouteNames.Account, label: dictionary.Account, icon: User },
  { href: RouteNames.Wallet, label: dictionary.Wallet, icon: Wallet },
  { href: RouteNames.WithdrawInternal, label: dictionary['Withdraw Internal'], icon: List },
  { href: RouteNames.TransactionHistory, label: dictionary['Transaction History'], icon: User },
  { href: '/dashboard/#', label: dictionary['P2P Trading'], icon: HandCoins },
]
