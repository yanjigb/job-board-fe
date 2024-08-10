import { memo } from 'react'
import isEqual from 'react-fast-compare'

import TooltipInfo from '@/components/common/tooltip-info'

import { useDictionary } from '@/providers/dictionary-provider'
import { IStatisticItem } from '@/types/p2p-advertiser-detail'
import { cn, cnWithClxs } from '@/utils/cn'

const StatLabel = memo(function StatLabel({
  children,
  tooltipContent,
  className,
}: {
  children: React.ReactNode
  tooltipContent?: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cnWithClxs(
        'text-body/extra/small/regular font-light',
        'flex items-center gap-1 text-text-primary',
        className,
      )}
    >
      <span>{children}</span> {tooltipContent && <TooltipInfo content={tooltipContent} />}
    </p>
  )
}, isEqual)

const StatisticItem = memo(function StatisticItem({ item }: { item: IStatisticItem }) {
  return (
    <div key={item.label} className="space-y-1">
      <StatLabel tooltipContent={item.tooltipContent}>{item.label}</StatLabel>
      <p className="text-body-large/regular font-light">{item.value}</p>
      {item.anotherContent}
    </div>
  )
}, isEqual)
StatisticItem.displayName = 'StatisticItem'

interface IStatisticBuySell extends React.HTMLAttributes<HTMLParagraphElement> {
  buy: number
  sell: number
}
const StatisticBuySell = memo(function StatisticBuySell({
  buy,
  sell,
  className,
  ...rest
}: IStatisticBuySell) {
  const { dictionary } = useDictionary()
  return (
    <p className={cn('space-x-1 text-body/extra/small/regular', className)} {...rest}>
      <span className="text-success">
        {dictionary.Buy} {buy}
      </span>
      <span>/</span>
      <span className="text-error">
        {dictionary.Sell} {sell}
      </span>
    </p>
  )
}, isEqual)
StatisticBuySell.displayName = 'StatisticBuySell'

export { StatLabel, StatisticItem, StatisticBuySell }
