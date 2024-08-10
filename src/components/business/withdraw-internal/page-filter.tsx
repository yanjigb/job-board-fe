'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { Button } from '@/components/ui/button'
import { InputRaw } from '@/components/ui/input'

import { useDictionary } from '@/providers/dictionary-provider'

function PageFilter() {
  const { dictionary } = useDictionary()
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <InputRaw placeholder={dictionary['Enter Name Wallet']} />
      <InputRaw placeholder={dictionary['Enter Wallet Address']} />
      <Button className="min-w-[7.5rem] rounded-none">{dictionary.Add}</Button>
    </div>
  )
}

export default memo(PageFilter, isEqual)
