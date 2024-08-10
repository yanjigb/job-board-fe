import { ExChangeTab } from '@/types/home'
import { LocaleKeys } from '@/types/locales'

export const getExchangeTabs = (dictionary: LocaleKeys) => [
  {
    label: dictionary.Buy,
    value: ExChangeTab.Buy,
  },
  {
    label: dictionary.Sell,
    value: ExChangeTab.Sell,
  },
]
