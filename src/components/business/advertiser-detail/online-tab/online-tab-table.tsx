'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import dynamic from 'next/dynamic'

import AppIcon from '@/components/common/app-icon'
import { Asset, AssetSymbol } from '@/components/common/asset'
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
import { P2pTradingType } from '@/types/p2p'
import { IAd } from '@/types/p2p-advertiser-detail'
import { formatCurrency } from '@/utils/format-currency'

function TableDesktopRender({ list }: { list: IAd[] }) {
  const { dictionary } = useDictionary()
  return (
    <Table>
      <ColGroup list={[320, 172, 315, 315, 120]} />

      <TableHeader borderTopBottom nowrap>
        <TableRow>
          <TableHead>Coin</TableHead>
          <TableHead>{dictionary.Price}</TableHead>
          <TableHead>{dictionary['Available/Order Limit']}</TableHead>
          <TableHead>{dictionary['Payment Method']}</TableHead>
          <TableHead>{dictionary.Trade}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {list.map((item, index) => {
          const onBuy = () => {
            p2pStoreActions.setModalTradeP2p(true)
          }
          return (
            <TableRow key={item._id}>
              <TableCell>
                <Asset size={32} symbol={AssetSymbol.USDT}>
                  <span className="text-body/medium/medium font-normal">USD</span>
                </Asset>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-baseline gap-1">
                  <span className="text-body/large/semibold">
                    {formatCurrency({
                      value: 1000,
                    })}
                  </span>

                  <span className="text-body/medium/regular font-light text-text-primary">
                    USDT
                  </span>
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
                <Button
                  variant={item.type === P2pTradingType.Buy ? 'default' : 'secondary'}
                  onClick={onBuy}
                  disabled={!!index}
                >
                  {item.type === P2pTradingType.Buy ? dictionary.Buy : dictionary.Sell} USDT
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

function TableMobileRender({ list }: { list: IAd[] }) {
  const { dictionary } = useDictionary()
  return (
    <div className="[&>div:first-child]:pt-0 [&>div:last-child]:border-transparent">
      {list.map((item, index) => {
        const onBuy = () => {
          p2pStoreActions.setModalTradeP2p(true)
        }
        return (
          <div
            key={item._id}
            className="grid grid-cols-1 space-y-4 overflow-hidden border-b border-stroke py-4"
          >
            <Asset size={32} symbol={AssetSymbol.USDT}>
              <span className="text-body/medium/medium font-normal">USD</span>
            </Asset>

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <span className="inline-flex items-baseline gap-1">
                <span className="text-body-large/regular font-semibold text-success">
                  {formatCurrency({
                    value: 1000,
                  })}
                </span>

                <span>USDT</span>
              </span>
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

              <Button
                variant={item.type === P2pTradingType.Buy ? 'default' : 'secondary'}
                onClick={onBuy}
                disabled={!!index}
              >
                {item.type === P2pTradingType.Buy ? dictionary.Buy : dictionary.Sell} USDT
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const TableRenderMemorized = memo(function TableRenderMemorized({ list }: { list: IAd[] }) {
  const { screen_LG } = useScreenQuery()
  if (screen_LG) return <TableMobileRender list={list} />
  return <TableDesktopRender list={list} />
}, isEqual)
TableRenderMemorized.displayName = 'TableRenderMemorized'

const OnlineTabTable = dynamic(() => Promise.resolve(TableRenderMemorized), {
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

export default memo(OnlineTabTable, isEqual)
