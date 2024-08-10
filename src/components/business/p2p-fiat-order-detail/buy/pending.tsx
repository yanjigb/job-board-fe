import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { Button } from '@/components/ui/button'

import { useDictionary } from '@/providers/dictionary-provider'

import CancelPaymentModal from '../cancel-payment-modal'
import {
  BankInformationContentLayout,
  BankInformationItem,
  BankName,
  BanksLayout,
  FooterActionsLayout,
  OrderInformationContentLayout,
  OrderInformationItem,
  StepHeading,
  StepLayout,
  StepNumber,
  UploadImages,
} from '../ui'

function BuyPending() {
  const { dictionary } = useDictionary()

  return (
    <div>
      <StepLayout>
        <StepNumber>1</StepNumber>

        <div className="space-y-4">
          <StepHeading>{dictionary['Confirm order info']}</StepHeading>

          <OrderInformationContentLayout>
            {[
              {
                label: dictionary.Amount,
                value: '$ 1,008.00',
                className: '[&_.value]:text-success',
              },
              { label: dictionary.Price, value: '$ 1,008.00' },
              { label: dictionary['Receive Quantity'], value: '1,000.00 USDT' },
            ].map((item) => (
              <OrderInformationItem
                key={item.label}
                label={item.label}
                value={item.value}
                className={item.className}
              />
            ))}
          </OrderInformationContentLayout>
        </div>
      </StepLayout>

      <StepLayout>
        <StepNumber>2</StepNumber>

        <div className="space-y-3">
          <StepHeading>{dictionary['Make Payment']}</StepHeading>

          <BanksLayout>
            <BankName className="whitespace-nowrap">{dictionary['Bank Transfer']}</BankName>

            <BankInformationContentLayout>
              {[
                {
                  label: 'Reference Messenger',
                  value: '39167487936894701',
                },
                { label: 'Full Name', value: 'JOHN SMITH' },
                { label: 'Bank name', value: 'Sterling Horizon Bank' },
                { label: 'Bank Account Number', value: '39167487936894701' },
              ].map((item) => (
                <BankInformationItem label={item.label} value={item.value} key={item.label} />
              ))}
            </BankInformationContentLayout>
          </BanksLayout>
        </div>
      </StepLayout>

      <StepLayout>
        <StepNumber>3</StepNumber>

        <div className="space-y-3">
          <StepHeading>{dictionary['Payment Confirmation']}</StepHeading>
          <p className="text-text-primary">
            {
              dictionary[
                'Upload and send at least 1 (up to 3) proof of payment to the seller. Files uploaded must end with .jpg, .jpeg or ang.'
              ]
            }
          </p>

          <UploadImages />
        </div>
      </StepLayout>

      <StepLayout>
        <StepNumber>4</StepNumber>

        <div className="space-y-1">
          <StepHeading>{dictionary['Notify Seller']}</StepHeading>
          <p className="text-text-primary">{dictionary['Confirm payment and notify the seller']}</p>
        </div>
      </StepLayout>

      <FooterActionsLayout>
        <CancelPaymentModal>
          <Button variant="ghost">{dictionary['Cancel Trading']}</Button>
        </CancelPaymentModal>

        <Button disabled>{dictionary['Transferred, Notify Seller']}</Button>
      </FooterActionsLayout>
    </div>
  )
}

export default memo(BuyPending, isEqual)
