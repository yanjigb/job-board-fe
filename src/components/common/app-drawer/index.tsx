import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DrawerClose, DrawerContent } from '@/components/ui/drawer'
import { InputRaw } from '@/components/ui/input'

import { cn } from '@/utils/cn'

const AppDrawerClose = memo(function AppDrawerClose() {
  return (
    <DrawerClose asChild>
      <Button variant="none" size="none" className="p-3" aria-label="close-drawer">
        <X />
      </Button>
    </DrawerClose>
  )
}, isEqual)

interface IAppDrawerContentProps extends React.ComponentPropsWithoutRef<typeof DrawerContent> {
  type?: 'sidebar' | 'bottom'
  label?: React.ReactNode
  customHeader?: React.ReactNode
  search?: boolean
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void
  classNameContent?: string
}
const AppDrawerContent = memo(function AppDrawerContent({
  children,
  className,
  classNameContent,
  type = 'sidebar',
  customHeader,
  label,
  search,
  onSearch,
  ...props
}: IAppDrawerContentProps) {
  return (
    <DrawerContent
      className={cn(
        'fixed bg-dark-background p-0',
        type === 'sidebar' && 'left-auto h-full w-[21.875rem]',
        type === 'bottom' && 'bottom-0 left-0 right-0 h-auto max-h-screen w-screen overflow-hidden',
        className,
      )}
      {...props}
    >
      {customHeader ||
        (search && (
          <div className="flex items-center justify-between pt-3">
            <div className="relative flex w-full items-center px-4 py-2 pr-0">
              <span className="absolute left-8 top-1/2 -translate-y-1/2">
                <Search size={16} strokeWidth={1} className="text-text-secondary" />
              </span>

              <InputRaw
                className="w-full pl-12 !ring-0"
                placeholder="Search"
                tabIndex={-1}
                onChange={onSearch}
              />
            </div>

            <AppDrawerClose />
          </div>
        )) || (
          <div
            className={cn(
              '-mr-3 flex items-center justify-end px-3 py-3',
              label && 'justify-between',
            )}
          >
            {label && <span className="text-heading-5 font-medium">{label}</span>}
            <AppDrawerClose />
          </div>
        )}

      <div
        className={cn(
          'content overflow-y-auto px-3 pb-3',
          type === 'bottom' && 'max-h-[80vh]',
          classNameContent,
        )}
      >
        {children}
      </div>
    </DrawerContent>
  )
}, isEqual)

export { AppDrawerContent, AppDrawerClose }
