import React from 'react'

import TransactionHistoryPage from '@/components/business/transaction-history'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { DefaultPageProps } from '@/types/common'

async function TransactionHistory({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang)

  return (
    <section className="max-w-[70.0625rem] p-4 xl:p-6 xl:pr-0">
      <TransactionHistoryPage dictionary={dictionary} />
    </section>
  )
}

export default TransactionHistory
