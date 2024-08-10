/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Globe } from 'lucide-react'
import Image from 'next/image'
import { useQueryState } from 'nuqs'
import * as yup from 'yup'

import { AppCombobox } from '@/components/common/app-combobox/app-combobox'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import InputNumber from '@/components/ui/input-number'

import { useDictionary } from '@/providers/dictionary-provider'
import { ExChangeTab } from '@/types/home'
import { cn } from '@/utils/cn'

import { getExchangeTabs } from './constants'
import { DEFAULT_SIGN_IN_FORM, formSchema } from './schema'

const TAB_QUERY_URL = 'tab'

export default function HomePage() {
  const { dictionary } = useDictionary()

  const [queryTab, setQueryTab] = useQueryState(TAB_QUERY_URL)
  const exChangeTabs = useMemo(() => getExchangeTabs(dictionary), [dictionary])

  const currentTab = useMemo(
    () => exChangeTabs.find((tab) => tab.value === queryTab) || exChangeTabs[0],
    [exChangeTabs, queryTab],
  )

  const finalSchema = formSchema(dictionary)

  const form = useForm<yup.InferType<typeof finalSchema>>({
    resolver: yupResolver(finalSchema),
    defaultValues: DEFAULT_SIGN_IN_FORM,
  })

  const onSubmit = useCallback((values: yup.InferType<typeof finalSchema>) => {
    console.log(values)
  }, [])

  return (
    <section className="container py-8">
      <div className="mx-auto w-[calc(min(100%,34.375rem))]">
        <div className="flex">
          {exChangeTabs.map((tab) => {
            const onChangeTab = () => {
              setQueryTab(tab.value)
            }
            const isActive = tab.value === currentTab.value
            return (
              <div className="relative w-full" key={tab.value}>
                {isActive && (
                  <Image
                    src="/images/home/bg-button.svg"
                    alt="bg-button"
                    fill
                    className={cn(
                      'rounded-tl-xl object-cover',
                      tab.value === ExChangeTab.Sell && '-scale-x-100 transform  object-cover',
                    )}
                  />
                )}

                <Button
                  className={cn(
                    'relative z-[2] w-full rounded-none',
                    !isActive && 'text-text-primary',
                  )}
                  variant="none"
                  onClick={onChangeTab}
                >
                  <span className="text-body/large/regular">{tab.label}</span>
                </Button>
              </div>
            )
          })}
        </div>

        <Form {...form}>
          <form className="space-y-6 bg-dark-3 p-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="rounded-[9px] border border-solid border-stroke p-6">
              <p className="text-body/small/regular font-light">{dictionary['You Pay']}</p>
              <div className="mt-4 flex gap-2">
                <FormField
                  control={form.control}
                  name="pay"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex gap-2">
                          <InputNumber
                            className="h-auto border-none px-0 py-0 text-body-large/regular font-light !ring-0"
                            placeholder="20,000.00 - 375,123.000"
                            {...field}
                          />
                          <span>USD</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="rounded-[9px] border border-solid border-stroke p-6">
              <p className="text-body/small/regular font-light">{dictionary['You Receive']}</p>
              <div className="mt-4 flex gap-2">
                <FormField
                  control={form.control}
                  name="pay"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex gap-2">
                          <InputNumber
                            className="h-auto border-none px-0 py-0 text-body-large/regular font-light !ring-0"
                            placeholder="0.00"
                            {...field}
                          />
                          <span className="flex items-center gap-2">
                            <span className="min-w-6">
                              <Image
                                src="/images/coin/usdt.svg"
                                width={24}
                                height={24}
                                className="size-6"
                                alt="usdt"
                              />
                            </span>
                            <span>USD</span>
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <AppCombobox
              options={[
                {
                  label: 'VN',
                  value: 'VN',
                },
                {
                  label: 'EU',
                  value: 'EU',
                },
                {
                  label: 'USA',
                  value: 'USA',
                },
              ]}
              value="USA"
              placeholder={dictionary['Available Region']}
              iconPrefix={Globe}
              triggerClassName="w-full"
            />

            <p className="pt-6">
              <span className="text-text-secondary">{dictionary['Estimated price']}&nbsp;</span>
              <span>1 USDT ≈ 0.988 USD</span>
            </p>

            <Button className="w-full uppercase">{currentTab.label} USDT</Button>
          </form>
          <div />
        </Form>
      </div>
    </section>
  )
}
