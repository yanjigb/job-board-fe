import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import AdInformation from './ad-information'
import PageHeader from './page-header'
import MyAdDetailTransactionsTable from './transactions-table'

function MyAdDetailPage() {
  return (
    <div className="container">
      <PageHeader />

      <AdInformation />

      <MyAdDetailTransactionsTable />
    </div>
  )
}

export default memo(MyAdDetailPage, isEqual)
