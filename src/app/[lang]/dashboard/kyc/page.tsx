import React from 'react'

import DashboardKycPage from '@/components/business/kyc'
import Footer from '@/components/layout/footer'

function DashboardKyc() {
  return (
    <>
      <section className="flex h-full max-w-[68.375rem] flex-col p-4 xl:p-6">
        <DashboardKycPage />
      </section>

      <Footer className="pb-8" />
    </>
  )
}

export default DashboardKyc
