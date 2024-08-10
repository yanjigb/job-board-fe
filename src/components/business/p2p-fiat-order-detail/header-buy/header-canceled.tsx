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

function HeaderCanceled() {
  const { dictionary } = useDictionary()
  return (
    <div className="py-10">
      <div className="flex flex-col-reverse justify-between gap-x-2 gap-y-4 md:flex-row">
        <HeaderInformationLayout>
          <HeaderLabel label={dictionary.Buy}>
            <span className="text-error">{dictionary['Order Canceled']}</span>
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
      </div>
    </div>
  )
}

export default memo(HeaderCanceled, isEqual)
