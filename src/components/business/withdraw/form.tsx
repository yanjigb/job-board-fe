'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useBoolean } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'

import { useDictionary } from '@/providers/dictionary-provider'
import { WithdrawType } from '@/types/withdraw'

import { FormFieldSelectCoin, FormFieldSelectNetwork } from '../deposit/ui'

import { FormWithdrawSchema } from './schema'
import {
  AddressField,
  AmountField,
  CompletedContent,
  ConfirmContent,
  PendingContent,
  TypeField,
  UserSendModeField,
  WithdrawOverview,
  WithdrawSummary,
} from './ui'

function FormWithdraw() {
  const { dictionary } = useDictionary()

  const {
    value: isOpenConfirmModal,
    setValue: setValueOpenConfirmModal,
    setTrue: setTrueConfirmModal,
  } = useBoolean(false)

  const {
    value: isOpenPendingModal,
    setValue: setValueOpenPendingModal,
    setTrue: setTruePendingModal,
  } = useBoolean(false)

  const {
    value: isOpenCompletedModal,
    setValue: setValueOpenCompletedModal,
    setTrue: setTrueCompletedModal,
    setFalse: setFalseCompletedModal,
  } = useBoolean(false)

  const form = useForm({
    resolver: yupResolver(FormWithdrawSchema),
    defaultValues: {
      type: WithdrawType.Address,
      coin: '',
      network: '',
      address: '',
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    console.log('🚀 ~ onSubmit ~ values:', values)
    setTrueConfirmModal()
  })

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="w-full space-y-6 rounded-xl bg-dark-2 p-6">
          <TypeField form={form} />

          <FormFieldSelectCoin form={form} />

          {form.getValues('type') === WithdrawType.Address ? (
            <AddressField form={form} />
          ) : (
            <UserSendModeField form={form} />
          )}

          <FormFieldSelectNetwork form={form} />

          <AmountField form={form} />

          <WithdrawOverview form={form} />

          <WithdrawSummary form={form} />
        </form>
      </Form>

      <Dialog open={isOpenConfirmModal} onOpenChange={setValueOpenConfirmModal}>
        <DialogContent className="max-w-[calc(30rem+1.5rem)]">
          <DialogHeader>{dictionary['Confirm withdraw']}</DialogHeader>
          <ConfirmContent form={form} />

          <DialogFooter>
            <Button className="w-full" onClick={setTruePendingModal}>
              {dictionary.Continue}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenPendingModal} onOpenChange={setValueOpenPendingModal}>
        <DialogContent className="max-w-[calc(30rem+1.5rem)]">
          <PendingContent form={form} />

          <DialogFooter>
            <Button className="w-full" onClick={setTrueCompletedModal}>
              {dictionary.OK}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenCompletedModal} onOpenChange={setValueOpenCompletedModal}>
        <DialogContent className="max-w-[calc(30rem+1.5rem)]">
          <CompletedContent form={form} />

          <DialogFooter>
            <Button className="w-full" onClick={setFalseCompletedModal}>
              {dictionary.OK}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default memo(FormWithdraw, isEqual)
