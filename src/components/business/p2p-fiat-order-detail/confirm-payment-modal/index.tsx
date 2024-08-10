import React, { memo, PropsWithChildren, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CircleCheck, X } from 'lucide-react'
import { useBoolean } from 'usehooks-ts'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'

import { useDictionary } from '@/providers/dictionary-provider'

import PaymentSuccessModal from '../payment-success-modal'

function ConfirmPaymentModal({ children }: PropsWithChildren) {
  const { dictionary } = useDictionary()

  const FormSchema = yup.object({
    accept: yup.boolean().oneOf([true], '').required(''),
  })

  const form = useForm({
    resolver: yupResolver(FormSchema),
  })

  const {
    value: isOpenPaymentSuccessModal,
    setValue: setValuePaymentSuccessModal,
    setTrue: setIsOpenPaymentSuccessModal,
    setFalse: setIsClosePaymentSuccessModal,
  } = useBoolean(false)

  const onSubmit = useCallback(
    (values: yup.InferType<typeof FormSchema>) => {
      console.log('🚀 ~ ConfirmPaymentModal ~ values:', values)
      setIsOpenPaymentSuccessModal()
    },
    [setIsOpenPaymentSuccessModal],
  )

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>Confirm Payment</DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ul className="space-y-6 py-6">
                <li className="flex items-start gap-2">
                  <span>
                    <CircleCheck strokeWidth={1} className="text-success" />
                  </span>
                  <span>
                    {
                      dictionary[
                        'You must perform the transfer yourself, outside of P2P’s platform.'
                      ]
                    }
                  </span>
                </li>

                <li className="flex items-start gap-2">
                  <span>
                    <X strokeWidth={1} className="text-error" />
                  </span>
                  <span>
                    {
                      dictionary[
                        `Do not click the "Transferred" button without making the payment. Do not make third-party payments. Any violation may cause account suspension, or the platform`
                      ]
                    }
                  </span>
                </li>

                <li>
                  <FormField
                    control={form.control}
                    name="accept"
                    render={({ field }) => (
                      <Label htmlFor="accept">
                        <Checkbox
                          id="accept"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        {dictionary['I have read and understood the above information.']}
                      </Label>
                    )}
                  />
                </li>
              </ul>
              <FormMessage />

              <DialogFooter>
                <DialogClose asChild>
                  <Button className="min-w-[12.5rem]" type="button" variant="ghost">
                    {dictionary.Cancel}
                  </Button>
                </DialogClose>
                <Button
                  className="min-w-[12.5rem]"
                  type="submit"
                  disabled={!form.getValues('accept')}
                >
                  {dictionary.Confirm}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <PaymentSuccessModal
        isOpen={isOpenPaymentSuccessModal}
        setValue={setValuePaymentSuccessModal}
        setClose={setIsClosePaymentSuccessModal}
      />
    </div>
  )
}

export default memo(ConfirmPaymentModal, isEqual)
