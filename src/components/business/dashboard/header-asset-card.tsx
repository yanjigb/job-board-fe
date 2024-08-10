'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import AppLink from '@/components/common/app-link'
import { AssetCardContent } from '@/components/common/asset-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import RouteNames from '@/constants/routes'
import { useDictionary } from '@/providers/dictionary-provider'

function HeaderAssetCard() {
  const { dictionary } = useDictionary()

  return (
    <Card className="space-y-5">
      <AssetCardContent assetDefault="BTC" />

      <div className="flex flex-col gap-3 md:flex-row">
        <AppLink href={RouteNames.Deposit} className="block w-full">
          <Button variant="bg" rounded="none" className="w-full">
            {dictionary.Deposit}
          </Button>
        </AppLink>
        <AppLink href="/##" className="block w-full">
          <Button variant="bg" rounded="none" className="w-full">
            {dictionary.Withdraw}
          </Button>
        </AppLink>
      </div>
    </Card>
  )
}

export default memo(HeaderAssetCard, isEqual)
