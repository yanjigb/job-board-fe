/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { RefreshCcw } from 'lucide-react'

import {
  ComboboxItemMockup,
  ComboboxTriggerMockup,
} from '@/components/common/app-combobox/components'
import { AppDrawerContent } from '@/components/common/app-drawer'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'

import { useDictionary } from '@/providers/dictionary-provider'

import { getRefreshingDefaultOption } from '../constants'
import { P2P_REFRESHING_DATA } from '../faker'
import { IFormProps } from '../schema'

function RefreshingFilterMobile({ form }: IFormProps) {
  const { dictionary } = useDictionary()

  const refreshOptions = React.useMemo(
    () => [getRefreshingDefaultOption(dictionary), ...P2P_REFRESHING_DATA],
    [dictionary],
  )

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ComboboxTriggerMockup className="w-auto px-3" hiddenChevron aria-label="Refresh Frequency">
          <RefreshCcw size={24} strokeWidth="1" className="size-6 text-text-primary" />
        </ComboboxTriggerMockup>
      </DrawerTrigger>

      <AppDrawerContent type="bottom" label="Refresh Frequency" classNameContent="px-0">
        {refreshOptions.map((item) => (
          <ComboboxItemMockup key={item.value}>{item.label}</ComboboxItemMockup>
        ))}
      </AppDrawerContent>
    </Drawer>
  )
}

export default memo(RefreshingFilterMobile, isEqual)
