'use client'

import React, { memo, PropsWithChildren } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'

import { WarningNotification } from '@/components/common/app-notification'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'

import { useDictionary } from '@/providers/dictionary-provider'

import { InferTypeBlockFormSchema } from '../schema'

const OTHER_VALUE = 'other'

function ModalBlockUser({ children }: PropsWithChildren) {
  const { dictionary } = useDictionary()

  const form = useForm({
    defaultValues: {
      reason: '',
      other: '',
    },
  })

  const onSubmit = (values: InferTypeBlockFormSchema) => {
    console.log(values)
  }

  const reason = form.watch('reason')

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>{dictionary['Select Reason']}</DialogHeader>

        <div className="space-y-5 py-6">
          <WarningNotification>
            {dictionary['You will not be able to trade with the user after blocking']}
          </WarningNotification>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <FormField
                  name="reason"
                  control={form.control}
                  render={({ field }) => (
                    <RadioGroup
                      asChild
                      className="gap-5"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <ul>
                        {[
                          { label: dictionary.Harassment, value: '1' },
                          { label: dictionary['Bad credibility'], value: '2' },
                          { label: dictionary['Malicious feedback'], value: '3' },
                          { label: dictionary['Scam suspicion'], value: '4' },
                          { label: dictionary.Other, value: OTHER_VALUE },
                        ].map((item) => (
                          <FormLabel
                            key={item.label}
                            className="flex items-center gap-2"
                            htmlFor={item.value}
                          >
                            <FormControl>
                              <RadioGroupItem
                                id={item.value}
                                value={item.value}
                                formValue={field.value}
                              />
                            </FormControl>

                            <span className="font-normal">{item.label}</span>
                          </FormLabel>
                        ))}
                      </ul>
                    </RadioGroup>
                  )}
                />

                <FormField
                  control={form.control}
                  name="other"
                  disabled={reason !== OTHER_VALUE}
                  render={({ field: textAreaField }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          {...textAreaField}
                          placeholder={dictionary['Please provide as much details as possible']}
                          className="h-[188px]"
                        />
                      </FormControl>
                      <FormDescription className="!mt-[0.625rem] text-end">
                        {textAreaField.value.length}/50
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button className="min-w-[12.5rem]" variant="ghost" type="button">
                  {dictionary.Cancel}
                </Button>
                <Button
                  className="min-w-[12.5rem]"
                  disabled={!reason || (reason === OTHER_VALUE && !form.getValues('other'))}
                >
                  {dictionary.Block}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default memo(ModalBlockUser, isEqual)
