'use client'

import React, { memo, PropsWithChildren } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { AppCombobox } from '@/components/common/app-combobox/app-combobox'
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
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { UploadImages } from '@/components/business/p2p-fiat-order-detail/ui'
import { useDictionary } from '@/providers/dictionary-provider'

import { InferTypeReportFormSchema, ReportFormSchema } from '../schema'

import 'yet-another-react-lightbox/styles.css'

function ModalReportUser({ children }: PropsWithChildren) {
  const { dictionary } = useDictionary()

  const form = useForm({
    resolver: yupResolver(ReportFormSchema),
    defaultValues: {
      reason: '',
      orderNumber: '',
      yourEmail: '',
      description: '',
      proof: [],
    },
  })

  const onSubmit = (values: InferTypeReportFormSchema) => {
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>{dictionary.Report}</DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5 py-6">
              <WarningNotification>
                {dictionary['Malicious reports will cause an account freeze.']}
              </WarningNotification>

              <FormField
                control={form.control}
                name="reason"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{dictionary['Report Reason']}</FormLabel>
                    <AppCombobox
                      modal
                      hiddenSearch
                      error={fieldState.error}
                      value={field.value}
                      onChange={field.onChange}
                      triggerClassName="w-full"
                      placeholder={dictionary['Please select report reason']}
                      itemClassName="font-light"
                      options={[
                        {
                          label: dictionary['Trading order fraud or scam'],
                          value: 'Trading order fraud or scam',
                        },
                        {
                          label: dictionary['Advertisement conditions unreasonable'],
                          value: 'Advertisement conditions unreasonable',
                        },
                        {
                          label: dictionary['Abusive language'],
                          value: 'Abusive language',
                        },
                        {
                          label: dictionary['Using third-party payment'],
                          value: 'Using third-party payment',
                        },
                        {
                          label: dictionary['Chargeback scam'],
                          value: 'Chargeback scam',
                        },
                        {
                          label: dictionary['Frozen bank account'],
                          value: 'Frozen bank account',
                        },
                        {
                          label: dictionary['Malicious Ad price change'],
                          value: 'Malicious Ad price change',
                        },
                        {
                          label: dictionary['Other reasons'],
                          value: 'Other reasons',
                        },
                      ]}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="orderNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary['Order Number']}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={dictionary['Enter order number']} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yourEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary['Your Email']}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={dictionary['Enter your email']} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.Description}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={dictionary['Please provide as much details as possible']}
                        className="h-[9.625rem]"
                      />
                    </FormControl>
                    <FormDescription className="!mt-[0.625rem] text-right">
                      {field.value.length}/50
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <Label>{dictionary['Upload proof']}</Label>
                <p className="text-body/small/regular font-light text-text-primary">
                  {
                    dictionary[
                      'Screenshots or video/audio recordings of payment and communication data should not exceed a total of 5 files with total size of 50 MB. Supported file formats include jpg, jpeg, png, mp3, mp4, avi, rm, rmvb, mov, wmv.'
                    ]
                  }
                </p>

                <UploadImages />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" className="min-w-[12.5rem]" variant="ghost">
                {dictionary.Cancel}
              </Button>
              <Button className="min-w-[12.5rem]">{dictionary.Submit}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(ModalReportUser, isEqual)
