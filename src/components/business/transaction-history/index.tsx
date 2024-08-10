import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { DictionaryProps } from '@/types/common'

import PageFilter from './page-filter'
import PageTable from './page-table'

function TransactionHistoryPage({ dictionary }: DictionaryProps) {
  return (
    <div className="space-y-5">
      <h1 className="pb-4 text-heading-4">{dictionary['Transaction History']}</h1>

      <PageFilter />

      <PageTable />
    </div>
  )
}

export default memo(TransactionHistoryPage, isEqual)
