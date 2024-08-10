import React, { memo, PropsWithChildren, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'

import { AppInputNumber } from '@/components/common/app-input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
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
import { Textarea } from '@/components/ui/textarea'

import { useDictionary } from '@/providers/dictionary-provider'

import DeleteAdModal from './delete-ad-modal'

function EditAdModal({ children }: PropsWithChildren) {
  const { dictionary } = useDictionary()

  const form = useForm()

  const onSubmit = useCallback(() => {}, [])
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[calc(41.625rem+1.5rem)]">
        <DialogHeader>{dictionary['Edit AD']}</DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5 py-6">
              <FormField
                control={form.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      <span>{dictionary['Total Amount']}</span>
                      <span className="text-body/small/regular font-light text-text-secondary">
                        ≈ 0 VND
                      </span>
                    </FormLabel>
                    <FormControl {...field}>
                      <AppInputNumber
                        {...field}
                        placeholder={dictionary['Please enter total amount']}
                        inputSuffix="USDT"
                      />
                    </FormControl>
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
            </div>
            <DialogFooter>
              <div className="flex w-full justify-between">
                <DeleteAdModal>
                  <Button variant="ghost">
                    <span className="text-error">{dictionary.Delete}</span>
                  </Button>
                </DeleteAdModal>

                <div>
                  <DialogClose>
                    <Button variant="ghost">{dictionary.Cancel}</Button>
                  </DialogClose>
                  <Button className="ml-2">{dictionary.Save}</Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(EditAdModal, isEqual)
