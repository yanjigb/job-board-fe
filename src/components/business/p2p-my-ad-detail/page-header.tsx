'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { PenLine, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useDictionary } from '@/providers/dictionary-provider'

import { HeaderLabel } from '../p2p-fiat-order-detail/ui'

import DeleteAdModal from './modal/delete-ad-modal'
import EditAdModal from './modal/edit-ad-modal'

function PageHeader() {
  const { dictionary } = useDictionary()
  return (
    <div className="flex flex-col items-start justify-between gap-6 py-6 sm:flex-row">
      <div className="space-y-4">
        <HeaderLabel buy={false} label="Sell">
          USDT <span className="text-text-primary">{dictionary.With}</span> USD
        </HeaderLabel>

        <p className="flex gap-1">
          <span className="text-text-primary">{dictionary['Time created']}</span>
          <span>2024-01-04 10:38:17</span>
        </p>
      </div>

      <div className="flex gap-3">
        <DeleteAdModal>
          <Button className="order-2 sm:order-1" variant="ghost">
            <Trash2 size={20} className="" />
            {dictionary.Delete}
          </Button>
        </DeleteAdModal>

        <EditAdModal>
          <Button className="order-1 sm:order-2">
            <PenLine size={20} className="" />
            {dictionary['Edit Ad']}
          </Button>
        </EditAdModal>
      </div>
    </div>
  )
}

export default memo(PageHeader, isEqual)
