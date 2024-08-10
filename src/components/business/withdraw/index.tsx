import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { DictionaryProps } from '@/types/common'

import FormWithdraw from './form'

function WalletWithdrawPage({ dictionary }: DictionaryProps) {
  return (
    <div className="space-y-9">
      <h1 className="text-heading-4">{dictionary['Withdraw Crypto']}</h1>

      <FormWithdraw />
    </div>
  )
}

export default memo(WalletWithdrawPage, isEqual)
