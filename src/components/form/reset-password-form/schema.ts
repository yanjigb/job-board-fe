import * as yup from 'yup'

import { LocaleKeys } from '@/types/locales'
import { generateRequireText } from '@/utils/generate-schema-text'

export interface IForgotPasswordForm {
  password: string
  confirmPassword: string
}

export const RESET_PASSWORD_FORM: IForgotPasswordForm = {
  password: '',
  confirmPassword: '',
}

export const formSchema: (dictionary: LocaleKeys) => yup.Lazy<IForgotPasswordForm> = (dictionary) =>
  yup.lazy(() =>
    yup.object({
      password: yup.string().required(generateRequireText(dictionary, dictionary.Password)),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], dictionary['Passwords must match'])
        .required(generateRequireText(dictionary, dictionary['Confirm Password'])),
    }),
  )
