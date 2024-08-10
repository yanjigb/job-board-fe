import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Popover } from '@radix-ui/react-popover'
import { formatDate, subDays, subHours } from 'date-fns'

import { AppAvatar } from '@/components/common/app-avatar'
import AppIcon from '@/components/common/app-icon'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { ExchangeLabel } from '@/components/business/p2p-my-ads/ui'
import { useDictionary } from '@/providers/dictionary-provider'
import { ExChangeTab } from '@/types/home'
import { LocaleKeys } from '@/types/locales'
import { cn, cnWithClxs } from '@/utils/cn'
import { formatCurrency } from '@/utils/format-currency'

interface INotificationItem {
  id: string
  message: string
  createdAt: string
  unread?: boolean
  username: string
  type: ExChangeTab
  status: Status
}

enum Status {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  CANCEL = 'CANCEL',
}

const mappingColor = {
  PENDING: 'text-secondary',
  SUCCESS: 'text-success',
  CANCEL: 'text-error',
}

const mappingLabel = (dictionary: LocaleKeys) => ({
  PENDING: dictionary['Pending payment'],
  SUCCESS: dictionary.Completed,
  CANCEL: dictionary.Cancel,
})

const getLabel = (status: Status, dictionary: LocaleKeys) => mappingLabel(dictionary)[status] || ''

const getColor = (status: Status) => mappingColor[status] || 'text-text-dark'

function Notification({ item }: { item: INotificationItem }) {
  const { dictionary } = useDictionary()
  return (
    <li className="flex cursor-pointer items-start justify-between gap-3 rounded-sm p-3 py-4 hover:bg-stroke">
      <div className="space-y-2 text-body/large/semibold">
        <p className="opacity-70">
          <ExchangeLabel type={item.type} />
          <span>&nbsp;USDT</span>
        </p>

        <p>
          {formatCurrency({
            value: 12121,
            currency: 'XOF',
            options: {
              minimumFractionDigits: 2,
            },
          })}
        </p>

        <p className="flex items-center gap-2 font-light">
          <AppAvatar fallback="TG" className="size-6 text-[0.625rem] leading-[1.125rem]" />
          username
        </p>
      </div>

      <div className="space-y-3 text-right">
        <p className={cnWithClxs('text-body/medium/medium font-normal', getColor(item.status))}>
          {item.status === Status.PENDING && <span>11:12</span>}
          <span className="ml-2 opacity-70">{getLabel(item.status, dictionary)}</span>
        </p>

        <p className="text-body/large/semibold">
          <span className="text-text-primary">Price.</span>
          <span>FCFA627.70</span>
        </p>

        <p className="text-body/small/regular text-text-primary">
          {formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}
        </p>
      </div>
    </li>
  )
}

function MyOrderNotification() {
  const { dictionary } = useDictionary()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer pr-[0.125rem] pt-[0.125rem]  [&[data-state=open]>span]:bg-blueLight [&[data-state=open]>span]:text-text-dark">
          <span
            className={cn(
              'relative block rounded-[0.3125rem] bg-another-2 p-[0.4375rem] text-blueLight',
              'after:absolute after:right-[-0.125rem] after:top-[-0.125rem] after:size-2 after:rounded-full after:bg-error after:content-[""]',
            )}
          >
            <AppIcon
              src="/svgs/shopping-basket.svg#shopping-basket"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              className="max-h-4 w-4"
            />
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="max-h-[33.875rem] w-[min(42.3125rem,calc(100vw-1.5rem))] translate-x-3 p-0 py-4 lg:translate-x-[7.75rem]"
      >
        <div className="sticky top-0 mx-4 mb-3 flex items-center justify-between border-b border-stroke bg-dark-3 pb-[11px]">
          <div>{dictionary.Orders}</div>
        </div>

        <ul className="max-h-[27.875rem] overflow-auto px-4">
          {[
            {
              id: '1',
              message: 'You have logged in to one of our associated platforms',
              createdAt: subHours(new Date(), 3).toDateString(),
              unread: false,
              username: 'John Doe',
              type: ExChangeTab.Buy,
              status: Status.PENDING,
            },
            {
              id: '2',
              message: 'The user has purchased your ad and conducted a transaction',
              createdAt: subHours(new Date(), 3).toDateString(),
              unread: false,
              username: 'John Doe',
              type: ExChangeTab.Buy,
              status: Status.PENDING,
            },
            {
              id: '3',
              message: 'User has sold USDT to you and is waiting for a transaction',
              createdAt: subDays(new Date(), 3).toDateString(),
              unread: false,
              username: 'John Doe',
              type: ExChangeTab.Sell,
              status: Status.SUCCESS,
            },
            {
              id: '4',
              message: 'You have logged in to one of our associated platforms',
              createdAt: '2022-09-15T13:45:30.000Z',
              unread: false,
              username: 'John Doe',
              type: ExChangeTab.Sell,
              status: Status.CANCEL,
            },
          ].map((item) => (
            <Notification key={item.id} item={item} />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default memo(MyOrderNotification, isEqual)
