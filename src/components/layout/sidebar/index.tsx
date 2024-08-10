'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { LogOut, LucideProps } from 'lucide-react'

import AppLink from '@/components/common/app-link'
import { Button } from '@/components/ui/button'

import RouteNames from '@/constants/routes'
import useCurrentPathname from '@/hooks/use-current-pathname'
import { useDictionary } from '@/providers/dictionary-provider'
import { cn } from '@/utils/cn'

import Footer from '../footer'

import { getSideBar } from './constant'

interface IItemMockupProps {
  href: string
  label: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  className?: string
}

function ItemMockup({ href, label, className, icon: Icon }: IItemMockupProps) {
  const pathname = useCurrentPathname()
  const isDashboard = href === RouteNames.Dashboard
  const currentPathnameIsDashboard = pathname === RouteNames.Dashboard
  return (
    <span
      className={cn(
        'flex w-full items-center gap-2 border-r-4 border-transparent px-4 py-3',
        ((isDashboard && currentPathnameIsDashboard) ||
          (!isDashboard && pathname.includes(href))) &&
          'border-primary bg-dark-3',
        className,
      )}
    >
      {Icon && (
        <span className="text-text-primary">
          <Icon size={20} />
        </span>
      )}

      <span className="whitespace-nowrap text-body/medium/semibold">{label}</span>
    </span>
  )
}

function SideBar() {
  const { dictionary } = useDictionary()
  return (
    <section className="flex flex-1 flex-col justify-between gap-3 py-6">
      <ul>
        {getSideBar(dictionary).map((item) => (
          <li key={item.label}>
            <AppLink href={item.href}>
              <ItemMockup {...item} />
            </AppLink>
          </li>
        ))}
      </ul>

      <div>
        <Button asChild variant="none" size="none">
          <div className="w-full cursor-pointer">
            <ItemMockup label="Logout" href="#" icon={LogOut} className="[&>*]:text-error" />
          </div>
        </Button>

        <Footer className="px-4 py-0 text-start" />
      </div>
    </section>
  )
}

export default memo(SideBar, isEqual)
