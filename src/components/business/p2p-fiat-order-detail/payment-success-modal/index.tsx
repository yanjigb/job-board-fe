import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import Link from 'next/link'

import AppIcon from '@/components/common/app-icon'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import { useDictionary } from '@/providers/dictionary-provider'
import { formatCurrency } from '@/utils/format-currency'

interface Props {
  isOpen: boolean
  setValue: (value: boolean) => void
  setClose: () => void
}
function PaymentSuccessModal({ isOpen, setValue, setClose }: Props) {
  const { dictionary } = useDictionary()
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setValue}>
        <DialogContent className="max-w-[calc(28.0625rem+1.5rem)] [&_.content]:p-0">
          <div className="flex-col-center p-[3.125rem]">
            <AppIcon
              src="/svgs/payment-success.svg#id"
              width="61"
              height="60"
              viewBox="0 0 61 60"
              className="w-[3.75rem]"
            />

            <h2 className="mt-[1.375rem] text-body/large/medium font-normal">
              {dictionary['Successful transaction']}
            </h2>
            <p className="mt-4 text-text-primary">{dictionary['You will receive']}</p>
            <p className="mt-1 text-heading-5 font-semibold text-success">
              {formatCurrency({
                value: 10023,
                currency: 'USDT',
              })}
            </p>

            <div className="mt-[2.1875rem] flex w-full gap-[1.125rem]">
              <Button className="w-full" variant="ghost" onClick={setClose}>
                {dictionary.OK}
              </Button>
              <Button className="w-full" asChild>
                <Link href="##">{dictionary.MyWallet}</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default memo(PaymentSuccessModal, isEqual)
