'use client'

import React, { memo, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import { format } from 'date-fns'
import { CirclePlus } from 'lucide-react'
import { useQueryState } from 'nuqs'

import { AppAvatarOnline } from '@/components/common/app-avatar'
import { TabsSelect } from '@/components/common/tabs-select'
import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'

import { AVATAR_DEFAULT } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'

import { Stats, StatThumbsDown, StatThumbsUp } from '../p2p/stat-info'

import ModalBlockUser from './modal/modal-block-user'
import ModalReportUser from './modal/modal-report-user'
import OnlineAdTab from './online-tab/online-tab'
import FeedbackTab from './feedback-tab'
import { StatisticBuySell, StatisticItem, StatLabel } from './ui'

function AdvertiserDetailPage() {
  const [type, setType] = useQueryState('type')

  const { dictionary } = useDictionary()

  const types = useMemo(
    () => [
      { label: dictionary['Online AD'], value: 'online_ad' },
      { label: dictionary.Feedback, value: 'feedback' },
    ],
    [dictionary],
  )

  const typeDefault = type || types[0].value

  return (
    <div className="container">
      <div className="flex flex-wrap justify-between gap-6 py-6">
        <div className="flex gap-4">
          <AppAvatarOnline
            fallback="Jonathan Higgins"
            className="size-20 [&_.online]:size-[1.375rem] [&_.online]:border-[3px]"
            online
            url={AVATAR_DEFAULT}
          />

          <div className="space-y-4">
            <h2 className="text-heading-6">Jonathan Higgins</h2>
            <div className="flex items-center">
              <Button variant="secondary" rounded="sm">
                <CirclePlus size={20} /> {dictionary.Follow}
              </Button>

              <ModalBlockUser>
                <Button variant="ghost" rounded="sm">
                  {dictionary.Block}
                </Button>
              </ModalBlockUser>

              <ModalReportUser>
                <Button variant="ghost" rounded="sm">
                  {dictionary.Report}
                </Button>
              </ModalReportUser>
            </div>

            <p className="flex flex-col flex-wrap gap-x-6 gap-y-3 text-text-primary sm:flex-row">
              <span>{dictionary['Last seen']} 1h ago</span>
              <span>
                {dictionary['Joined on']} {format(new Date('2022-07-23'), 'yyyy-MM-dd')}
              </span>
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-8 rounded-lg border border-stroke px-[2.5rem] py-[1.875rem] sm:w-auto xl:flex-row">
          <div className="min-w-[13.75rem] space-y-1">
            <StatLabel tooltipContent={dictionary['All Trades']}>
              {dictionary['All Trades']}
            </StatLabel>

            <p className="text-body/large/regular font-light">164309Time(s)</p>

            <StatisticBuySell buy={111667} sell={52642} />
          </div>

          <div>
            <p className="text-body/extra/small/regular text-text-primary">
              {dictionary['Positive Feedback']}
            </p>
            <p className="text-body/large/regular font-light">99.72%(36928)</p>
            <Stats className="mt-2">
              <StatThumbsUp label={20} />
              <StatThumbsDown label={0} />
            </Stats>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-y-7 rounded-lg bg-dark-2 px-8   py-5 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5">
          {[
            {
              label: dictionary['30d Trades'],
              value: '11692Time(s)',
              tooltipContent: dictionary['30d Trades'],
            },
            {
              label: dictionary['30d Completion Rate'],
              value: '95.03%',
              tooltipContent: dictionary['30d Completion Rate'],
            },
            {
              label: dictionary['Avg. Release Time'],
              value: '7.83Minute(s)',
              tooltipContent: dictionary['Avg. Release Time'],
            },
            {
              label: dictionary['Avg. Pay Time'],
              value: '2.87Minute(s)',
              tooltipContent: dictionary['Avg. Pay Time'],
            },
            {
              label: dictionary['First Trade'],
              value: '817Day(s) Ago',
              tooltipContent: ['First Trade'],
            },
          ].map((item) => (
            <StatisticItem key={item.label} item={item} />
          ))}
        </div>

        <TabsSelect
          list={types}
          currentValue={type || typeDefault}
          onClick={(value) => {
            setType(value)
          }}
        >
          <TabsContent value={types[0].value} className="mt-6">
            <OnlineAdTab />
          </TabsContent>

          <TabsContent value={types[1].value} className="mt-6">
            <FeedbackTab />
          </TabsContent>
        </TabsSelect>
      </div>
    </div>
  )
}

export default memo(AdvertiserDetailPage, isEqual)
