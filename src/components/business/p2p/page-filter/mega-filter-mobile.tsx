import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Filter, Globe } from 'lucide-react'

import {
  ComboboxItemMockup,
  ComboboxTriggerMockup,
} from '@/components/common/app-combobox/components'
import { AppDrawerContent } from '@/components/common/app-drawer'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { FormItem, FormLabel } from '@/components/ui/form'

import { useDictionary } from '@/providers/dictionary-provider'

import { getAllPayPaymentsDefaultOption, getAllRegionsDefaultOption } from '../constants'
import { P2P_PAYMENTS_DATA, P2P_REGIONS_DATA } from '../faker'
import { IFormProps } from '../schema'

import MegaFilter from './mega-filter'

const PaymentMethods = memo(function PaymentMethods() {
  const { dictionary } = useDictionary()

  const allPaymentsOptions = React.useMemo(
    () => [getAllPayPaymentsDefaultOption(dictionary), ...P2P_PAYMENTS_DATA],
    [dictionary],
  )

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ComboboxTriggerMockup className="w-full">
          {allPaymentsOptions[0].label}
        </ComboboxTriggerMockup>
      </DrawerTrigger>

      <AppDrawerContent type="bottom" className="bottom-0 mt-0" classNameContent="px-0" search>
        {allPaymentsOptions.map((item) => (
          <ComboboxItemMockup key={item.value}>
            <Checkbox />
            {item.label}
          </ComboboxItemMockup>
        ))}
      </AppDrawerContent>
    </Drawer>
  )
}, isEqual)
PaymentMethods.displayName = 'PaymentMethods'

const CountryRegions = memo(function CountryRegions() {
  const { dictionary } = useDictionary()

  const allRegionsOptions = React.useMemo(
    () => [getAllRegionsDefaultOption(dictionary), ...P2P_REGIONS_DATA],
    [dictionary],
  )
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ComboboxTriggerMockup className="w-full" iconPrefix={Globe}>
          {allRegionsOptions[0].label}
        </ComboboxTriggerMockup>
      </DrawerTrigger>

      <AppDrawerContent type="bottom" search classNameContent="px-0">
        {allRegionsOptions.map((item) => (
          <ComboboxItemMockup key={item.value}>{item.label}</ComboboxItemMockup>
        ))}
      </AppDrawerContent>
    </Drawer>
  )
}, isEqual)
CountryRegions.displayName = 'CountryRegions'

function MegaFilterMobile({ form }: IFormProps) {
  const { dictionary } = useDictionary()
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="border border-solid border-stroke p-[0.6875rem]"
          variant="none"
          size="none"
        >
          <Filter size={24} strokeWidth="1" className="size-6 text-text-primary" />
        </Button>
      </DrawerTrigger>

      <AppDrawerContent type="bottom" label="Filters">
        <div className="space-y-6">
          <FormItem>
            <FormLabel className="text-text-secondary">{dictionary['Payment Methods']}</FormLabel>
            <PaymentMethods />
          </FormItem>

          <FormItem>
            <FormLabel className="text-text-secondary">{dictionary['Country/Region']}</FormLabel>
            <CountryRegions />
          </FormItem>

          <MegaFilter form={form} />
        </div>
        <div className="sticky bottom-0 left-0 flex gap-2 bg-dark-2 py-4">
          <Button variant="ghost" className="w-full">
            {dictionary.Reset}
          </Button>
          <Button className="w-full">{dictionary.Confirm}</Button>
        </div>
      </AppDrawerContent>
    </Drawer>
  )
}

export default memo(MegaFilterMobile, isEqual)
