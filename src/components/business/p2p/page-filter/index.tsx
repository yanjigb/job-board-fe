'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Filter, Globe, RefreshCcw, Wallet } from 'lucide-react'
import * as yup from 'yup'

import { AppCombobox } from '@/components/common/app-combobox/app-combobox'
import AppComboboxWithCheckbox from '@/components/common/app-combobox/app-combobox-with-checkbox'
import AppComboboxWithInput from '@/components/common/app-combobox/app-combobox-with-input'
import { ComboboxTriggerMockup } from '@/components/common/app-combobox/components'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Popover, PopoverContent } from '@/components/ui/popover'

import { DEFAULT_VALUE } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'

import {
  ASSETS_VALUE_DEFAULT,
  FIAT_VALUE_DEFAULT,
  getAllPayPaymentsDefaultOption,
  getAllRegionsDefaultOption,
  getRefreshingDefaultOption,
  TYPE_VALUE_DEFAULT,
} from '../constants'
import {
  P2P_ASSETS_DATA,
  P2P_FIAT_DATA,
  P2P_PAYMENTS_DATA,
  P2P_REFRESHING_DATA,
  P2P_REGIONS_DATA,
} from '../faker'
import { InferTypeFormSchema } from '../schema'

import AssetFilterMobile from './asset-filter-mobile'
import FiatFilterMobile from './fiat-filter-mobile'
import MegaFilter from './mega-filter'
import MegaFilterMobile from './mega-filter-mobile'
import RefreshingFilterMobile from './refreshing-filter-mobile'
import SelectType from './select-type'

function PageFilter() {
  const { dictionary } = useDictionary()

  const allPaymentsOptions = React.useMemo(
    () => [getAllPayPaymentsDefaultOption(dictionary), ...P2P_PAYMENTS_DATA],
    [dictionary],
  )

  const allRegionsOptions = React.useMemo(
    () => [getAllRegionsDefaultOption(dictionary), ...P2P_REGIONS_DATA],
    [dictionary],
  )

  const refreshOptions = React.useMemo(
    () => [getRefreshingDefaultOption(dictionary), ...P2P_REFRESHING_DATA],
    [dictionary],
  )

  const FormSchema = yup.object({
    type: yup.string().required(),
    order: yup.string(),
    asset: yup.string().required(),
    fiat: yup.string().required(),
    period: yup.array().required(),
    payTypes: yup.array().required(),
  })

  const form = useForm<InferTypeFormSchema>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      type: TYPE_VALUE_DEFAULT,
      order: DEFAULT_VALUE,
      asset: ASSETS_VALUE_DEFAULT,
      fiat: FIAT_VALUE_DEFAULT,
      period: [],
      payTypes: [],
    },
  })

  const onSubmit = (data: InferTypeFormSchema) => {
    console.log('🚀 ~ onSubmit ~ data:', data)
  }

  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
          <div className="space-y-6 md:hidden">
            <div className="flex items-center justify-between gap-8">
              <SelectType form={form} />

              <div className="flex gap-2">
                <MegaFilterMobile form={form} />
                <RefreshingFilterMobile form={form} />
              </div>
            </div>

            <div className="flex w-full gap-2">
              <AssetFilterMobile form={form} />
              <FiatFilterMobile form={form} />
            </div>
          </div>

          <div className="hidden items-center justify-between gap-8 md:flex md:justify-start">
            <SelectType form={form} />

            <ul className="hidden gap-8 lg:flex">
              {P2P_ASSETS_DATA.map((item) => (
                <li className="" key={item.label}>
                  <Button className="font-semibold" variant="none" size="none">
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden flex-col justify-between gap-2 md:flex xl:flex-row">
            <div className="flex gap-2">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="asset"
                  render={({ field }) => (
                    <AppCombobox
                      {...field}
                      options={P2P_ASSETS_DATA}
                      value="USDT"
                      placeholder={dictionary.Asset}
                      triggerClassName="min-w-[7.5rem] w-auto lg:hidden"
                      contentClassName="min-w-[12.5rem]"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="fiat"
                  render={({ field }) => (
                    <AppComboboxWithInput
                      {...field}
                      type="number"
                      options={P2P_FIAT_DATA}
                      triggerClassName="md:w-[17.5rem] w-full"
                      placeholder={dictionary['Enter amount']}
                    />
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="payTypes"
                render={({ field }) => (
                  <AppComboboxWithCheckbox
                    {...field}
                    options={allPaymentsOptions}
                    placeholder={dictionary['All Payments']}
                    triggerClassName="w-[17.5rem]"
                    iconPrefix={Wallet}
                  />
                )}
              />
            </div>

            <div className="flex flex-1 justify-between gap-2">
              <div className="flex gap-2">
                <AppCombobox
                  options={allRegionsOptions}
                  value=""
                  placeholder={dictionary['All Regions']}
                  triggerClassName="w-[17.5rem]"
                  iconPrefix={Globe}
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <ComboboxTriggerMockup
                      className="w-auto min-w-12 p-[0.6875rem]"
                      hiddenChevron
                      aria-label="Filter"
                    >
                      <Filter size={24} strokeWidth="1" className="size-6 text-text-primary" />
                    </ComboboxTriggerMockup>
                  </PopoverTrigger>

                  <PopoverContent
                    align="start"
                    className="w-[calc(min(31rem,100vw-1.5rem))] px-4 py-[0.625rem]"
                  >
                    <MegaFilter form={form} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex gap-2">
                <AppCombobox
                  options={refreshOptions}
                  value=""
                  placeholder={dictionary.Manual}
                  triggerClassName="w-[11.25rem] hidden md:flex"
                  iconPrefix={RefreshCcw}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default memo(PageFilter, isEqual)
