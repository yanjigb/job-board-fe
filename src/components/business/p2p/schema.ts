import { UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'

export const FormSchema = yup.object({
  type: yup.string().required(),
  order: yup.string(),
  asset: yup.string().required(),
  fiat: yup.string().required(),
  period: yup.array().required(),
  payTypes: yup.array().required(),
})

export interface InferTypeFormSchema extends yup.InferType<typeof FormSchema> {}

export interface IFormProps {
  form: UseFormReturn<InferTypeFormSchema>
}

export const BuyFormSchema = yup.object({
  buyAmount: yup.string().required(),
  receive: yup.string(),
  paymentId: yup.string(),
})

export const SellFormSchema = yup.object({
  sellAmount: yup.string().required(),
  pay: yup.string(),
  paymentId: yup.string(),
})

export const CommonFormSchema = yup.object({
  paymentId: yup.string(),
})

export const PaymentMethodOtpFormSchema = yup.object({
  otp: yup.string().required(),
})

export type InferTypePaymentMethodOtpFormSchema = yup.InferType<typeof PaymentMethodOtpFormSchema>

export type InferTypeBuyFormSchema = yup.InferType<typeof BuyFormSchema>
export type InferTypeSellFormSchema = yup.InferType<typeof SellFormSchema>

export type P2pTradingModalFormType =
  | UseFormReturn<InferTypeBuyFormSchema>
  | UseFormReturn<InferTypeSellFormSchema>

export function isBuyTradeForm(
  form: P2pTradingModalFormType,
): form is UseFormReturn<InferTypeBuyFormSchema> {
  return 'buyAmount' in form.getValues()
}

export function isSellTradeForm(
  form: P2pTradingModalFormType,
): form is UseFormReturn<InferTypeSellFormSchema> {
  return 'sellAmount' in form.getValues()
}
