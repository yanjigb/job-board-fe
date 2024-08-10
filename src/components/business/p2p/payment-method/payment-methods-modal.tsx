import React, { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { ChevronLeft, Plus } from 'lucide-react'
import { useBoolean } from 'usehooks-ts'

import AppTextEllipsis from '@/components/common/app-text-ellipsis'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { useDictionary } from '@/providers/dictionary-provider'
import { cn } from '@/utils/cn'

import { isBuyTradeForm, P2pTradingModalFormType } from '../schema'

import AddPaymentMethodModal from './add-payment-method-modal'

interface IPaymentMethod {
  id: string
  name: string
}
const PaymentMethod = memo(function PaymentMethod({
  onClick,
  item,
}: {
  onClick: (id: string) => void
  item: IPaymentMethod
}) {
  const handleClick = useCallback(() => {
    onClick(item.id)
  }, [item.id, onClick])

  return (
    <Button onClick={handleClick} variant="none" size="none" className="w-full" asChild>
      <li className="cursor-pointer rounded-md border border-stroke">
        <span className="inline-flex w-full items-center justify-between gap-2 border-l-4 border-blueLight px-4 py-3 hover:bg-dark-3">
          <AppTextEllipsis>{item.name}</AppTextEllipsis>
          <Plus size={16} className="block min-w-4" />
        </span>
      </li>
    </Button>
  )
}, isEqual)
PaymentMethod.displayName = 'PaymentMethod'

interface IPaymentMethodsModalProps {
  form: P2pTradingModalFormType
  isOpen: boolean
  setValueOpen: (open: boolean) => void
  setClose: () => void
}
function PaymentMethodsModal({
  form,
  isOpen: isOpenPaymentMethodsModal,
  setValueOpen: setValueOpenPaymentMethodsModal,
  setClose: setClosePaymentMethodsModal,
}: IPaymentMethodsModalProps) {
  const { dictionary } = useDictionary()
  // const [, setPaymentMethodId] = useQueryState('payment-method-id')

  const {
    value: isOpenAddPaymentModal,
    setValue: setValueAddPaymentModal,
    setFalse: setCloseAddPaymentModal,
    setTrue: setOpenAddPaymentModal,
  } = useBoolean(false)

  const onOpenAddPaymentMethod = useCallback(() => {
    setOpenAddPaymentModal()
  }, [setOpenAddPaymentModal])

  const onCloseAddPaymentMethod = useCallback(() => {
    setCloseAddPaymentModal()
    setValueOpenPaymentMethodsModal(true)
  }, [setCloseAddPaymentModal, setValueOpenPaymentMethodsModal])

  const onSetValueOpenAddPaymentModal = useCallback(
    (value: boolean) => {
      setValueAddPaymentModal(value)

      if (!value) {
        setValueOpenPaymentMethodsModal(true)
      }
    },
    [setValueAddPaymentModal, setValueOpenPaymentMethodsModal],
  )

  return (
    <>
      <Dialog open={isOpenPaymentMethodsModal} onOpenChange={setValueOpenPaymentMethodsModal}>
        <DialogContent>
          <DialogHeader>
            <Button
              variant="none"
              size="none"
              asChild
              onClick={setClosePaymentMethodsModal}
              className="cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <ChevronLeft />
                <span className="text-body/large/medium font-normal">
                  {dictionary['Payment Methods']}
                </span>
              </span>
            </Button>
          </DialogHeader>

          <div className="space-y-4 py-6">
            <h3 className="text-text-primary">{dictionary['Select payment method']}</h3>

            {isBuyTradeForm(form) ? (
              <Form {...form}>
                <form>
                  <FormField
                    control={form.control}
                    name="paymentId"
                    render={({ field }) => (
                      <RadioGroup
                        className="gap-4"
                        asChild
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <ul>
                          {[{ label: 'Bank Transfer', value: 'Bank Transfer' }].map((item) => {
                            const isChecked = field.value === item.value
                            return (
                              <li key={item.value}>
                                <FormLabel
                                  className={cn(
                                    'flex cursor-pointer flex-col items-start gap-6 space-y-0 rounded-lg border-[0.5px] border-secondary p-3 font-light sm:flex-row',
                                    isChecked ? 'border-secondary' : 'border-stroke',
                                  )}
                                  htmlFor={item.value}
                                >
                                  <div className="flex min-w-[12.5rem] items-center gap-2">
                                    <FormControl>
                                      <RadioGroupItem
                                        value={item.value}
                                        id={item.value}
                                        formValue={field.value}
                                      />
                                    </FormControl>
                                    <span className={cn(isChecked && 'text-secondary')}>
                                      {item.label}
                                    </span>
                                  </div>

                                  <ul className="space-y-2">
                                    <li>JOHN SMITH</li>
                                    <li>1219734189748123</li>
                                    <li>VISA</li>
                                  </ul>
                                </FormLabel>
                              </li>
                            )
                          })}
                        </ul>
                      </RadioGroup>
                    )}
                  />
                </form>
              </Form>
            ) : (
              <Form {...form}>
                <form>
                  <FormField
                    control={form.control}
                    name="paymentId"
                    render={({ field }) => (
                      <RadioGroup
                        className="gap-4"
                        asChild
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <ul>
                          {[{ label: 'Bank Transfer', value: '1' }].map((item) => {
                            const isChecked = field.value === item.value
                            return (
                              <li key={item.value}>
                                <FormLabel
                                  className={cn(
                                    'flex cursor-pointer flex-col items-start gap-6 space-y-0 rounded-lg border-[0.5px] border-secondary p-3 font-light sm:flex-row',
                                    isChecked ? 'border-secondary' : 'border-stroke',
                                  )}
                                  htmlFor={item.value}
                                >
                                  <div className="flex min-w-[12.5rem] items-center gap-2">
                                    <FormControl>
                                      <RadioGroupItem
                                        value={item.value}
                                        id={item.value}
                                        formValue={field.value}
                                      />
                                    </FormControl>
                                    <span className={cn(isChecked && 'text-secondary')}>
                                      {item.label}
                                    </span>
                                  </div>

                                  <ul className="space-y-2">
                                    <li>JOHN SMITH</li>
                                    <li>1219734189748123</li>
                                    <li>VISA</li>
                                  </ul>
                                </FormLabel>
                              </li>
                            )
                          })}
                        </ul>
                      </RadioGroup>
                    )}
                  />
                </form>
              </Form>
            )}

            <h3 className="text-text-primary">{dictionary['Add supported payment methods']}</h3>

            <ul className="space-y-4">
              {[
                { id: '1', name: 'Bank of America' },
                { id: '2', name: 'Bank Transfer' },
              ].map((item) => (
                <PaymentMethod key={item.id} onClick={onOpenAddPaymentMethod} item={item} />
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>

      <AddPaymentMethodModal
        isOpen={isOpenAddPaymentModal}
        setValueOpen={onSetValueOpenAddPaymentModal}
        setClose={onCloseAddPaymentMethod}
      />
    </>
  )
}

export default memo(PaymentMethodsModal, isEqual)
