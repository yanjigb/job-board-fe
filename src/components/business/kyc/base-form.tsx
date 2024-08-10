import React from 'react'
import { UseFormReturn } from 'react-hook-form'

import { AppCombobox } from '@/components/common/app-combobox/app-combobox'
import AppInput from '@/components/common/app-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { useDictionary } from '@/providers/dictionary-provider'
import { KycStep } from '@/types/kyc'

import { InferTypeFormBaseSchema } from './schema'
import { FormNavigation, KycCard } from './ui'

function BaseForm({
  form,
  onSubmit,
}: {
  form: UseFormReturn<InferTypeFormBaseSchema>
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  const { dictionary } = useDictionary()
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <KycCard>
          <FormField
            control={form.control}
            name="nation"
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormLabel>{dictionary.Nationality}</FormLabel>
                <AppCombobox
                  {...field}
                  triggerClassName="w-full [&_.chevron]:opacity-100 [&_.chevron]:text-text-primary"
                  placeholder={dictionary['Select your country']}
                  error={fieldState.error}
                  options={[{ label: 'Select your country', value: 'null' }]}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{dictionary['Your address']}</FormLabel>
                <FormControl>
                  <AppInput {...field} placeholder={dictionary['Enter your address']} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <RadioGroup
                asChild
                className="gap-0"
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormItem className="w-full space-y-3">
                  <FormLabel>{dictionary['Choose your Document type']}</FormLabel>

                  <div className="flex gap-11">
                    <FormItem>
                      <FormLabel htmlFor={KycStep.IdCard}>
                        <RadioGroupItem
                          id={KycStep.IdCard}
                          value={KycStep.IdCard}
                          formValue={field.value}
                        />
                        {dictionary['ID Card']}
                      </FormLabel>
                    </FormItem>

                    <FormItem>
                      <FormLabel htmlFor={KycStep.UtilityBill}>
                        <RadioGroupItem
                          id={KycStep.UtilityBill}
                          value={KycStep.UtilityBill}
                          formValue={field.value}
                        />
                        {dictionary['Utility bill']}
                      </FormLabel>
                    </FormItem>
                  </div>
                  <FormMessage />
                </FormItem>
              </RadioGroup>
            )}
          />
        </KycCard>

        <FormNavigation />
      </form>
    </Form>
  )
}

export default BaseForm
