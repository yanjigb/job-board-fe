'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import AppLink from '@/components/common/app-link'
import { Button } from '@/components/ui/button'

import useCurrentPathname from '@/hooks/use-current-pathname'
import { useDictionary } from '@/providers/dictionary-provider'
import { cn } from '@/utils/cn'

import { getNavLinks } from './constants'

interface INavDesktopProps {
  className?: string
  onClick?: () => void
}

function NavDesktop({ className, onClick }: INavDesktopProps) {
  const pathname = useCurrentPathname()
  const { dictionary } = useDictionary()
  return (
    <ul className={cn('hidden items-center gap-6 lg:flex', className)}>
      {getNavLinks(dictionary).map(({ href, label }) => (
        <li key={label}>
          <Button asChild variant="none" size="none" onClick={onClick}>
            <AppLink
              href={href}
              className={cn(
                'relative font-normal text-text-primary hover:after:w-full',
                'px-3 lg:px-0',
                'transition-all after:absolute after:bottom-[-0.125rem] after:left-0 after:h-[0.125rem] after:w-0 after:rounded-lg after:bg-primary after:transition-all after:content-[""] hover:text-text-dark',
                href &&
                  pathname === href &&
                  '-after:translate-x-1/2 text-primary after:left-1/2 after:h-1 after:w-1 after:rounded-full hover:text-primary hover:after:h-1 hover:after:w-1',
              )}
            >
              {label}
            </AppLink>
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default memo(NavDesktop, isEqual)
