import React, { memo, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Form, FormField } from '@/components/ui/form'
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp'

import { OTP_LENGTH } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'

import { InferTypePaymentMethodOtpFormSchema } from '../schema'

interface Props {
  isOpen: boolean
  setValueOpen: (open: boolean) => void
  onComplete: (value: InferTypePaymentMethodOtpFormSchema) => void
}
function PaymentMethodOtpModal({ isOpen, setValueOpen, onComplete }: Props) {
  const { dictionary } = useDictionary()
  const form = useForm({
    defaultValues: {
      otp: '',
    },
  })

  useEffect(() => {
    return () => {
      form.reset()
    }
  }, [form, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setValueOpen}>
      <DialogContent>
        <DialogHeader>{dictionary['Set my payment method']}</DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onComplete)}>
            <div className="space-y-8 py-6">
              <div>
                <h3 className="text-heading-4 font-bold">{dictionary['Enter OTP code']}</h3>
                <p className="mt-1 text-text-primary">
                  {dictionary['Enter the 6-digit verification code sent to %email%.'].replace(
                    '%email%',
                    'hon***@gmail.com',
                  )}
                </p>
              </div>

              <div className="w-full overflow-hidden">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <InputOTP
                      {...field}
                      maxLength={OTP_LENGTH}
                      onComplete={form.handleSubmit(onComplete)}
                    >
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTP>
                  )}
                />
              </div>

              <Button variant="none" size="none">
                <span className="font-light text-secondary">{dictionary['Resend code']}</span>
              </Button>
            </div>

            <DialogFooter>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <Button className="w-full" disabled={+field.value.length !== OTP_LENGTH}>
                    {dictionary.Submit}
                  </Button>
                )}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(PaymentMethodOtpModal, isEqual)
