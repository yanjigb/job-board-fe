import React from 'react'

import WalletDepositPage from '@/components/business/deposit'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { DefaultPageProps } from '@/types/common'

async function WalletDeposit({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang)

  return (
    <section className="max-w-[48rem] p-4 xl:p-6">
      <WalletDepositPage dictionary={dictionary} />
    </section>
  )
}

export default WalletDeposit
