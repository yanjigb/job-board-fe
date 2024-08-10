import * as yup from 'yup'

export const SecurityVerificationFormSchema = yup.object({
  securityCode: yup.string().required(),
})

export const ComplainReleaseFormSchema = yup.object({
  reason: yup.string().required(),
})

export const ReceivedMoneyFormSchema = yup.object({
  accepted: yup.array().of(yup.string()).required(),
})

export type InferTypeSecurityVerificationFormSchema = yup.InferType<
  typeof SecurityVerificationFormSchema
>

export type InferTypeComplainReleaseFormSchema = yup.InferType<typeof ComplainReleaseFormSchema>

export type InferTypeReceivedMoneyFormSchema = yup.InferType<typeof ReceivedMoneyFormSchema>
