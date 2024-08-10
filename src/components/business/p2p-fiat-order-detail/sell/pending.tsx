import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { Button } from '@/components/ui/button'

import { useDictionary } from '@/providers/dictionary-provider'

import ComplainReleaseModal from '../complain-release-modal'
import ReceivedMoneyModal from '../received-money-modal'
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
} from '../ui'

function SellPending() {
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
          <StepHeading>{dictionary['Confirm payment has been received']}</StepHeading>
          <p className="text-text-primary">
            {
              dictionary[
                'After confirming payment, please click the "I have received the money" button'
              ]
            }
          </p>
        </div>
      </StepLayout>

      <FooterActionsLayout>
        <ComplainReleaseModal>
          <Button variant="ghost">{dictionary.Report} 12:30</Button>
        </ComplainReleaseModal>

        <ReceivedMoneyModal>
          <Button>{dictionary['I have received the money']}</Button>
        </ReceivedMoneyModal>
      </FooterActionsLayout>
    </div>
  )
}

export default memo(SellPending, isEqual)
