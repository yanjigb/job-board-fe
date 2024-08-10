import * as yup from 'yup'

import { LocaleKeys } from '@/types/locales'

export const FormUpdateProfileSchema = yup.object({
  displayName: yup.string().required(),
  username: yup.string().required(),
})

export const FormUpdatePasswordSchema = (dictionary: LocaleKeys) =>
  yup.object().shape({
    newPassword: yup.string().required(),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], dictionary['Passwords must match'])
      .required(),
  })
