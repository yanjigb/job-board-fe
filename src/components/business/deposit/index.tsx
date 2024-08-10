import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { DictionaryProps } from '@/types/common'

import FormDeposit from './form'

function WalletDepositPage({ dictionary }: DictionaryProps) {
  return (
    <div className="space-y-9">
      <h1 className="text-heading-4">{dictionary['Deposit Crypto']}</h1>

      <FormDeposit />
    </div>
  )
}

export default memo(WalletDepositPage, isEqual)
