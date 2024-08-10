'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Trash2 } from 'lucide-react'

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

import { useDictionary } from '@/providers/dictionary-provider'

function PageTable() {
  const { dictionary } = useDictionary()
  return (
    <Table>
      <ColGroup list={[460.5, 460.5, 80]} />
      <TableHeader bg noBorder size="sm">
        <TableRow>
          <TableHead>{dictionary.Address}</TableHead>
          <TableHead>{dictionary.Name}</TableHead>
          <TableHead className="text-center">{dictionary.Action}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow className="border-transparent">
          <TableCell>0xeeb4c0f887334821648702</TableCell>
          <TableCell>Deposit</TableCell>
          <TableCell>
            <div className="flex-center">
              <Button variant="none" size="none" className="p-0">
                <Trash2 className="text-error" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="border-transparent">
          <TableCell>0xeeb4c0f887334821648702</TableCell>
          <TableCell>Deposit</TableCell>
          <TableCell>
            <div className="flex-center">
              <Button variant="none" size="none" className="p-0">
                <Trash2 className="text-error" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="border-transparent">
          <TableCell>0xeeb4c0f887334821648702</TableCell>
          <TableCell>Deposit</TableCell>
          <TableCell>
            <div className="flex-center">
              <Button variant="none" size="none" className="p-0">
                <Trash2 className="text-error" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default memo(PageTable, isEqual)
