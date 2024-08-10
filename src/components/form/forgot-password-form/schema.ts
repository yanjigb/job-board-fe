import * as yup from 'yup'

import { LocaleKeys } from '@/types/locales'
import { generateRequireText } from '@/utils/generate-schema-text'

export interface IForgotPasswordForm {
  email: string
}

export const FORGOT_PASSWORD_FORM: IForgotPasswordForm = {
  email: '',
}

export const formSchema: (dictionary: LocaleKeys) => yup.Lazy<IForgotPasswordForm> = (dictionary) =>
  yup.lazy(() =>
    yup.object({
      email: yup
        .string()
        .email(generateRequireText(dictionary, dictionary.Email))
        .required(generateRequireText(dictionary, dictionary.Email)),
    }),
  )
