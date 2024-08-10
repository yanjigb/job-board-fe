import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Popover } from '@radix-ui/react-popover'
import { formatDistance, subDays, subHours } from 'date-fns'
import { CircleCheck } from 'lucide-react'

import { AppAvatar } from '@/components/common/app-avatar'
import AppIcon from '@/components/common/app-icon'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { useDictionary } from '@/providers/dictionary-provider'
import { LocaleKeys } from '@/types/locales'
import { cn } from '@/utils/cn'

enum NotificationType {
  Messenger = 'messenger',
  NewOrder = 'new-order',
}

interface INotificationItem {
  id: string
  message: string
  createdAt: string
  unread?: boolean
  username: string
  type: NotificationType
}

const labelMapping = (dictionary: LocaleKeys) => ({
  [NotificationType.Messenger]: dictionary['Send messenger'],
  [NotificationType.NewOrder]: dictionary['New order'],
})

const capitalizeFirstLetter = (string: String) => string.charAt(0).toUpperCase() + string.slice(1)

const getMessageTypeLabel = (type: NotificationType, dictionary: LocaleKeys): string =>
  labelMapping(dictionary)[type] || ''

function Notification({ item }: { item: INotificationItem }) {
  const { dictionary } = useDictionary()
  return (
    <li className="flex cursor-pointer items-start gap-3 rounded-sm p-3 hover:bg-stroke">
      <AppAvatar
        className="size-[2.375rem] bg-primary [&_.fallback]:relative [&_.fallback]:z-[2] [&_.fallback]:text-text-dark"
        fallback="Username"
      />

      <div className="space-y-2">
        <p className="flex items-center gap-3">
          <span className="text-body/large/semibold capitalize">{item.username}</span>
          <span className="text-body/small/regular font-light text-text-primary">
            {getMessageTypeLabel(item.type, dictionary)}
          </span>
        </p>
        <p>{item.message}</p>
        <p className="text-body/extra/small/regular text-text-placeholder">
          {capitalizeFirstLetter(formatDistance(item.createdAt, new Date(), { addSuffix: true }))}
        </p>
      </div>
    </li>
  )
}

function HeaderNotification() {
  const { dictionary } = useDictionary()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer pr-[0.125rem] pt-[0.125rem] [&[data-state=open]>span]:bg-secondary [&[data-state=open]>span]:text-dark-background">
          <span
            className={cn(
              'relative block rounded-[0.3125rem] bg-another-1 p-[0.4375rem]',
              'text-secondary after:absolute after:right-[-0.125rem] after:top-[-0.125rem] after:size-2 after:rounded-full after:bg-error after:content-[""]',
            )}
          >
            <div>
              <AppIcon
                src="/svgs/alarm.svg#id"
                width={16}
                height={17}
                viewBox="0 0 16 17"
                className="max-h-4 w-4"
              />
            </div>
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="max-h-[33.875rem] w-[min(35rem,calc(100vw-1.5rem))] translate-x-3 p-0 py-4 lg:translate-x-[10.5rem]"
      >
        <div className="sticky top-0 mx-4 mb-3 flex items-center justify-between border-b border-stroke bg-dark-3 pb-[11px]">
          <div>{dictionary.Notifications}</div>
          <div className="flex items-center gap-2 text-footnote/description text-text-dark/70">
            <CircleCheck size={16} className="text-secondary" />
            {dictionary['Mark All Read']}
          </div>
        </div>

        <ul className="max-h-[27.875rem] overflow-auto px-4">
          {[
            {
              id: '1',
              message: 'You have logged in to one of our associated platforms',
              createdAt: subHours(new Date(), 3).toDateString(),
              unread: false,
              username: 'John Doe',
              type: NotificationType.Messenger,
            },
            {
              id: '2',
              message: 'The user has purchased your ad and conducted a transaction',
              createdAt: subHours(new Date(), 3).toDateString(),
              unread: false,
              username: 'John Doe',
              type: NotificationType.Messenger,
            },
            {
              id: '3',
              message: 'User has sold USDT to you and is waiting for a transaction',
              createdAt: subDays(new Date(), 3).toDateString(),
              unread: false,
              username: 'John Doe',
              type: NotificationType.NewOrder,
            },
            {
              id: '4',
              message: 'You have logged in to one of our associated platforms',
              createdAt: '2022-09-15T13:45:30.000Z',
              unread: false,
              username: 'John Doe',
              type: NotificationType.Messenger,
            },
          ].map((item) => (
            <Notification key={item.id} item={item} />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default memo(HeaderNotification, isEqual)
