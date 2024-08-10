import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import MyAdDetailPage from '@/components/business/p2p-my-ad-detail'

function MyAdDetail() {
  return (
    <section>
      <MyAdDetailPage />
    </section>
  )
}

export default memo(MyAdDetail, isEqual)
