import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Search } from 'lucide-react'

import AppInput from '@/components/common/app-input'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormField, FormLabel } from '@/components/ui/form'

import { BankName } from '@/components/business/p2p-fiat-order-detail/ui'
import { useDictionary } from '@/providers/dictionary-provider'

import { InferTypeFormSchema } from '../schema'

interface ISelectPaymentMethodModalProps {
  form: UseFormReturn<InferTypeFormSchema>
  children: React.ReactNode
}
function SelectPaymentMethodModal({ form, children }: ISelectPaymentMethodModalProps) {
  const { dictionary } = useDictionary()
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>{dictionary['Select payment method']}</DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4 py-6"
            onSubmit={form.handleSubmit((values) => {
              console.log(values)
            })}
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <AppInput
                  {...field}
                  classNameWrapper="px-4"
                  placeholder={dictionary['Enter a payment method']}
                  inputPrefix={<Search className="text-text-primary" size={16} />}
                />
              )}
            />

            <h3 className="text-text-primary">
              {dictionary['Select Payment Method (Up to 5 methods)']}
            </h3>

            <FormField
              control={form.control}
              name="paymentMethods"
              render={({ field: { value, onChange } }) => (
                <ul className="space-y-4">
                  {[
                    { label: 'ZainCash - Business', value: 'ZainCash - Business' },
                    { label: 'Banco Atlantida', value: 'Banco Atlantida' },
                    { label: 'Banco BHD', value: 'Banco BHD' },
                    { label: 'Global66', value: 'Global66' },
                    { label: 'Banco Santander Argentina', value: 'Banco Santander Argentina' },
                    { label: 'KHQR', value: 'KHQR' },
                    { label: 'Multibank Panama', value: 'Multibank Panama' },
                  ].map((item) => (
                    <li key={item.value}>
                      <FormLabel
                        key={item.value}
                        htmlFor={item.value}
                        className="w-full justify-between"
                      >
                        <BankName className="px-4 py-3 text-text-dark">{item.label}</BankName>
                        <Checkbox
                          defaultChecked={value && value.includes(item.value)}
                          id={item.value}
                          onCheckedChange={() => {
                            if (!value) return

                            const index = value.indexOf(item.value)
                            if (index === -1) {
                              onChange([...value, item.value])
                            } else {
                              onChange(value.filter((v) => v !== item.value))
                            }
                          }}
                        />
                      </FormLabel>
                    </li>
                  ))}
                </ul>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default SelectPaymentMethodModal
