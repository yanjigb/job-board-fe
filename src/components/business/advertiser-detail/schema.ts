import * as yup from 'yup'

import { ICustomFile } from '@/types/common'

export const BlockFormSchema = yup.object({
  reason: yup.string().required(),
  other: yup.string(),
})

export const ReportFormSchema = yup.object({
  reason: yup.string().required(),
  orderNumber: yup.string().required(),
  yourEmail: yup.string().required(),
  description: yup.string().required(),
  proof: yup.array<ICustomFile[]>().required(),
})

export type InferTypeBlockFormSchema = yup.InferType<typeof BlockFormSchema>
export type InferTypeReportFormSchema = yup.InferType<typeof ReportFormSchema>
