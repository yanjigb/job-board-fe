import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import P2pMyAdsPage from '@/components/business/p2p-my-ads'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { DefaultPageProps } from '@/types/common'

async function P2pMyAds({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang)
  return (
    <section>
      <P2pMyAdsPage dictionary={dictionary} />
    </section>
  )
}

export default memo(P2pMyAds, isEqual)
