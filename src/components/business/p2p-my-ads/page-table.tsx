'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { ChevronRight } from 'lucide-react'
import dynamic from 'next/dynamic'

import AppIcon from '@/components/common/app-icon'
import AppLink from '@/components/common/app-link'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  ColGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import RouteNames from '@/constants/routes'
import useScreenQuery from '@/hooks/use-screen-query'
import { useDictionary } from '@/providers/dictionary-provider'
import { ExChangeTab } from '@/types/home'
import { formatCurrency } from '@/utils/format-currency'

import { ExchangeLabel } from './ui'

function PageTableDesktop() {
  const { dictionary } = useDictionary()
  return (
    <Table>
      <ColGroup list={[255.5, 255.5, 255.5, 255.5, 140, 56]} />

      <TableHeader bg noBorder>
        <TableRow className="[&_th]:pb-[0.6875rem] [&_th]:pt-3">
          <TableHead>{dictionary.Type}</TableHead>
          <TableHead>{dictionary.Price}</TableHead>
          <TableHead>{dictionary.Amount}</TableHead>
          <TableHead>{dictionary.Limit}</TableHead>
          <TableHead>{dictionary.Transactions}</TableHead>
          <TableHead>{dictionary.Status}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {[
          { _id: 1, type: ExChangeTab.Buy },
          { _id: 2, type: ExChangeTab.Sell },
          { _id: 3, type: ExChangeTab.Buy },
        ].map((item) => {
          return (
            <TableRow noBorder key={item._id}>
              <TableCell>
                <ExchangeLabel type={item.type} />
                <span>&nbsp;USDT</span>
                <span className="text-text-primary">&nbsp;{dictionary.With}</span>
                <span>&nbsp;USD</span>
              </TableCell>
              <TableCell>
                {formatCurrency({
                  value: 625,
                  currency: 'USDT',
                })}
              </TableCell>
              <TableCell>
                {formatCurrency({
                  value: 1.008,
                  currency: 'USDT',
                })}
              </TableCell>
              <TableCell>
                {formatCurrency({
                  value: 2500,
                  currency: '$',
                  isPrefix: true,
                  options: {
                    minimumFractionDigits: 2,
                  },
                })}
                &nbsp;-&nbsp;
                {formatCurrency({
                  value: 20000,
                  currency: '$',
                  isPrefix: true,
                  options: {
                    minimumFractionDigits: 2,
                  },
                })}
              </TableCell>
              <TableCell>
                <AppLink href={RouteNames.MyAdDetail(':id')}>
                  <Button className="cursor-pointer gap-0" variant="none" size="none" asChild>
                    <span>
                      <span>2</span>
                      <ChevronRight size={20} className="text-text-primary" />
                    </span>
                  </Button>
                </AppLink>
              </TableCell>
              <TableCell>
                <div className="h-8">
                  <Switch />
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

function PageTableMobile() {
  const { dictionary } = useDictionary()
  return (
    <div className="grid grid-cols-1">
      {[
        { _id: 1, type: ExChangeTab.Buy },
        { _id: 2, type: ExChangeTab.Sell },
        { _id: 3, type: ExChangeTab.Buy },
      ].map((item) => (
        <div
          key={item._id}
          className="space-y-4 border-t border-stroke py-6 [&:first-child]:border-t-0 [&:first-child]:pt-0"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="text-body/large/medium">
              <ExchangeLabel type={item.type} />
              <span>&nbsp;USDT</span>
              <span className="text-text-primary">&nbsp;{dictionary.With}</span>
              <span>&nbsp;USD</span>
            </div>

            <Switch />
          </div>

          <p className="py-3 text-heading-6">
            {formatCurrency({
              value: 625,
              currency: 'USDT',
            })}
          </p>

          <div className="space-y-1">
            <p className="flex justify-between gap-2">
              <span className="text-text-primary">{dictionary.Amount}</span>
              <span>
                {formatCurrency({
                  value: 0.01,
                  currency: 'USDT',
                })}
              </span>
            </p>
            <p className="flex justify-between gap-2">
              <span className="text-text-primary">{dictionary.Limit}</span>
              <span>
                {formatCurrency({
                  value: 2500,
                  currency: '$',
                  isPrefix: true,
                  options: {
                    minimumFractionDigits: 2,
                  },
                })}
                &nbsp;-&nbsp;
                {formatCurrency({
                  value: 20000,
                  currency: '$',
                  isPrefix: true,
                  options: {
                    minimumFractionDigits: 2,
                  },
                })}
              </span>
            </p>
          </div>

          <div className="flex justify-end">
            <Button className="cursor-pointer gap-0" variant="none" size="none" asChild>
              <span>
                <span>2</span>
                <ChevronRight size={20} className="text-text-primary" />
              </span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

const PageTableMemorized = memo(function PageTableMemorized() {
  const { screen_MD } = useScreenQuery()
  if (screen_MD) return <PageTableMobile />
  return <PageTableDesktop />
}, isEqual)

const PageTable = dynamic(() => Promise.resolve(PageTableMemorized), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-10">
      <AppIcon
        width={24}
        height={24}
        viewBox="0 0 24 24"
        strokeWidth={1}
        src="/images/circle-loading.svg#id"
        className="h-10 w-10 animate-spin text-primary md:h-20 md:w-20"
      />
    </div>
  ),
})

export default memo(PageTable, isEqual)
