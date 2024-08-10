'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { CirclePlus } from 'lucide-react'

import { useDictionary } from '@/providers/dictionary-provider'

import { Button } from '../ui/button'

const ButtonAddAPaymentMethod = memo(function ButtonAddAPaymentMethod() {
  const { dictionary } = useDictionary()
  return (
    <div>
      <Button className="gap-[0.625rem] self-end justify-self-end">
        <CirclePlus size={20} />
        {dictionary['Add a payment method']}
      </Button>
    </div>
  )
}, isEqual)
ButtonAddAPaymentMethod.displayName = 'ButtonAddAPaymentMethod'

export { ButtonAddAPaymentMethod }
