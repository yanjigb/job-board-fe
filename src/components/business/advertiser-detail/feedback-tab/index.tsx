import React, { memo, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useQueryState } from 'nuqs'

import { Button } from '@/components/ui/button'

import { ALL_VALUE, AVATAR_DEFAULT } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'
import { FeedbackStatus } from '@/types/p2p-advertiser-detail'
import { getTabValue } from '@/utils'
import { cn } from '@/utils/cn'

import { FeedBackComment, FeedbackProgress } from './ui'

function FeedbackTab() {
  const { dictionary } = useDictionary()

  const [statusQuery, setStatusQuery] = useQueryState('status')

  const status = useMemo(
    () => getTabValue(statusQuery, FeedbackStatus, FeedbackStatus.Positive, ALL_VALUE),
    [statusQuery],
  )

  return (
    <div className="space-y-6">
      <ul className="flex items-center gap-10 border-b border-stroke px-[1.5625rem] text-body/medium/medium font-normal text-text-primary">
        {[
          { label: dictionary.All, value: ALL_VALUE },
          { label: `${dictionary.Positive} (175)`, value: FeedbackStatus.Positive },
          { label: `${dictionary.Negative} (1)`, value: FeedbackStatus.Negative },
        ].map((item) => {
          const onClick = () => {
            setStatusQuery(item.value)
          }
          return (
            <Button key={item.label} asChild variant="none" size="none" onClick={onClick}>
              <li
                className={cn(
                  "relative cursor-pointer py-[0.9375rem] after:absolute after:bottom-[-0.0625rem] after:left-0 after:h-[0.125rem] after:w-full after:bg-transparent after:transition-colors after:content-['']",
                  status === item.value && 'text-secondary after:bg-secondary',
                )}
              >
                {item.label}
              </li>
            </Button>
          )
        })}
      </ul>

      <div className="flex flex-col items-start gap-16 md:flex-row">
        <div className="flex min-w-[19.875rem] items-end gap-8">
          <div>
            <p className="text-heading-6">99.43 %</p>
            <p className="text-body/medium/medium font-normal text-text-primary">
              176 {dictionary.Reviews}
            </p>
          </div>

          <div className="w-[10.625rem] space-y-2">
            <FeedbackProgress
              value={100}
              label="20"
              icon={<ThumbsUp size={16} />}
              className="text-success"
            />

            <FeedbackProgress
              value={0}
              label="0"
              icon={<ThumbsDown size={16} />}
              className="text-error"
            />
          </div>
        </div>

        <div
          className={cn(
            'relative w-full flex-1 space-y-7',
            "after:absolute after:-left-8 after:top-0 after:h-full after:w-px after:bg-stroke after:content-['']",
          )}
        >
          {[
            {
              message: 'Fast transaction',
              url: '',
              username: 'TG',
              _id: '1',
            },
            {
              message: 'Transaction rapide,Polie et aimable,Sûre et digne de confiance',
              url: '',
              username: 'TG',
              _id: '2',
            },
            {
              message: 'Fast transaction',
              url: AVATAR_DEFAULT,
              username: 'TG',
              _id: '4',
            },
          ].map((item) => (
            <FeedBackComment key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(FeedbackTab, isEqual)
