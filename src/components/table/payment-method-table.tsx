import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { PenLine, Trash2 } from 'lucide-react'

import { BankName } from '../business/p2p-fiat-order-detail/ui'
import { Button } from '../ui/button'

const PaymentMethodItem = memo(function PaymentMethodItem({
  item,
}: {
  item: { label: string; value: string }
}) {
  return (
    <li key={item.label} className="space-y-1 pr-6">
      <p className="text-body/small/regular font-light text-text-primary">{item.label}</p>
      <p>{item.value}</p>
    </li>
  )
}, isEqual)
PaymentMethodItem.displayName = 'PaymentMethodItem'

const PaymentMethodTable = memo(function PaymentMethodTable() {
  return (
    <div className="rounded-xl border border-dark-3">
      <div className="flex justify-between gap-3 border-b border-dark-3 bg-dark-2 px-6 py-[0.6875rem]">
        <BankName>Bank Transfer</BankName>

        <div className="flex gap-2">
          <Button variant="none" size="none">
            <span aria-label="edit">
              <PenLine size={24} className="text-primary" />
            </span>
          </Button>

          <Button variant="none" size="none">
            <span aria-label="delete">
              <Trash2 size={24} className="text-error" />
            </span>
          </Button>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-y-6 p-6 pb-[1.4375rem]  sm:grid-cols-2 md:grid-cols-3">
        {[
          { label: 'Full Name', value: 'JOHN SMITH' },
          { label: 'Bank Card/Account Number', value: '39167487936894701' },
          { label: 'Bank name', value: 'Sterling Horizon Bank' },
        ].map((item) => (
          <PaymentMethodItem item={item} key={item.label} />
        ))}
      </ul>
    </div>
  )
}, isEqual)
PaymentMethodTable.displayName = 'PaymentMethodTable'

export { PaymentMethodTable }
