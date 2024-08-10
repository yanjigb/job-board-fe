import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { CardKycVerifyPending } from './card-kyc'
import HeaderAssetCard from './header-asset-card'
import HeaderInformationCard from './header-information-card'
import Steps from './steps'

function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex-[648]">
          <HeaderInformationCard />
        </div>

        <div className="flex-[434]">
          <HeaderAssetCard />
        </div>
      </div>

      <CardKycVerifyPending />

      <Steps />
    </div>
  )
}

export default memo(DashboardPage, isEqual)
