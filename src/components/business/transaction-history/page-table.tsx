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
import { formatCurrency } from '@/utils/format-currency'

function PageTable() {
  const { dictionary } = useDictionary()
  return (
    <div className="grid grid-cols-1">
      <Table>
        <ColGroup list={[167.25, 167.25, 167.25, 167.25, 140, 120]} />

        <TableHeader bg noBorder className="[&_th]:pb-[0.6875rem] [&_th]:pt-3">
          <TableRow>
            <TableHead>{dictionary.Time}</TableHead>
            <TableHead>{dictionary.Type}</TableHead>
            <TableHead>{dictionary.Amount}</TableHead>
            <TableHead>{dictionary.Destination}</TableHead>
            <TableHead>{dictionary.TxID}</TableHead>
            <TableHead>{dictionary.Status}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="whitespace-nowrap">
          <TableRow className="border-transparent">
            <TableCell>20:10 23-01-2023</TableCell>
            <TableCell>Deposit</TableCell>
            <TableCell>
              {formatCurrency({
                value: 0.00001,
                currency: 'BTC',
              })}
            </TableCell>
            <TableCell>0xeeb4c0f8873...</TableCell>
            <TableCell>0xeeb4c0f8873...</TableCell>
            <TableCell>Pending</TableCell>
          </TableRow>

          <TableRow className="border-transparent">
            <TableCell>218:07 22-01-2023</TableCell>
            <TableCell>Withdraw</TableCell>
            <TableCell>
              {formatCurrency({
                value: 0.00001,
                currency: 'BTC',
              })}
            </TableCell>
            <TableCell>0xeeb4c0f8873...</TableCell>
            <TableCell>0xeeb4c0f8873...</TableCell>
            <TableCell>Completed</TableCell>
          </TableRow>

          <TableRow className="border-transparent">
            <TableCell>20:10 21-01-2023</TableCell>
            <TableCell>Deposit</TableCell>
            <TableCell>
              {formatCurrency({
                value: 0.00001,
                currency: 'BTC',
              })}
            </TableCell>
            <TableCell>0xeeb4c0f8873...</TableCell>
            <TableCell>0xeeb4c0f8873...</TableCell>
            <TableCell>Completed</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default memo(PageTable, isEqual)
