import { UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'

import { WithdrawType, WithdrawUserSendType } from '@/types/withdraw'

export const FormWithdrawSchema = yup.object().shape({
  type: yup.string().required(),
  coin: yup.string().required(),
  network: yup.string().required(),
  amount: yup.number().typeError('Required').required(),
  address: yup.string().when('type', {
    is: WithdrawType.Address,
    then: (schema) => schema.required(),
  }),
  sendMode: yup.string().when('type', {
    is: WithdrawType.User,
    then: (schema) => schema.required(),
  }),
  email: yup.string().when('type', {
    is: WithdrawType.User,
    then: (schema) =>
      schema.when('sendMode', {
        is: WithdrawUserSendType.Email,
        then: (sendModeSchema) => sendModeSchema.required().email(),
      }),
  }),
  phonePrefix: yup.string().when('type', {
    is: WithdrawType.User,
    then: (schema) =>
      schema.when('sendMode', {
        is: WithdrawUserSendType.Phone,
        then: (sendModeSchema) => sendModeSchema.required(),
      }),
  }),
  phone: yup.string().when('type', {
    is: WithdrawType.User,
    then: (schema) =>
      schema.when('sendMode', {
        is: WithdrawUserSendType.Phone,
        then: (sendModeSchema) => sendModeSchema.required(),
      }),
  }),
  id: yup.string().when('type', {
    is: WithdrawType.User,
    then: (schema) =>
      schema.when('sendMode', {
        is: WithdrawUserSendType.Id,
        then: (sendModeSchema) => sendModeSchema.required(),
      }),
  }),
})

export type InferTypeFormWithdrawSchema = yup.InferType<typeof FormWithdrawSchema>

export interface IFormProps {
  form: UseFormReturn<InferTypeFormWithdrawSchema>
}
