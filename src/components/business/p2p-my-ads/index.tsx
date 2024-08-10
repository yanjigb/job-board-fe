import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { CirclePlus } from 'lucide-react'

import AppLink from '@/components/common/app-link'
import { buttonVariants } from '@/components/ui/button'

import RouteNames from '@/constants/routes'
import { DictionaryProps } from '@/types/common'

import PageFilter from './page-filter'
import PageTable from './page-table'

function P2pMyAdsPage({ dictionary }: DictionaryProps) {
  return (
    <div className="container space-y-5 py-6">
      <div className="flex items-start justify-between">
        <h1 className="text-heading-4 font-bold">{dictionary['My ADs']}</h1>
        <AppLink
          href={RouteNames.PostAd}
          className={buttonVariants({ className: 'min-w-[10.9375rem]' })}
        >
          <CirclePlus size={20} />
          {dictionary['Post new Ad']}
        </AppLink>
      </div>

      <PageFilter />
      <PageTable />
    </div>
  )
}

export default memo(P2pMyAdsPage, isEqual)
