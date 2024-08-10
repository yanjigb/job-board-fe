import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { X } from 'lucide-react'

import { AppCombobox } from '@/components/common/app-combobox/app-combobox'
import { ComboboxTriggerMockup } from '@/components/common/app-combobox/components'
import { AppInputNumber } from '@/components/common/app-input'
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

import { useDictionary } from '@/providers/dictionary-provider'
import { ExChangeTab } from '@/types/home'

import SelectPaymentMethodModal from './modal/select-payment-method-modal'
import { InferTypeFormSchema } from './schema'

function FixedStep2({ form }: { form: UseFormReturn<InferTypeFormSchema> }) {
  const { dictionary } = useDictionary()

  const onPrevious = () => {
    form.setValue('step', 1)
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit((values) => {
          console.log(values)
          form.setValue('step', 3)
        })}
      >
        <FormField
          control={form.control}
          name="totalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                <span>{dictionary['Total Amount']}</span>
                <span className="text-body/small/regular font-light text-text-primary">
                  ≈ 0 VND
                </span>
              </FormLabel>
              <FormControl>
                <AppInputNumber
                  {...field}
                  inputSuffix="USDT"
                  placeholder={dictionary['Please enter total amount']}
                />
              </FormControl>
              {form.getValues('tab') === ExChangeTab.Sell && (
                <FormDescription>
                  {dictionary.Available}: <span className="text-text-dark">0</span> USDT
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>{dictionary['Order Limit']}</FormLabel>

          <div className="flex items-start gap-3">
            <FormField
              control={form.control}
              name="minAmount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <AppInputNumber
                      {...field}
                      inputSuffix="USD"
                      placeholder={dictionary['Please enter min amount']}
                    />
                  </FormControl>
                  <FormDescription>≈ 15.00 USDT</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span className="mt-2 inline-block text-heading-6">~</span>

            <FormField
              control={form.control}
              name="maxAmount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <AppInputNumber
                      {...field}
                      inputSuffix="USD"
                      placeholder={dictionary['Please enter max amount']}
                    />
                  </FormControl>
                  <FormDescription>≈ 15.00 USDT</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="paymentMethods"
          render={({ field, fieldState }) => (
            <FormItem>
              <SelectPaymentMethodModal form={form}>
                <ComboboxTriggerMockup
                  role="button"
                  className="w-full gap-2 [&_.chevron]:-rotate-90 [&_.chevron]:opacity-100"
                  error={fieldState.error}
                >
                  <div className="flex flex-wrap gap-[0.625rem]">
                    {field.value && field.value.length
                      ? field.value.map((item) => (
                          <span
                            key={item}
                            className="flex items-center gap-1 bg-success/10 px-2 py-[0.125rem] text-body/small/regular font-light text-success"
                          >
                            {item}

                            <Button
                              variant="none"
                              size="none"
                              asChild
                              onClick={(e) => {
                                e.stopPropagation()
                                const nextValue =
                                  field.value && field.value.filter((v) => v !== item)
                                field.onChange(nextValue)
                              }}
                            >
                              <span>
                                <X size={16} />
                              </span>
                            </Button>
                          </span>
                        ))
                      : dictionary['Select Payment Method']}
                  </div>
                </ComboboxTriggerMockup>
              </SelectPaymentMethodModal>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payTimeLimit"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormLabel>{dictionary['Payment Time Limit']}</FormLabel>
              <AppCombobox
                triggerClassName="w-full"
                placeholder={dictionary['Select time limit']}
                options={[
                  {
                    label: `15 ${dictionary.Mins}`,
                    value: '15',
                  },
                  {
                    label: `30 ${dictionary.Mins}`,
                    value: '30',
                  },
                ]}
                value={field.value ?? ''}
                onChange={field.onChange}
                error={fieldState.error}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button className="w-full" variant="ghost" onClick={onPrevious} type="button">
            {dictionary.Previous}
          </Button>
          <Button className="w-full" type="submit">
            {dictionary.Next}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default FixedStep2
