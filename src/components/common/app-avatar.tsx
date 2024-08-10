import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/utils/cn'
import { getTwoInitials } from '@/utils/common'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function Online() {
  return (
    <span
      className="online absolute right-[-0.125rem] top-[-0.125rem] z-[2] size-4 rounded-full border-[0.1437rem] border-solid border-white bg-success"
      aria-label="online-status"
    />
  )
}

interface IAppAvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  url?: string
  fallback: string
}
const AppAvatar = memo(function AppAvatar({ url, fallback, ...props }: IAppAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage src={url} alt={`@${fallback}`} />
      <AvatarFallback className="bg-primary font-semibold">
        {getTwoInitials(fallback)}
      </AvatarFallback>
    </Avatar>
  )
}, isEqual)

interface IAppAvatarOnlineProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
  url?: string
  fallback: string
  online?: boolean
}

const AppAvatarOnline = memo(function AppAvatarOnline({
  className,
  url,
  fallback,
  online,
  ...props
}: IAppAvatarOnlineProps) {
  return (
    <span className={cn('relative inline-block', className)} {...props}>
      {online && <Online />}
      <AppAvatar className={className} url={url} fallback={fallback} />
    </span>
  )
}, isEqual)

export { AppAvatarOnline, AppAvatar, Online }
