import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { DictionaryProps } from '@/types/common'

import PageFilter from './page-filter'
import PageTable from './page-table'

async function WithdrawInternalPage({ dictionary }: DictionaryProps) {
  return (
    <div className="space-y-8">
      <h1 className="text-heading-4">{dictionary['Withdraw Internal']}</h1>

      <PageFilter />

      <PageTable />
    </div>
  )
}

export default memo(WithdrawInternalPage, isEqual)
