'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useDictionary } from '@/providers/dictionary-provider'
import { KycStep } from '@/types/kyc'

import BaseForm from './base-form'
import IdCardForm from './id-card-form'
import { FormBaseSchema, FormIdCardSchema, FormUtilityBillSchema } from './schema'
import { KycFail, KycPass, KycUnderReview } from './ui'
import UtilityBillForm from './utility-bill-form'

function DashboardKycPage() {
  const [step, setStep] = useState<KycStep | null>(null)

  const { dictionary } = useDictionary()

  const formIdCard = useForm({
    resolver: yupResolver(FormIdCardSchema(dictionary)),
    defaultValues: {},
  })

  const formUtilityBill = useForm({
    resolver: yupResolver(FormUtilityBillSchema(dictionary)),
    defaultValues: {},
  })

  const baseForm = useForm({
    resolver: yupResolver(FormBaseSchema()),
    defaultValues: {},
  })

  const onSubmitBaseForm = baseForm.handleSubmit((values) => {
    console.log('🚀 ~ onSubmitBaseForm ~ values:', values)
    setStep(values.documentType as unknown as KycStep)
  })

  const onSubmitUtilityBillForm = formUtilityBill.handleSubmit((values) => {
    console.log('🚀 ~ onSubmitBaseForm ~ values:', values)
    setStep(KycStep.Fail)
  })
  const onSubmitIdCardForm = formIdCard.handleSubmit((values) => {
    console.log('🚀 ~ onSubmitBaseForm ~ values:', values)
    setStep(KycStep.Pass)
  })

  const onBack = () => setStep(null)

  return (
    <>
      <h1 className="text-[1.875rem] font-bold leading-[2.375rem]">{dictionary.KYC}</h1>
      <p className="font-normal text-text-primary">{`Let's complete your verification process`}</p>

      {!step && <BaseForm form={baseForm} onSubmit={onSubmitBaseForm} />}

      {step === KycStep.IdCard && (
        <IdCardForm form={formIdCard} onBack={onBack} onSubmit={onSubmitIdCardForm} />
      )}

      {step === KycStep.UtilityBill && (
        <UtilityBillForm
          form={formUtilityBill}
          onBack={onBack}
          onSubmit={onSubmitUtilityBillForm}
        />
      )}

      {step === KycStep.UnderReview && <KycUnderReview />}

      {step === KycStep.Fail && <KycFail />}

      {step === KycStep.Pass && <KycPass />}
    </>
  )
}

export default DashboardKycPage
