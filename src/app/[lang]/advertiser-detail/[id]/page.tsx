import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import AdvertiserDetailPage from '@/components/business/advertiser-detail'

function AdvertiserDetail() {
  return (
    <section>
      <AdvertiserDetailPage />
    </section>
  )
}

export default memo(AdvertiserDetail, isEqual)
