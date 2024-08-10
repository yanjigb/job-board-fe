/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import {
  ComboboxItemMockup,
  ComboboxTriggerMockup,
} from '@/components/common/app-combobox/components'
import { AppDrawerContent } from '@/components/common/app-drawer'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'

import { P2P_ASSETS_DATA } from '../faker'
import { IFormProps } from '../schema'

function AssetFilterMobile({ form }: IFormProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ComboboxTriggerMockup className="w-auto min-w-[7.5rem]">USDT</ComboboxTriggerMockup>
      </DrawerTrigger>

      <AppDrawerContent type="bottom" search classNameContent="px-0">
        {P2P_ASSETS_DATA.map((item) => (
          <ComboboxItemMockup key={item.value}>{item.label}</ComboboxItemMockup>
        ))}
      </AppDrawerContent>
    </Drawer>
  )
}

export default memo(AssetFilterMobile, isEqual)
