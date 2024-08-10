import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { format } from 'date-fns'

import { useDictionary } from '@/providers/dictionary-provider'

import {
  HeaderInformationContentLayout,
  HeaderInformationItem,
  HeaderInformationLayout,
  HeaderLabel,
} from '../ui'

function HeaderPending() {
  const { dictionary } = useDictionary()
  return (
    <div className="py-10">
      <div className="flex flex-col-reverse justify-between gap-4 lg:flex-row lg:items-center">
        <HeaderInformationLayout>
          <HeaderLabel buy={false} label={dictionary.Sell}>
            Buy USDT From Jonathan Higgins
          </HeaderLabel>

          <HeaderInformationContentLayout>
            {[
              { label: dictionary['Order number'], value: '20576068751833321472' },
              {
                label: dictionary['Time created'],
                value: format(new Date('2024-01-04 10:38:17'), 'yyyy-MM-dd hh:mm:ss'),
              },
            ].map((item) => (
              <HeaderInformationItem key={item.label} label={item.label} value={item.value} />
            ))}
          </HeaderInformationContentLayout>
        </HeaderInformationLayout>

        <p className="space-x-6 self-end border border-dark-3 py-6 pl-8 pr-[2.125rem] xl:self-start">
          <span className="text-body/medium/regular font-light">
            {dictionary['Pay the seller within']}
          </span>
          <span className="text-heading-4 font-bold text-secondary">23 : 56</span>
        </p>
      </div>
    </div>
  )
}

export default memo(HeaderPending, isEqual)
