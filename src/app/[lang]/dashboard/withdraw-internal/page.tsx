import React, { memo } from 'react'

import WithdrawInternalPage from '@/components/business/withdraw-internal'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { DefaultPageProps } from '@/types/common'

async function WithdrawInternal({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang)
  return (
    <section className="grid max-w-[70.0625rem] grid-cols-1 p-4 xl:p-6 xl:pr-0">
      <WithdrawInternalPage dictionary={dictionary} />
    </section>
  )
}

export default memo(WithdrawInternal)
