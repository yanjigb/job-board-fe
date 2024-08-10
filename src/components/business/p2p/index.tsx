import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { DictionaryProps } from '@/types/common'

import PageFilter from './page-filter'
import PageHeader from './page-header'
import PageTable from './page-table'

function P2pPage({ dictionary }: DictionaryProps) {
  return (
    <div>
      <PageHeader dictionary={dictionary} />

      <div className="space-y-6">
        <PageFilter />
        <PageTable />
      </div>
    </div>
  )
}

export default memo(P2pPage, isEqual)
