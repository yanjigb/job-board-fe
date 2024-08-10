import React from 'react'

import WalletWithdrawPage from '@/components/business/withdraw'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { DefaultPageProps } from '@/types/common'

async function Withdraw({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang)
  return (
    <section className="max-w-[48rem] p-4 xl:p-6">
      <WalletWithdrawPage dictionary={dictionary} />
    </section>
  )
}

export default Withdraw
