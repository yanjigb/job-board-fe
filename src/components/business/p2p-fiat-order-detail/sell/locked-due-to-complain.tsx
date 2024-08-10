import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import clsx from 'clsx'

import { useDictionary } from '@/providers/dictionary-provider'

import {
  BankInformationContentLayout,
  BankInformationItem,
  BankName,
  BanksLayout,
  OrderInformationContentLayout,
  OrderInformationItem,
  StepHeading,
  StepLayout,
  StepNumber,
} from '../ui'

function SellLockedDueToComplain() {
  const { dictionary } = useDictionary()
  return (
    <div>
      <h3 className={clsx('text-h5/medium', 'bg-error p-3 pt-2')}>
        {
          dictionary[
            'Exclusive administrators will respond and resolve the transaction as soon as possible'
          ]
        }
      </h3>
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

          <BanksLayout className="flex flex-col items-start gap-6 xl:flex-row">
            <BankName className="whitespace-nowrap">{dictionary['Bank Transfer']}</BankName>

            <BankInformationContentLayout className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
    </div>
  )
}

export default memo(SellLockedDueToComplain, isEqual)
