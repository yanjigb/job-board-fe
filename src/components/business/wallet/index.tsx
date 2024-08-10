import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import AppLink from '@/components/common/app-link'
import { AssetCardContent } from '@/components/common/asset-card'
import { ButtonAddAPaymentMethod } from '@/components/common/button-add-a-payment-method'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { PaymentMethodTable } from '@/components/table/payment-method-table'
import RouteNames from '@/constants/routes'
import { DictionaryProps } from '@/types/common'

function WalletPage({ dictionary }: DictionaryProps) {
  return (
    <div className="space-y-6">
      <Card className="flex items-center justify-between">
        <AssetCardContent assetDefault="USDT" />

        <div className="flex gap-3">
          <AppLink href={RouteNames.Deposit}>
            <Button variant="bg" rounded="none" className="min-w-[11.6875rem]">
              {dictionary.Deposit}
            </Button>
          </AppLink>
          <AppLink href={RouteNames.Withdraw}>
            <Button variant="bg" rounded="none" className="min-w-[11.6875rem]">
              {dictionary.Withdraw}
            </Button>
          </AppLink>
        </div>
      </Card>

      <div className="flex items-end justify-between pl-6">
        <article className="max-w-[45.875rem] space-y-2">
          <h2 className="text-body/large/semibold">{dictionary.Payment}</h2>
          <p className="text-body/small/regular font-light text-text-primary">
            {
              dictionary[
                'P2P payment methods: When you sell cryptocurrencies, the payment method added will be displayed to buyer as options to accept payment, please ensure that the account owner’s name is consistent with your verified name on Binance. You can add up to 20 payment methods.'
              ]
            }
          </p>
        </article>

        <ButtonAddAPaymentMethod />
      </div>

      <div className="pt-2">
        <PaymentMethodTable />
      </div>
    </div>
  )
}

export default memo(WalletPage, isEqual)
