/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import {
  ComboboxItemMockup,
  ComboboxTriggerMockup,
} from '@/components/common/app-combobox/components'
import { AppDrawerContent } from '@/components/common/app-drawer'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import InputNumber from '@/components/ui/input-number'

import { useDictionary } from '@/providers/dictionary-provider'

import { P2P_FIAT_DATA } from '../faker'
import { IFormProps } from '../schema'

function FiatFilterMobile({ form }: IFormProps) {
  const { dictionary } = useDictionary()

  return (
    <Drawer>
      <div className="flex w-full rounded-md border border-solid border-stroke">
        <InputNumber
          className="h-auto border-none !ring-0"
          placeholder={dictionary['Enter amount']}
        />

        <DrawerTrigger asChild>
          <ComboboxTriggerMockup className="w-[40%] justify-end gap-1 border-none pr-3">
            USD
          </ComboboxTriggerMockup>
        </DrawerTrigger>
      </div>

      <AppDrawerContent type="bottom" search className="px-0">
        {P2P_FIAT_DATA.map((item) => (
          <ComboboxItemMockup key={item.value}>{item.label}</ComboboxItemMockup>
        ))}
      </AppDrawerContent>
    </Drawer>
  )
}

export default memo(FiatFilterMobile, isEqual)
