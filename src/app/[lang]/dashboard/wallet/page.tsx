import React from 'react'

import WalletPage from '@/components/business/wallet'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { DefaultPageProps } from '@/types/common'

async function Wallet({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang)
  return (
    <section className="max-w-[70.0625rem] p-4 xl:p-6 xl:pr-0">
      <WalletPage dictionary={dictionary} />
    </section>
  )
}

export default Wallet
