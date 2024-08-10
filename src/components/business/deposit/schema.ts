import * as yup from 'yup'

import { AssetSymbol } from '@/components/common/asset'

export const FormDepositSchema = yup.object().shape({
  coin: yup.string().oneOf(Object.values(AssetSymbol)).required(),
  network: yup.string().required(),
})

export type InferTypeFormDepositSchema = yup.InferType<typeof FormDepositSchema>
