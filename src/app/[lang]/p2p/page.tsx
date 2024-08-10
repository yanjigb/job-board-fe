import React from 'react'

import P2pPage from '@/components/business/p2p'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { DefaultPageProps } from '@/types/common'

async function P2p({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang)
  return (
    <section>
      <P2pPage dictionary={dictionary} />
    </section>
  )
}

export default P2p
