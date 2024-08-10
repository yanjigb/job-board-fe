import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { format } from 'date-fns'
import { PenLine } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useDictionary } from '@/providers/dictionary-provider'

import FeedbackModal from '../feedback-modal'
import {
  HeaderInformationContentLayout,
  HeaderInformationItem,
  HeaderInformationLayout,
  HeaderLabel,
} from '../ui'

function HeaderCompleted() {
  const { dictionary } = useDictionary()
  return (
    <div className="py-10">
      <div className="flex flex-col-reverse justify-between gap-x-2 gap-y-4 md:flex-row">
        <HeaderInformationLayout>
          <HeaderLabel label={dictionary.Sell} buy={false}>
            <span>{dictionary['Order Completed']}</span>
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

        <FeedbackModal>
          <Button variant="secondary" className="gap-2 self-end md:self-start">
            <PenLine size={20} strokeWidth={1} />
            {dictionary.Feedback}
          </Button>
        </FeedbackModal>
      </div>
    </div>
  )
}

export default memo(HeaderCompleted, isEqual)
