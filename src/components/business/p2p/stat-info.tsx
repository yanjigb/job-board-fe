import React, { memo, ReactNode } from 'react'
import isEqual from 'react-fast-compare'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

import { cn } from '@/utils/cn'

interface IStatProps {
  value: ReactNode
  label: ReactNode
  className?: string
}
function Stat({ value, label, className }: IStatProps) {
  return (
    <span
      className={cn(
        'stat inline-flex items-center gap-[2px] text-body/small/regular font-light [&_.label]:text-text-primary',
        className,
      )}
    >
      <span className="value">{value}</span>
      <span className="label">{label}</span>
    </span>
  )
}

const StatThumbsUp = memo(function StatThumbsUp({
  size = 16,
  label,
  className = '[&_.label]:text-success gap-1',
}: Partial<IStatProps> & { size?: number }) {
  return (
    <Stat
      value={<ThumbsUp size={size} strokeWidth={1.25} className="text-success" />}
      label={label}
      className={className}
    />
  )
}, isEqual)

const StatThumbsDown = memo(function StatThumbsDown({
  label,
  size = 16,
  className = '[&_.label]:text-error gap-1',
}: Partial<IStatProps> & { size?: number }) {
  return (
    <Stat
      value={<ThumbsDown size={size} strokeWidth={1.25} className="text-error" />}
      label={label}
      className={className}
    />
  )
}, isEqual)

interface IStatsProps {
  children: ReactNode
  className?: string
}
function Stats({ className, children }: IStatsProps) {
  return <p className={cn('flex gap-3', className)}>{children}</p>
}

export { Stats, Stat, StatThumbsUp, StatThumbsDown }
