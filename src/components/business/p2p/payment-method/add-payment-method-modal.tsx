import React, { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'lucide-react'
import { useBoolean } from 'usehooks-ts'

import { WarningNotification } from '@/components/common/app-notification'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useDictionary } from '@/providers/dictionary-provider'

import { InferTypePaymentMethodOtpFormSchema } from '../schema'

import PaymentMethodOtpModal from './payment-method-otp-modal'

interface Props {
  isOpen: boolean
  setValueOpen: (open: boolean) => void
  setClose: () => void
}
function AddPaymentMethodModal({
  isOpen: isOpenAddPaymentMethodModal,
  setValueOpen: setValueOpenAddPaymentMethodModal,
  setClose: setCloseAddPaymentMethodModal,
}: Props) {
  const { dictionary } = useDictionary()

  const form = useForm()

  const {
    value: isOpenPaymentMethodOtpModal,
    setValue: setValuePaymentMethodOtpModal,
    setTrue: setOpenPaymentMethodOtpModal,
    // setFalse: setClosePaymentMethodOtpModal,
  } = useBoolean(false)

  const onCompletedPaymentMethodOtpModal = useCallback(
    ({ otp }: InferTypePaymentMethodOtpFormSchema) => {
      setValuePaymentMethodOtpModal(false)
      setValueOpenAddPaymentMethodModal(false)

      const values = {
        ...form.getValues(),
        otp,
      }
      console.log('🚀 ~ values:', values)
    },
    [form, setValueOpenAddPaymentMethodModal, setValuePaymentMethodOtpModal],
  )

  React.useEffect(() => {
    return () => {
      form.reset()
    }
  }, [form, isOpenAddPaymentMethodModal])

  return (
    <>
      <Dialog open={isOpenAddPaymentMethodModal} onOpenChange={setValueOpenAddPaymentMethodModal}>
        <DialogContent>
          <DialogHeader>
            <Button
              variant="none"
              size="none"
              asChild
              onClick={setCloseAddPaymentMethodModal}
              className="cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <ChevronLeft />
                <span className="text-body/large/medium font-normal">
                  {dictionary['Set my payment method']}
                </span>
              </span>
            </Button>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <WarningNotification>
              {
                dictionary[
                  'Tips: The added payment method will be shown to the buyer during the transaction to accept fiat transfers. Please ensure that the information is correct, real, and matches your KYC information on Binance.'
                ]
              }
            </WarningNotification>

            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(setOpenPaymentMethodOtpModal)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bankCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Card/Account Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Please enter your bank card/account number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter the name of your  bank" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="openingBranch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account opening branch (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter bank branch information" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="text-text-primary">
                  <span className="font-semibold">{dictionary.Warning}</span>:
                  {
                    dictionary[
                      'Please make sure you add your bank card number for instant payments. Do not include details of other banks or payment methods. You must add the payment details of the selected bank.'
                    ]
                  }
                </p>

                <DialogFooter>
                  <Button
                    className="min-w-[12.5rem]"
                    variant="ghost"
                    type="button"
                    onClick={setCloseAddPaymentMethodModal}
                  >
                    {dictionary.Cancel}
                  </Button>
                  <Button className="min-w-[12.5rem]">{dictionary.Confirm}</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentMethodOtpModal
        isOpen={isOpenPaymentMethodOtpModal}
        setValueOpen={setValuePaymentMethodOtpModal}
        onComplete={onCompletedPaymentMethodOtpModal}
      />
    </>
  )
}

export default memo(AddPaymentMethodModal, isEqual)
