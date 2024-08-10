import React, { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { UseFormReturn } from 'react-hook-form'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'

import { useDictionary } from '@/providers/dictionary-provider'
import { formatCurrency } from '@/utils/format-currency'

import { InferTypeFormSchema } from '../schema'

interface Props {
  form: UseFormReturn<InferTypeFormSchema>
  isOpen: boolean
  setValueOpen: (value: boolean) => void
}

function SuccessPostAdModal({ form, isOpen, setValueOpen }: Props) {
  const { dictionary } = useDictionary()
  const {
    amount: price,
    totalAmount: available,
    minAmount,
    maxAmount,
    asset,
    fiat,
  } = form.getValues()

  const onClose = useCallback(() => {
    setValueOpen(false)
    form.reset()
  }, [form, setValueOpen])

  const onSetValueOpen = React.useCallback(
    (open: boolean) => {
      setValueOpen(open)

      if (!open) {
        form.reset()
      }
    },
    [form, setValueOpen],
  )

  return (
    <Dialog open={isOpen} onOpenChange={onSetValueOpen}>
      <DialogContent showCloseButton={false}>
        <div className="space-y-5 py-6">
          <div className="flex flex-col items-center pb-6">
            <Image
              src="/images/post-ad/post-ad-success.svg"
              width={60}
              height={60}
              alt="post-ad-success"
              className="mb-[1.375rem]"
            />

            <p className="mb-4 text-body/large/medium font-normal">
              {dictionary.Buy} USDT {dictionary.With} USD
            </p>

            <h2 className="mb-1 text-heading-5 text-success">
              {dictionary['Successfully Posted']}
            </h2>

            <p className="text-center text-text-primary">
              {
                dictionary[
                  'Your ad has been published and is now visible to other users once it goes online. Please pay attention to prompts for new orders.'
                ]
              }
            </p>
          </div>

          <ul className="space-y-5">
            <li className="flex justify-between">
              <span className="text-text-primary">{dictionary.Price}</span>
              <span>
                {formatCurrency({
                  value: price,
                  currency: fiat,
                })}
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-text-primary">{dictionary.Available}</span>
              <span>
                {formatCurrency({
                  value: available ?? 0,
                  currency: asset,
                })}
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-text-primary">{dictionary.Limit}</span>
              <span>
                {formatCurrency({
                  value: minAmount ?? 0,
                  currency: asset,
                })}{' '}
                -{' '}
                {formatCurrency({
                  value: maxAmount ?? 0,
                  currency: asset,
                })}
              </span>
            </li>
          </ul>
        </div>

        <DialogFooter>
          <Button className="w-full" onClick={onClose}>
            {dictionary.OK}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default memo(SuccessPostAdModal, isEqual)
