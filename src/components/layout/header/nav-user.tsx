'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { ChevronDown, LogOut } from 'lucide-react'

import AppLink from '@/components/common/app-link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import useCurrentPathname from '@/hooks/use-current-pathname'
import { useDictionary } from '@/providers/dictionary-provider'
import { cn } from '@/utils/cn'

import { getUserMenus } from './constants'

interface MenuMockupProps {
  icon: React.ElementType
  label: string
  className?: string
}

const MenuMockup = memo(function MenuMockup({ icon: Icon, label, className }: MenuMockupProps) {
  return (
    <span
      className={cn('flex items-center gap-2 px-4 py-3 text-text-dark hover:bg-dark-3', className)}
    >
      <Icon className="icon text-text-secondary" />

      {label}
    </span>
  )
}, isEqual)

interface UserProps {
  className?: string
}

const User = memo(function User({ className }: UserProps) {
  return (
    <div className={cn('hidden cursor-pointer items-center gap-3 lg:flex', className)}>
      <div className="pl-3 pr-[0.5625rem] font-normal">
        <p>Thomas Anree</p>
        <p className="mt-[-1px] text-left text-body/extra/small/regular text-text-secondary">
          ID 038134891
        </p>
      </div>

      <div className="flex items-center gap-[0.8125rem]">
        <div className="relative">
          <span
            className="absolute right-[-0.125rem] top-[-0.125rem] z-[2] size-4 rounded-full border-[0.0938rem] border-solid border-white bg-success p-[0.125rem]"
            aria-label="online-status"
          />

          <Avatar className="size-[2.625rem]">
            <AvatarImage src="/images/avatar.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <ChevronDown size={20} className="chevron text-another-3" />
      </div>
    </div>
  )
}, isEqual)

interface IUserMenusProps {
  onClose: () => void
}

const UserMenus = memo(function UserMenus({ onClose }: IUserMenusProps) {
  const pathname = useCurrentPathname()
  const { dictionary } = useDictionary()
  return (
    <ul>
      {getUserMenus(dictionary).map((menu) => (
        <li key={menu.label}>
          <AppLink href={menu.href} onClick={onClose}>
            <MenuMockup
              icon={menu.icon}
              label={menu.label}
              className={cn(
                pathname === menu.href &&
                  'border-r-4 border-solid border-primary lg:border-transparent',
              )}
            />
          </AppLink>
        </li>
      ))}

      <li>
        <button type="button" onClick={onClose} className="w-full">
          <MenuMockup
            icon={LogOut}
            label="Log out"
            className="cursor-pointer border-t border-solid border-stroke text-error [&_.icon]:text-error"
          />
        </button>
      </li>
    </ul>
  )
}, isEqual)

const NavUser = memo(function NavUser() {
  const [open, setOpen] = React.useState(false)
  const onClose = () => setOpen(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <User />
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={16} className="w-[15.625rem] px-0 py-[10px]">
        <UserMenus onClose={onClose} />
      </PopoverContent>
    </Popover>
  )
}, isEqual)

export { NavUser, UserMenus, User, MenuMockup }
