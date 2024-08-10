import * as yup from 'yup'

import { LocaleKeys } from '@/types/locales'

export interface IBuyForm {
  pay?: string
  receive?: string
}

export const DEFAULT_SIGN_IN_FORM: IBuyForm = {
  pay: '',
  receive: '',
}

export const formSchema: (dictionary: LocaleKeys) => yup.Lazy<IBuyForm> = () =>
  yup.lazy(() =>
    yup.object({
      pay: yup.string(),
      receive: yup.string(),
    }),
  )
