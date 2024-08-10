'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Hourglass, ThumbsUp } from 'lucide-react'
import dynamic from 'next/dynamic'

import { AppAvatarOnline } from '@/components/common/app-avatar'
import AppIcon from '@/components/common/app-icon'
import AppPaginate from '@/components/common/app-paginate'
import { Button } from '@/components/ui/button'
import {
  ColGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import useScreenQuery from '@/hooks/use-screen-query'
import { useDictionary } from '@/providers/dictionary-provider'
import { p2pStoreActions } from '@/stores/use-p2p'
import { formatCurrency } from '@/utils/format-currency'

import { P2P_TABLE_DATA } from '../faker'
import { Stat, Stats } from '../stat-info'
import BuyModal from '../trade-modal/buy-modal'

function TableDesktopRender() {
  const { dictionary } = useDictionary()
  return (
    <>
      <Table>
        <ColGroup list={[320, 172, 315, 315, 120]} />

        <TableHeader borderTopBottom nowrap>
          <TableRow>
            <TableHead>{dictionary.Advertisers}</TableHead>
            <TableHead>{dictionary.Price}</TableHead>
            <TableHead>{dictionary['Available/Order Limit']}</TableHead>
            <TableHead>{dictionary['Payment Method']}</TableHead>
            <TableHead>{dictionary.Trade}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {P2P_TABLE_DATA.map((item, index) => {
            const onBuy = () => {
              p2pStoreActions.setModalTradeP2p(true)
            }
            return (
              <TableRow key={item._id}>
                <TableCell>
                  <div className="flex gap-3">
                    <AppAvatarOnline
                      className="size-[2.625rem]"
                      fallback="Jonathan Higgins"
                      online={!!item._id}
                    />

                    <div className="">
                      <p className="mb-1 font-semibold">Jonathan Higgins</p>

                      <Stats className="mb-3">
                        <Stat
                          value={formatCurrency({ value: 346 })}
                          label={dictionary.Orders.toLowerCase()}
                        />
                        <Stat value="91.50%" label={dictionary.Completion.toLowerCase()} />
                      </Stats>

                      <Stats>
                        <Stat
                          value={<ThumbsUp size={16} strokeWidth={1} className="text-success" />}
                          label="100%"
                        />
                        <Stat
                          value={<Hourglass size={16} strokeWidth={1} className="text-secondary" />}
                          label="15 mins"
                        />
                      </Stats>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-baseline gap-1">
                    <span className="text-body/large/semibold text-success">
                      {formatCurrency({
                        value: 1000,
                      })}
                    </span>

                    <span className="text-text-primary">USDT</span>
                  </span>
                </TableCell>
                <TableCell>
                  <p className="mb-1">
                    {formatCurrency({
                      value: 245.67,
                      currency: 'USDT',
                    })}
                  </p>
                  <p>
                    {formatCurrency({
                      value: 3000.0,
                      currency: 'FCFA',
                      isPrefix: true,
                      isWithoutSpace: true,
                      options: {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      },
                    })}
                    -
                    {formatCurrency({
                      value: 153647.42,
                      currency: 'FCFA',
                      isPrefix: true,
                      isWithoutSpace: true,
                      options: {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      },
                    })}
                  </p>
                </TableCell>
                <TableCell>
                  <ul className="space-y-1 whitespace-nowrap">
                    <li className="list-style">MTN Mobile Money</li>
                    <li className="list-style">Offline Bank</li>
                  </ul>
                </TableCell>
                <TableCell>
                  <Button className="px-[1.375rem]" disabled={!!index} onClick={onBuy}>
                    {dictionary.Buy} USDT
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <div className="flex justify-end">
        <AppPaginate total={1000} itemsPerPage={10} marginPagesDisplayed={1} />
      </div>
    </>
  )
}

function TableMobileRender() {
  const { dictionary } = useDictionary()
  return (
    <div className="[&>div:first-child]:pt-0 [&>div:last-child]:border-transparent">
      {P2P_TABLE_DATA.map((item, index) => (
        <div
          key={item._id}
          className="grid grid-cols-1 space-y-4 overflow-hidden border-b border-stroke py-4"
        >
          <div>
            <div className="flex gap-3">
              <AppAvatarOnline
                className="size-[2.625rem]"
                fallback="Jonathan Higgins"
                online={!!index}
              />

              <div className="">
                <p className="mb-1 font-semibold">Jonathan Higgins</p>

                <Stats>
                  <Stat
                    value={formatCurrency({ value: 346 })}
                    label={dictionary.Orders.toLowerCase()}
                  />
                  <Stat value="91.50%" label={dictionary.Completion.toLowerCase()} />
                </Stats>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <span className="inline-flex items-baseline gap-1">
              <span className="text-body-large/regular font-semibold text-success">
                {formatCurrency({
                  value: 1000,
                })}
              </span>

              <span>USDT</span>
            </span>

            <Stats>
              <Stat
                value={<ThumbsUp size={16} strokeWidth={1} className="text-success" />}
                label="100%"
              />
              <Stat
                value={<Hourglass size={16} strokeWidth={1} className="text-secondary" />}
                label="15 mins"
              />
            </Stats>
          </div>

          <div className="space-y-1">
            <p>
              <span className="mr-2 inline-block whitespace-nowrap text-text-primary">
                {dictionary.Available}
              </span>
              <span>245.67 USDT</span>
            </p>
            <p>
              <span className="mr-2 inline-block whitespace-nowrap text-text-primary">
                {dictionary['Order Limit']}
              </span>
              <span>
                {formatCurrency({
                  value: 3000.0,
                  currency: 'FCFA',
                  isPrefix: true,
                  isWithoutSpace: true,
                  options: {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  },
                })}
                -
                {formatCurrency({
                  value: 153647.42,
                  currency: 'FCFA',
                  isPrefix: true,
                  isWithoutSpace: true,
                  options: {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  },
                })}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <ul className="space-y-1">
              <li className="list-style">MTN Mobile Money</li>
              <li className="list-style">Offline Bank</li>
            </ul>

            <Button>{dictionary.Buy} USDT</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

const TableRenderMemorized = memo(function TableRenderMemorized() {
  const { screen_LG } = useScreenQuery()
  if (screen_LG) return <TableMobileRender />
  return <TableDesktopRender />
}, isEqual)

const TableRender = dynamic(() => Promise.resolve(TableRenderMemorized), {
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

function PageTable() {
  return (
    <div className="container space-y-[1.5625rem]">
      <TableRender />
      <BuyModal />
    </div>
  )
}

export default memo(PageTable, isEqual)
