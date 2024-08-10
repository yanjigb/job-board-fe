import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { format } from 'date-fns'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

import { AppAvatar } from '@/components/common/app-avatar'
import AppProgress from '@/components/common/app-progress'
import { Empty } from '@/components/common/empty'

import { StatThumbsUp } from '@/components/business/p2p/stat-info'
import { useDictionary } from '@/providers/dictionary-provider'
import { IFeedback } from '@/types/p2p-advertiser-detail'
import { cn } from '@/utils/cn'
import { getTwoInitials, sliceEmail } from '@/utils/common'

const Progress = memo(function Progress({
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
Progress.displayName = 'Progress'

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

function FeedbackTab() {
  const { dictionary } = useDictionary()
  return (
    <div>
      <div className="flex flex-col items-start gap-16 md:flex-row">
        <div className="flex min-w-[19.875rem] items-end gap-8">
          <div>
            <p className="text-heading-6">0.00 %</p>
            <p className="text-body/medium/medium font-normal text-text-primary">
              0 {dictionary.Reviews}
            </p>
          </div>

          <div className="space-y-2">
            <Progress value={0} label="20" icon={<ThumbsUp size={16} />} className="text-success" />

            <Progress value={0} label="0" icon={<ThumbsDown size={16} />} className="text-error" />
          </div>
        </div>

        <div
          className={cn(
            'relative w-full flex-1 space-y-7',
            "after:absolute after:-left-8 after:top-0 after:h-full after:w-px after:bg-stroke after:content-['']",
          )}
        >
          <Empty />
        </div>
      </div>
    </div>
  )
}

export default memo(FeedbackTab, isEqual)
