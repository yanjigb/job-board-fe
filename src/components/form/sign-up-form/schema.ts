import * as yup from 'yup'

import { LocaleKeys } from '@/types/locales'
import { generateRequireText } from '@/utils/generate-schema-text'

export interface ISignUpForm {
  username: string
  password: string
  confirmPassword: string
  email: string
}

export const DEFAULT_SIGN_UP_FORM: ISignUpForm = {
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
}

export const formSchema: (dictionary: LocaleKeys) => yup.Lazy<ISignUpForm> = (dictionary) =>
  yup.lazy(() =>
    yup.object({
      username: yup.string().required(generateRequireText(dictionary, dictionary.Username)),
      password: yup.string().required(generateRequireText(dictionary, dictionary.Password)),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], dictionary['Passwords must match'])
        .required(generateRequireText(dictionary, dictionary['Confirm Password'])),
      email: yup
        .string()
        .email(generateRequireText(dictionary, dictionary.Email))
        .required(generateRequireText(dictionary, dictionary.Email)),
    }),
  )
