'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import QRCode from 'react-qr-code'
import { yupResolver } from '@hookform/resolvers/yup'
import { Copy } from 'lucide-react'

import { ComboboxTriggerMockup } from '@/components/common/app-combobox/components'
import { AssetSymbol } from '@/components/common/asset'
import { Card } from '@/components/ui/card'
import { Form, FormItem, FormLabel } from '@/components/ui/form'

import { useDictionary } from '@/providers/dictionary-provider'

import { FormDepositSchema } from './schema'
import { FormFieldSelectCoin, FormFieldSelectNetwork } from './ui'

function FormDeposit() {
  const { dictionary } = useDictionary()

  const form = useForm({
    resolver: yupResolver(FormDepositSchema),
    defaultValues: {
      coin: '' as AssetSymbol,
      network: '',
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    console.log('🚀 ~ onSubmit ~ values:', values)
  })

  return (
    <Card className="border-none bg-dark-2">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <FormFieldSelectCoin form={form} />

          <FormFieldSelectNetwork form={form} />

          {form.getValues('coin') && form.getValues('network') && (
            <>
              <div className="flex items-center gap-3">
                <div className="aspect-square max-w-[7.5rem] bg-white p-2">
                  <QRCode value="value" className="h-auto w-full" />
                </div>

                <FormItem className="w-full">
                  <FormLabel>{dictionary.Address}</FormLabel>
                  <ComboboxTriggerMockup
                    className="w-full"
                    hiddenChevron
                    customSuffix={
                      <Copy size={16} className="block size-4 min-w-4 text-secondary" />
                    }
                  >
                    0x98ac4f4f2a24822061c1b4300ff3aa9e970e7f17
                  </ComboboxTriggerMockup>
                </FormItem>
              </div>

              <ul className="space-y-2">
                {[
                  { label: dictionary['Minimum deposit'], value: '0.00000001 USDT' },
                  {
                    label: dictionary['Credited (Trading enabled)'],
                    value: dictionary['After 6 network confirmations'],
                  },
                  {
                    label: dictionary['Unlocked (Withdrawal enabled)'],
                    value: dictionary['After 64 network confirmations'],
                  },
                ].map((item) => (
                  <li key={item.label} className="flex justify-between gap-3">
                    <span className="text-text-primary">{item.label}</span>
                    <span className="text-right">{item.value}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </form>
      </Form>
    </Card>
  )
}

export default memo(FormDeposit, isEqual)
