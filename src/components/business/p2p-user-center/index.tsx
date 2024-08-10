'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { ChevronDown, EyeOff } from 'lucide-react'

import { AppAvatarOnline } from '@/components/common/app-avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { AVATAR_DEFAULT } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'
import { formatCurrency } from '@/utils/format-currency'

import { StatisticBuySell, StatisticItem } from '../advertiser-detail/ui'
import { Stats, StatThumbsDown, StatThumbsUp } from '../p2p/stat-info'

import AdditionalTabs from './additional-tabs'

function P2pUserCenterPage() {
  const { dictionary } = useDictionary()
  return (
    <section className="container">
      <section className="mb-[1.625rem] flex flex-wrap items-center justify-between gap-4 py-6">
        <div className="flex items-center gap-4">
          <AppAvatarOnline
            url={AVATAR_DEFAULT}
            fallback="Thomas Anree"
            className="size-20 [&_.online]:size-[1.375rem] [&_.online]:border-[3px]"
            online
          />

          <div>
            <h2 className="text-heading-6">Thomas Anree</h2>
            <p className="text-text-primary">ID 038134891</p>
          </div>
        </div>

        <Card className="space-y-[0.625rem]">
          <p className="flex items-center gap-2 text-body/extra/small/regular text-text-primary">
            <span>P2P Estimated Value (BTC)</span>

            <Button variant="none" size="none" asChild aria-label="click to hide">
              <EyeOff size={16} />
            </Button>
          </p>

          <div className="flex flex-wrap items-baseline gap-1">
            <span className="flex items-baseline gap-1">
              <span className="grid grid-cols-1">
                <span className="overflow-hidden text-ellipsis text-heading-6">
                  {formatCurrency({
                    value: 0,
                    options: {
                      minimumFractionDigits: 8,
                    },
                  })}
                </span>
              </span>
              <span className="flex items-center text-body/extra/small/regular">
                BTC <ChevronDown size={16} />
              </span>
            </span>

            <span className="flex text-body/small/regular text-text-primary">
              <span>≈&nbsp;</span>
              <span className="grid grid-cols-1">
                <span className="overflow-hidden text-ellipsis">$0</span>
              </span>
            </span>
          </div>
        </Card>
      </section>

      <section className="mb-6">
        <div className="grid grid-cols-2 gap-y-7 rounded-lg bg-dark-2 px-8   py-6 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5">
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
              label: dictionary['Approx. 30d Volume'],
              value: '0.00000000 BTC',
            },
            {
              label: dictionary['Approx. Total Volume'],
              value: '817Day(s) Ago',
              anotherContent: <StatisticBuySell buy={111667} sell={52642} />,
            },
            {
              label: dictionary['Positive Feedback'],
              value: '0% (0)',
              anotherContent: (
                <Stats className="mt-2">
                  <StatThumbsUp
                    size={12}
                    label={20}
                    className="text-body/extra/small/regular [&_.label]:text-success"
                  />
                  <StatThumbsDown
                    size={12}
                    label={0}
                    className="text-body/extra/small/regular [&_.label]:text-error"
                  />
                </Stats>
              ),
            },
            {
              label: dictionary.Registered,
              value: '281Day(s) Ago',
              tooltipContent: dictionary.Registered,
            },
            {
              label: dictionary['First Trade'],
              value: '817Day(s) Ago',
              tooltipContent: dictionary['First Trade'],
            },
          ].map((item) => (
            <StatisticItem key={item.label} item={item} />
          ))}
        </div>
      </section>

      <section>
        <AdditionalTabs />
      </section>
    </section>
  )
}

export default memo(P2pUserCenterPage, isEqual)
