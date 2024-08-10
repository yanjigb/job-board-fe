'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Search } from 'lucide-react'

import AppComboboxWithInput from '@/components/common/app-combobox/app-combobox-with-input'
import { AppInputLayout } from '@/components/common/app-input'
import { Asset, AssetSymbol } from '@/components/common/asset'
import { Button } from '@/components/ui/button'
import { InputRaw } from '@/components/ui/input'

import { ALL_VALUE } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'

import { getStatusOptions, getTimeOptions, getTypeOptions } from './constants'

function AssetItem({ symbol }: { symbol: AssetSymbol }) {
  return (
    <Asset symbol={symbol}>
      <span className="text-body/medium/regular font-light uppercase">{symbol}</span>
    </Asset>
  )
}

function PageFilter() {
  const { dictionary } = useDictionary()
  return (
    <div className="flex flex-wrap gap-3">
      <AppComboboxWithInput
        value=""
        options={getTypeOptions(dictionary)}
        hiddenSearch
        inputDisabled
        placeholder={dictionary.Type}
        triggerClassName="w-full sm:max-w-[11.5rem] [&_input]:pr-0"
        popoverTriggerClassName="min-w-[6.5rem]"
      />

      <AppComboboxWithInput
        options={getTimeOptions(dictionary)}
        value=""
        placeholder={dictionary.Time}
        inputDisabled
        hiddenSearch
        triggerClassName="w-full sm:max-w-[11.5rem] [&_input]:pr-3"
        popoverTriggerClassName="min-w-[6.5rem]"
      />

      <AppComboboxWithInput
        options={[
          { label: dictionary.All, value: ALL_VALUE },
          {
            label: <AssetItem symbol={AssetSymbol.USDT} />,
            value: 'usdt',
          },
          { label: <AssetItem symbol={AssetSymbol.BTC} />, value: 'btc' },
          { label: <AssetItem symbol={AssetSymbol.ETH} />, value: 'eth' },
          { label: <AssetItem symbol={AssetSymbol.BNB} />, value: 'bnb' },
        ]}
        value=""
        placeholder={dictionary.Coin}
        inputDisabled
        triggerClassName="w-full sm:max-w-[11.5rem] [&_input]:pr-3"
        popoverTriggerClassName="min-w-[6.5rem]"
      />

      <AppComboboxWithInput
        options={getStatusOptions(dictionary)}
        value=""
        placeholder={dictionary.Status}
        inputDisabled
        hiddenSearch
        triggerClassName="w-full sm:max-w-[11.5rem] [&_input]:pr-3"
        popoverTriggerClassName="min-w-[6.5rem]"
      />

      <AppInputLayout
        inputPrefix={<Search size={16} className="text-text-primary" />}
        classNameWrapper="w-full sm:max-w-[11.5rem]"
      >
        <InputRaw variant="none" placeholder="Enter TxID" />
      </AppInputLayout>

      <div className="flex w-full justify-end sm:w-auto">
        <Button variant="ghost">{dictionary.Reset}</Button>
      </div>
    </div>
  )
}

export default memo(PageFilter, isEqual)
