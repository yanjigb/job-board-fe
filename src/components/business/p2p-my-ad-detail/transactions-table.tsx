'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import {
  ColGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useDictionary } from '@/providers/dictionary-provider'
import { ExChangeTab } from '@/types/home'
import { formatCurrency } from '@/utils/format-currency'

import { ExchangeLabel } from '../p2p-my-ads/ui'

function MyAdDetailTransactionsTable() {
  const { dictionary } = useDictionary()
  return (
    <div>
      <h2 className="py-6 text-heading-6">{dictionary.Transactions}</h2>

      <Table className="w-full">
        <ColGroup list={[275.5, 275.5, 275.5, 275.5, 140]} />

        <TableHeader bg noBorder nowrap className="[&_th]:pb-[0.6875rem] [&_th]:pt-3">
          <TableRow>
            <TableHead>
              {dictionary.Type} - {dictionary.Date}
            </TableHead>
            <TableHead>{dictionary.Price}</TableHead>
            <TableHead>
              {dictionary.Fiat} - {dictionary['Crypto Quantity']}
            </TableHead>
            <TableHead>{dictionary['Order Number']}</TableHead>
            <TableHead>{dictionary.Status}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              <p>
                <ExchangeLabel type={ExChangeTab.Buy} />
                <span className="ml-2">USDT</span>
              </p>
              <p className="text-text-primary">20:10 23-01-2023</p>
            </TableCell>
            <TableCell>
              {formatCurrency({
                value: 625,
                currency: 'XOF',
              })}
            </TableCell>
            <TableCell>
              <p>
                {formatCurrency({
                  value: 20000,
                  currency: 'XOF',
                })}
              </p>

              <p className="mt-1">
                {formatCurrency({
                  value: 32,
                  currency: 'USDT',
                })}
              </p>
            </TableCell>
            <TableCell>
              <p className="underline">22641001124508762112</p>
              <p className="text-secondary">{dictionary['Buyer name']}</p>
            </TableCell>
            <TableCell>{dictionary.Canceled}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default memo(MyAdDetailTransactionsTable, isEqual)
