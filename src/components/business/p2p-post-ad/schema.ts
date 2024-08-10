import * as yup from 'yup'

import { ExChangeTab } from '@/types/home'
import { LocaleKeys } from '@/types/locales'
import { PostAdPriceType } from '@/types/post-ad'
import { generateRequireText } from '@/utils/generate-schema-text'

export const FormPostAdFixed = (dictionary: LocaleKeys) =>
  yup.object({
    search: yup.string(),

    step: yup.number().required(),
    tab: yup.string().oneOf([ExChangeTab.Buy, ExChangeTab.Sell]).required(),
    asset: yup.string().required(),
    fiat: yup.string().required(),
    type: yup.string().oneOf([PostAdPriceType.Fixed, PostAdPriceType.Floating]).required(),
    amount: yup.number().typeError(dictionary['Number not valid']).required(),

    totalAmount: yup.number().when('step', {
      is: 2,
      then: (schema) =>
        schema
          .typeError(dictionary['Number not valid'])
          .required(generateRequireText(dictionary, dictionary['Total amount'])),
      otherwise: (schema) => schema.notRequired(),
    }),
    minAmount: yup.number().when('step', {
      is: 2,
      then: (schema) =>
        schema
          .typeError(dictionary['Number not valid'])
          .required(generateRequireText(dictionary, dictionary['Minimum amount'])),
      otherwise: (schema) => schema.notRequired(),
    }),
    maxAmount: yup.number().when('step', {
      is: 2,
      then: (schema) =>
        schema
          .typeError(dictionary['Number not valid'])
          .required(generateRequireText(dictionary, dictionary['Maximum amount'])),
      otherwise: (schema) => schema.notRequired(),
    }),
    paymentMethods: yup
      .array()
      .of(yup.string())
      .when('step', {
        is: 2,
        then: (schema) =>
          schema
            .min(1, generateRequireText(dictionary, dictionary['At least one payment method']))
            .required(generateRequireText(dictionary, dictionary['Payment methods are'])),
        otherwise: (schema) => schema.notRequired(),
      }),
    payTimeLimit: yup.string().when('step', {
      is: 2,
      then: (schema) =>
        schema.required(generateRequireText(dictionary, dictionary['Payment time limit'])),
      otherwise: (schema) => schema.notRequired(),
    }),

    remark: yup.string(),
    autoReply: yup.string(),
    region: yup.string().when('step', {
      is: 3,
      then: (schema) => schema.required(generateRequireText(dictionary, dictionary.Region)),
      otherwise: (schema) => schema.notRequired(),
    }),

    day: yup.string(),
    holding: yup.string(),
    status: yup.string(),
  })

export type InferTypeFormSchema = yup.InferType<ReturnType<typeof FormPostAdFixed>>
