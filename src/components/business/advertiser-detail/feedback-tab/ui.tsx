import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { format } from 'date-fns'

import { AppAvatar } from '@/components/common/app-avatar'
import AppProgress from '@/components/common/app-progress'

import { StatThumbsUp } from '@/components/business/p2p/stat-info'
import { IFeedback } from '@/types/p2p-advertiser-detail'
import { cn } from '@/utils/cn'
import { getTwoInitials, sliceEmail } from '@/utils/common'

const FeedbackProgress = memo(function FeedbackProgress({
  value,
  label,
  className,
  icon,
}: {
  value: number
  label: string
  className?: string
  icon: React.ReactNode
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span>{icon}</span>
      <span className="min-w-[7.5rem]">
        <AppProgress value={value} />
      </span>
      <span className="text-body/small/regular">{label}</span>
    </div>
  )
}, isEqual)
FeedbackProgress.displayName = 'FeedbackProgress'

const FeedBackComment = memo(function FeedBackComment({ item }: { item: IFeedback }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <AppAvatar fallback={getTwoInitials(item.username)} url={item.url} />

      <div className="w-full space-y-3">
        <p className="flex justify-between gap-3">
          <span>
            <span>{sliceEmail('sacsophone@gmail.com')}</span>
            <span className="ml-2 rounded-sm bg-another-6 px-2 py-2 text-body/small/regular text-blueLight">
              MTNMobileMoney
            </span>
          </span>

          <span>
            <span className="whitespace-nowrap text-body/medium/regular font-light text-text-primary">
              {format(new Date('2024-07-03'), 'yyyy-MM-dd')}
            </span>
          </span>
        </p>

        <StatThumbsUp
          size={20}
          label={item.message}
          className="items-start gap-2 text-text-primary [&_.value]:mt-[0.125rem]"
        />
      </div>
    </div>
  )
}, isEqual)
FeedBackComment.displayName = 'FeedBackComment'

export { FeedbackProgress, FeedBackComment }
