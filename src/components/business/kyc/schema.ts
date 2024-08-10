import * as yup from 'yup'

import { KycStep } from '@/types/kyc'
import { LocaleKeys } from '@/types/locales'

export const FormIdCardSchema = (dictionary: LocaleKeys) =>
  yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    dob: yup.string().required(),
    front: yup
      .object({
        id: yup.string().required(),
        file: yup.mixed(),
        fileUrl: yup.string(),
        errorMessage: yup.string(),
      })
      .test('is-file-selected', dictionary['Please select image'], (value) =>
        Boolean(value && value.id),
      )
      .nullable()
      .required(dictionary['Please select image']),
    back: yup
      .object({
        id: yup.string().required(),
        file: yup.mixed(),
        fileUrl: yup.string(),
        errorMessage: yup.string(),
      })
      .test('is-file-selected', dictionary['Please select image'], (value) =>
        Boolean(value && value.id),
      )
      .nullable()
      .required(dictionary['Please select image']),
  })

export const FormUtilityBillSchema = (dictionary: LocaleKeys) =>
  yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    dob: yup.string().required(),
    documentType: yup.string().required(),
    front: yup
      .object({
        id: yup.string().required(),
        file: yup.mixed(),
        fileUrl: yup.string(),
        errorMessage: yup.string(),
      })
      .test('is-file-selected', dictionary['Please select image'], (value) =>
        Boolean(value && value.id),
      )
      .nullable()
      .required(dictionary['Please select image']),
  })

export const FormBaseSchema = () =>
  yup.object({
    nation: yup.string().required(),
    address: yup.string().required(),
    documentType: yup
      .string()
      .oneOf([String(KycStep.IdCard), String(KycStep.UtilityBill)])
      .required(),
  })

export type InferTypeFormBaseSchema = yup.InferType<ReturnType<typeof FormBaseSchema>>

export type InferTypeFormUtilityBillSchema = yup.InferType<ReturnType<typeof FormUtilityBillSchema>>

export type InferTypeFormIdCardSchema = yup.InferType<ReturnType<typeof FormIdCardSchema>>
