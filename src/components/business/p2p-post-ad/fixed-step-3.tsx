/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useCallback } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Globe } from 'lucide-react'
import { useBoolean } from 'usehooks-ts'

import { AppCombobox } from '@/components/common/app-combobox/app-combobox'
import { WarningNotification } from '@/components/common/app-notification'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'

import { ALL_VALUE } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'

import ConfirmPostAdModal from './modal/confirm-post-ad-modal'
import SuccessPostAdModal from './modal/success-post-ad-modal'
import { InferTypeFormSchema } from './schema'

interface IFixedStep3Props {
  form: UseFormReturn<InferTypeFormSchema>
}
function FixedStep3({ form }: IFixedStep3Props) {
  const { dictionary } = useDictionary()

  const {
    value: isOpenConfirmModal,
    setTrue: setOpenConfirmModal,
    setValue: setValueConfirmModal,
    setFalse: setCloseConfirmModal,
  } = useBoolean(false)

  const {
    value: isOpenSuccessModal,
    setTrue: setOpenSuccessModal,
    setValue: setValueSuccessModal,
  } = useBoolean(false)

  const onConfirmOfConfirmModal = useCallback(() => {
    setCloseConfirmModal()
    setOpenSuccessModal()
  }, [setCloseConfirmModal, setOpenSuccessModal])

  const onPrevious = useCallback(() => {
    form.setValue('step', 2)
  }, [form])

  return (
    <>
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit((values) => {
            console.log(values)
            setOpenConfirmModal()
          })}
        >
          <WarningNotification>
            <span className="block">
              {
                dictionary[
                  `Please ensure that you comply with P2P rules to avoid account suspension or expulsion from the Binance Merchant Program. Especially`
                ]
              }
              :
            </span>
            <span className="block">
              {
                dictionary[
                  `1. If you require taker's document for verification, it's necessary to indicate the requirement in the 'Remarks' section of your advertisement.`
                ]
              }
            </span>
            <span className="block">
              {dictionary['2. Imposing extra fees on takers is not allowed in all scenarios.']}
            </span>
          </WarningNotification>

          <FormField
            control={form.control}
            name="remark"
            render={({ field }) => (
              <FormItem className="space-y-[0.625rem]">
                <FormLabel>{dictionary['Remarks (Optional)']}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-[5.875rem]"
                    placeholder={
                      dictionary[
                        'Please do not include any crypto-related words, such as crypto, P2P, C2C, BTC, USDT, ETH etc'
                      ]
                    }
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {field.value?.length ?? 0}/1000
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="autoReply"
            render={({ field }) => (
              <FormItem className="space-y-[0.625rem]">
                <FormLabel>{dictionary['Auto Reply (Optional)']}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-[5.875rem]"
                    placeholder={
                      dictionary[
                        'Auto reply message will be send to the counterparty once the order is create'
                      ]
                    }
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {field.value?.length ?? 0}/1000
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="region"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-[0.625rem]">
                <FormLabel>{dictionary['Select Region(s) Availability']}</FormLabel>
                <AppCombobox
                  triggerClassName="w-full"
                  options={[
                    { label: dictionary['All Regions'], value: ALL_VALUE },
                    { label: 'Region 1', value: 'region1' },
                    { label: 'Region 2', value: 'region2' },
                  ]}
                  iconPrefix={Globe}
                  placeholder={dictionary['Select region']}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  error={fieldState.error}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <h3>{dictionary['Counterparty Conditions']}:</h3>
            <div className="flex items-center gap-2">
              <Label>
                <Checkbox />
                {dictionary.Registered}
              </Label>

              <span className="grid min-w-[2.4375rem] max-w-[12.5rem] grid-cols-1 whitespace-nowrap rounded-lg border border-stroke px-3 py-[0.6875rem] pl-4">
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <span
                      className="max-w-[12.5rem] overflow-hidden shadow-none outline-none"
                      role="textbox"
                      contentEditable
                      onKeyDown={(event) => {
                        if (
                          event.key !== 'Backspace' &&
                          event.key !== 'Delete' &&
                          event.key !== 'ArrowLeft' &&
                          event.key !== 'ArrowRight' &&
                          !(event.ctrlKey && event.key === 'a') && // Allow Ctrl+A
                          Number.isNaN(Number(event.key))
                        ) {
                          event.preventDefault()
                        }

                        field.onChange(event)
                      }}
                    >
                      {field.value ?? 0}
                    </span>
                  )}
                />
              </span>

              <span>{dictionary['day(s) ago']}</span>
            </div>

            <div className="flex items-center gap-2">
              <Label>
                <Checkbox />
                {dictionary['Holdings more than']}
              </Label>

              <span className="grid min-w-[2.4375rem] max-w-[12.5rem] grid-cols-1 whitespace-nowrap rounded-lg border border-stroke px-3 py-[0.6875rem] pl-4">
                <FormField
                  control={form.control}
                  name="holding"
                  render={({ field }) => (
                    <span
                      className="max-w-[12.5rem] overflow-hidden shadow-none outline-none"
                      role="textbox"
                      contentEditable
                      onKeyDown={(event) => {
                        if (
                          event.key !== 'Backspace' &&
                          event.key !== 'Delete' &&
                          event.key !== 'ArrowLeft' &&
                          event.key !== 'ArrowRight' &&
                          !(event.ctrlKey && event.key === 'a') && // Allow Ctrl+A
                          event.key !== '.' && // Allow the period character
                          (event.key < '0' || event.key > '9') && // Allow numbers
                          Number.isNaN(Number(event.key))
                        ) {
                          event.preventDefault()
                        }

                        field.onChange(event)
                      }}
                    >
                      {field.value ?? 0.0}
                    </span>
                  )}
                />
              </span>

              <span>USDT</span>
            </div>
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                <div>
                  <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                    <span>{dictionary.Status}:</span>
                    <Label>
                      <FormControl>
                        <RadioGroupItem value="online-right-now" formValue={field.value} />
                      </FormControl>
                      {dictionary['Online right now']}
                    </Label>

                    <Label>
                      <FormControl>
                        <RadioGroupItem value="offline" formValue={field.value} />
                      </FormControl>
                      {dictionary['Offline, manually later']}
                    </Label>
                  </div>
                  <FormMessage />
                </div>
              </RadioGroup>
            )}
          />
          <div className="flex gap-2 pt-6">
            <Button type="button" variant="ghost" className="w-full" onClick={onPrevious}>
              {dictionary.Previous}
            </Button>
            <Button type="submit" className="w-full">
              {dictionary.Next}
            </Button>
          </div>
        </form>
      </Form>

      <ConfirmPostAdModal
        form={form}
        isOpen={isOpenConfirmModal}
        setValueOpen={setValueConfirmModal}
        onConfirm={onConfirmOfConfirmModal}
      />

      <SuccessPostAdModal
        form={form}
        isOpen={isOpenSuccessModal}
        setValueOpen={setValueSuccessModal}
      />
    </>
  )
}

export default FixedStep3
