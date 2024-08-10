import React from 'react'
import { UseFormReturn } from 'react-hook-form'

import AppDatePicker from '@/components/common/app-date-picker'
import AppInput from '@/components/common/app-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { inputVariantDefault, inputVariantError } from '@/components/ui/input'

import { useDictionary } from '@/providers/dictionary-provider'
import { ICustomFile } from '@/types/common'
import { cn } from '@/utils/cn'

import { getConditionHeadingIdCard, getConditionImageIdCard } from './constants'
import { InferTypeFormIdCardSchema } from './schema'
import { FormNavigation, KycCard, UploadImageItem } from './ui'

function IdCardForm({
  form,
  onSubmit,
  onBack,
}: {
  form: UseFormReturn<InferTypeFormIdCardSchema>
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onBack: () => void
}) {
  const { dictionary } = useDictionary()

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <KycCard>
          <div className="space-y-1">
            <h3 className="font-medium">
              {dictionary['Follow the steps below to verify your account within 7 minutes:']}
            </h3>

            <ul className="text-text-primary [&_li]:after:bg-text-primary">
              {getConditionHeadingIdCard(dictionary).map((item) => (
                <li key={item} className="list-style">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full md:max-w-[16.875rem]">
                  <FormLabel>{dictionary['First Name']}</FormLabel>
                  <FormControl>
                    <AppInput
                      {...field}
                      placeholder={dictionary['Enter First Name']}
                      className="placeholder:text-another-9"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full md:max-w-[16.875rem]">
                  <FormLabel>{dictionary['Last Name']}</FormLabel>
                  <FormControl>
                    <AppInput
                      {...field}
                      placeholder={dictionary['Enter Last Name']}
                      className="placeholder:text-another-9"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field, fieldState }) => (
                <FormItem className="w-full md:max-w-[16.875rem]">
                  <FormLabel>{dictionary['Day of Birth']}</FormLabel>
                  <AppDatePicker
                    classNameTrigger={cn(
                      inputVariantDefault,
                      'w-full [&_.placeholder]:text-another-9',
                      fieldState.error && inputVariantError,
                    )}
                    placeholder="DD / MM / YYYY"
                    isHiddenIcon
                    onSetDate={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">{dictionary['Take a photo of your Document']}</h3>

            <ul className="space-y-1 text-text-primary [&_li]:!my-0 [&_li]:after:bg-text-primary">
              {getConditionImageIdCard(dictionary).map((item) => (
                <li key={item} className="list-style">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="front"
              render={({ field }) => (
                <FormItem>
                  <UploadImageItem
                    id="front"
                    label={dictionary.Front}
                    file={field.value as ICustomFile}
                    onFileChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="back"
              render={({ field }) => (
                <FormItem>
                  <UploadImageItem
                    id={field.name}
                    label={dictionary.Back}
                    file={field.value as ICustomFile}
                    onFileChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </KycCard>

        <FormNavigation onBack={onBack} />
      </form>
    </Form>
  )
}

export default IdCardForm
