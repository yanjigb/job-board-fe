import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { ButtonAddAPaymentMethod } from '@/components/common/button-add-a-payment-method'

import { PaymentMethodTable } from '@/components/table/payment-method-table'
import { useDictionary } from '@/providers/dictionary-provider'

function PaymentMethodTab() {
  const { dictionary } = useDictionary()
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-6 px-6 xl:flex-row xl:items-end">
        <div className="max-w-[45.875rem] space-y-2">
          <h2 className="text-body/large/semibold">{dictionary['Payment Methods']}</h2>
          <p className="text-body/small/regular font-light text-text-primary">
            {
              dictionary[
                'P2P payment methods: When you sell cryptocurrencies, the payment method added will be displayed to buyer as options to accept payment, please ensure that the account owner’s name is consistent with your verified name on Binance. You can add up to 20 payment methods.'
              ]
            }
          </p>
        </div>

        <ButtonAddAPaymentMethod />
      </div>

      <PaymentMethodTable />
    </div>
  )
}

export default memo(PaymentMethodTab, isEqual)
