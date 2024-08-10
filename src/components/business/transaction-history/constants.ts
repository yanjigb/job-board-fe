import { ALL_VALUE } from '@/constants'
import { LocaleKeys } from '@/types/locales'

export const getTypeOptions = (dictionary: LocaleKeys) => [
  { label: dictionary.Deposit, value: 'deposit' },
  { label: dictionary.Withdraw, value: 'withdraw' },
]

export const getTimeOptions = (dictionary: LocaleKeys) => [
  { label: dictionary['Past 7 days'], value: '7' },
  { label: dictionary['Past 30 days'], value: '30' },
  { label: dictionary['Past 90 days'], value: '90' },
]

export const getStatusOptions = (dictionary: LocaleKeys) => [
  { label: dictionary.All, value: ALL_VALUE },
  { label: dictionary.Completed, value: 'completed' },
  { label: dictionary.Pending, value: 'pending' },
]
