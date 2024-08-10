import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'

import { useDictionary } from '@/providers/dictionary-provider'
import { formatCurrency } from '@/utils/format-currency'

import { InferTypeFormSchema } from '../schema'

interface IConfirmPostAdModalProps {
  isOpen: boolean
  setValueOpen: (value: boolean) => void
  form: UseFormReturn<InferTypeFormSchema>
  onConfirm?: () => void
}
function ConfirmPostAdModal({ onConfirm, form, isOpen, setValueOpen }: IConfirmPostAdModalProps) {
  const { dictionary } = useDictionary()
  const {
    type,
    asset,
    fiat: currency,
    amount: price,
    totalAmount: available,
    minAmount,
    maxAmount,
    paymentMethods,
  } = form.getValues()
  const onClose = () => {
    setValueOpen(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setValueOpen}>
      <DialogContent>
        <DialogHeader>Confirm Post</DialogHeader>

        <div className="py-6">
          <ul className="space-y-5">
            {[
              { label: dictionary.Type, value: type },
              { label: dictionary.Asset, value: asset },
              { label: dictionary.Currency, value: currency },
              {
                label: dictionary.Price,
                value: formatCurrency({
                  value: price,
                  currency,
                }),
              },
              {
                label: dictionary.Available,
                value: formatCurrency({
                  value: available ?? 0,
                  currency: asset,
                }),
              },
              {
                label: dictionary.Limit,
                value: `$ ${formatCurrency({
                  value: minAmount ?? 0,
                })} - $ ${formatCurrency({
                  value: maxAmount ?? 0,
                })}`,
              },
              {
                label: dictionary['Total Trading Amount'],
                value: formatCurrency({
                  value: available ?? 0,
                  currency: asset,
                }),
              },
              { label: dictionary['Estimate Fee'], value: '8.61 USDT' },
              { label: dictionary['Payment Method'], value: paymentMethods },
            ].map((item) => (
              <li key={item.label} className="flex justify-between gap-2">
                <span className="text-text-primary">{item.label}</span>
                <div className="space-y-1 text-right">
                  {Array.isArray(item.value)
                    ? item.value.map((i) => <p key={i}>{i}</p>)
                    : item.value}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <Button variant="ghost" className="min-w-[12.5rem]" onClick={onClose}>
            {dictionary.Cancel}
          </Button>
          <Button className="min-w-[12.5rem]" onClick={onConfirm}>
            {dictionary.Confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default memo(ConfirmPostAdModal, isEqual)
