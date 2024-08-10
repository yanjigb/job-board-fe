import * as yup from 'yup'

import { LocaleKeys } from '@/types/locales'
import { generateRequireText } from '@/utils/generate-schema-text'

export interface ISignInForm {
  username: string
  password: string
}

export const DEFAULT_SIGN_IN_FORM: ISignInForm = {
  username: '',
  password: '',
}

export const formSchema: (dictionary: LocaleKeys) => yup.Lazy<ISignInForm> = (dictionary) =>
  yup.lazy(() =>
    yup.object({
      username: yup.string().required(generateRequireText(dictionary, dictionary.Username)),
      password: yup.string().required(generateRequireText(dictionary, dictionary.Password)),
    }),
  )
