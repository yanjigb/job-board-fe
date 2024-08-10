import React from 'react'

import DashboardAccountPage from '@/components/business/account'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { DefaultPageProps } from '@/types/common'

async function Account({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang)
  return (
    <section className="max-w-[70.0625rem]">
      <DashboardAccountPage dictionary={dictionary} />
    </section>
  )
}

export default Account
