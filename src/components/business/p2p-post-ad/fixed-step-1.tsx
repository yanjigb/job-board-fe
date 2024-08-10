import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ArrowRight, Minus, Plus } from 'lucide-react'

import { AppCombobox } from '@/components/common/app-combobox/app-combobox'
import AppInput from '@/components/common/app-input'
import { Asset, AssetSymbol } from '@/components/common/asset'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import InputNumber from '@/components/ui/input-number'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { useDictionary } from '@/providers/dictionary-provider'
import { PostAdPriceType } from '@/types/post-ad'

import { InferTypeFormSchema } from './schema'

interface IPostAdFixedStep1Props {
  form: UseFormReturn<InferTypeFormSchema>
}

function PostAdFixedStep1({ form }: IPostAdFixedStep1Props) {
  const { dictionary } = useDictionary()

  const onSubmit = () => {
    form.setValue('step', form.getValues('step') + 1)
  }

  const priceType = form.getValues('type')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex w-full items-start gap-3">
          <FormField
            name="asset"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormLabel>{dictionary.Asset}</FormLabel>
                <FormControl>
                  <AppCombobox
                    triggerClassName="w-full [&_.item]:gap-[0.625rem]"
                    customPrefix={<Asset symbol={AssetSymbol.USDT} size={16} hiddenChildren />}
                    hiddenSearch
                    placeholder={dictionary['Select asset']}
                    options={[
                      {
                        label: 'USDT',
                        value: 'usdt',
                      },
                      {
                        label: 'BTC',
                        value: 'btc',
                      },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <span className="mt-10 rounded-full bg-success/20 p-2">
            <ArrowRight size={16} className="size-4 text-success" />
          </span>

          <FormField
            name="fiat"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormLabel>{dictionary['With Fiat']}</FormLabel>
                <AppCombobox
                  triggerClassName="w-full"
                  hiddenSearch
                  options={[
                    {
                      label: 'USD',
                      value: 'USD',
                    },
                    {
                      label: 'VND',
                      value: 'vND',
                    },
                  ]}
                  value={field.value}
                  placeholder={dictionary['Select fiat']}
                  onChange={field.onChange}
                  error={fieldState.error}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-6">
          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value)
                  form.resetField('amount', {
                    defaultValue: 0,
                  })
                }}
                className="flex items-center gap-6"
              >
                <span>{dictionary['Price Type']}:</span>

                <FormItem className="flex items-center gap-2">
                  <FormLabel className="m-0 font-light" htmlFor={PostAdPriceType.Fixed}>
                    <RadioGroupItem
                      value={PostAdPriceType.Fixed}
                      formValue={field.value}
                      id={PostAdPriceType.Fixed}
                    />
                    {dictionary.Fixed}
                  </FormLabel>
                </FormItem>

                <FormItem className="flex items-center gap-2">
                  <FormLabel className="m-0 font-light" htmlFor={PostAdPriceType.Floating}>
                    <RadioGroupItem
                      value={PostAdPriceType.Floating}
                      formValue={field.value}
                      id={PostAdPriceType.Floating}
                    />
                    {dictionary.Floating}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            )}
          />
        </div>

        {priceType === PostAdPriceType.Fixed && (
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-4 rounded-[9px] border border-solid border-stroke px-6 py-[1.4375rem]">
                  <p className="text-body/small/regular font-light">{dictionary.Fixed}</p>

                  <FormItem className="w-full">
                    <div className="flex gap-2">
                      <FormControl>
                        <InputNumber
                          className="h-auto border-none px-0 py-0 text-body-large/regular !ring-0"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>

                      <span className="text-body/large/regular font-light">USDT</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                </div>

                <FormDescription>
                  {dictionary['The fixed price should be between']} 20566 - 30848
                </FormDescription>
              </FormItem>
            )}
          />
        )}

        {priceType === PostAdPriceType.Floating && (
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => {
              const decrease = () => {
                const nextValue = +field.value - 1
                if (nextValue < 0) return
                field.onChange(nextValue)
              }

              const increase = () => {
                const nextValue = +field.value + 1
                if (nextValue > 100) return
                field.onChange(nextValue)
              }

              const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                if (+event.target.value > 100 || +event.target.value < 0) {
                  return
                }

                field.onChange(event)
              }

              const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
                field.onChange(Number(event.target.value).toFixed(2))
              }

              return (
                <FormItem>
                  <div className="inline-flex items-center gap-3 rounded-lg bg-stroke p-1">
                    <Button
                      type="button"
                      variant="bg"
                      className="h-auto p-2"
                      aria-label="increase percent"
                      onClick={decrease}
                    >
                      <Minus className="text-text-dark" />
                    </Button>

                    <AppInput
                      {...field}
                      classNameWrapper="max-w-[4.125rem] border-0 p-0 !ring-0 gap-0 h-auto"
                      className="text-center"
                      inputSuffix="%"
                      type="number"
                      step={0.01}
                      onChange={onInputChange}
                      onBlur={onInputBlur}
                    />

                    <Button
                      type="button"
                      variant="bg"
                      className="h-auto p-2"
                      aria-label="decrease percent"
                      onClick={increase}
                    >
                      <Plus className="text-text-dark" />
                    </Button>
                  </div>

                  <FormDescription>
                    {dictionary['Pricing formula']} 1.000 * 100.00% ≈{' '}
                    <span className="text-text-dark">1.000</span> USD
                  </FormDescription>
                </FormItem>
              )
            }}
          />
        )}

        <ul className="grid grid-cols-2 gap-6 pb-6">
          <li className="space-y-1">
            <p className="text-text-primary">{dictionary['Your Price']}</p>
            <p className="text-heading-6">$ 1.000</p>
          </li>

          <li className="space-y-1">
            <p className="text-text-primary">{dictionary['Highest Order Price']}</p>
            <p className="text-heading-6">$ 1.000</p>
          </li>
        </ul>

        <Button className="w-full">{dictionary.Next}</Button>
      </form>
    </Form>
  )
}

export default PostAdFixedStep1
