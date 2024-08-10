'use client'

import { memo } from 'react'
import isEqual from 'react-fast-compare'

import { useDictionary } from '@/providers/dictionary-provider'
import { ExChangeTab } from '@/types/home'
import { cn } from '@/utils/cn'

interface IExchangeLabelProps {
  className?: string
  type: ExChangeTab
}
const ExchangeLabel = memo(function ExchangeLabel({ className, type }: IExchangeLabelProps) {
  const { dictionary } = useDictionary()
  return (
    <span
      className={cn(
        type === ExChangeTab.Buy && 'text-success',
        type === ExChangeTab.Sell && 'text-error',
        className,
      )}
    >
      {type === ExChangeTab.Buy && dictionary.Buy}
      {type === ExChangeTab.Sell && dictionary.Sell}
    </span>
  )
}, isEqual)
ExchangeLabel.displayName = 'ExchangeLabel'

export { ExchangeLabel }
