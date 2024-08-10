import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useWatch } from 'react-hook-form'
import Image from 'next/image'

import { AppCombobox } from '@/components/common/app-combobox/app-combobox'
import AppInput, { AppInputNumber } from '@/components/common/app-input'
import { TextBreak } from '@/components/common/text'
import TooltipInfo from '@/components/common/tooltip-info'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useDictionary } from '@/providers/dictionary-provider'
import { useWalletStore } from '@/stores/use-wallet'
import { WithdrawType, WithdrawUserSendType } from '@/types/withdraw'
import { formatCurrency } from '@/utils/format-currency'

import { ButtonStepAmount } from '../p2p/trade-modal/ui'

import { IFormProps } from './schema'

const AmountListItem = memo(function AmountListItem({ form }: IFormProps) {
  const { amount, coin } = form.getValues()
  const { dictionary } = useDictionary()

  return (
    <li className="flex justify-between gap-3">
      <span className="text-text-primary">{dictionary.Amount}</span>
      <span className="max-w-[15rem] break-words text-right">
        {formatCurrency({
          value: amount,
          currency: coin.toUpperCase(),
        })}
      </span>
    </li>
  )
}, isEqual)
AmountListItem.displayName = 'AmountListItem'

const NetworkListItem = memo(function NetworkListItem({ form }: IFormProps) {
  const { network } = form.getValues()
  const { dictionary } = useDictionary()
  const networkOptions = useWalletStore((state) => state.networks)
  const networkSelected = networkOptions.find((item) => item.symbol === network)

  return (
    <li className="flex justify-between gap-3">
      <span className="text-text-primary">{dictionary.Network}</span>
      <span className="max-w-[15rem] break-words text-right">
        {networkSelected?.symbol} {networkSelected?.name}
      </span>
    </li>
  )
}, isEqual)
NetworkListItem.displayName = 'NetworkListItem'

const Coin = memo(function Coin({ form }: IFormProps) {
  const { coin } = useWatch({ control: form.control })
  return <span>{coin?.toUpperCase()}</span>
}, isEqual)
Coin.displayName = 'Coin'

const AmountOverview = memo(function AmountOverview({ form }: IFormProps) {
  const { amount, coin } = useWatch({ control: form.control })

  return (
    <span className="flex gap-1">
      <TextBreak>
        {formatCurrency({
          value: amount ?? 0,
          currency: coin?.toUpperCase(),
          options: {
            minimumFractionDigits: 2,
            maximumFractionDigits: 10,
          },
        })}
      </TextBreak>
    </span>
  )
}, isEqual)
AmountOverview.displayName = 'AmountOverview'

const DynamicListItem = memo(function DynamicListItem({ form }: IFormProps) {
  const { dictionary } = useDictionary()
  const { email, id, address, phonePrefix, phone } = form.getValues()

  return (
    <>
      {form.getValues('type') === WithdrawType.Address && (
        <li className="flex justify-between gap-3">
          <span className="text-text-primary">{dictionary.Address}</span>
          <span className="max-w-[15rem] break-words text-right">{address}</span>
        </li>
      )}

      {form.getValues('type') === WithdrawType.User && (
        <>
          {form.getValues('sendMode') === WithdrawUserSendType.Email && (
            <li className="flex justify-between gap-3">
              <span className="text-text-primary">{dictionary.Email}</span>
              <span className="max-w-[15rem] break-words text-right">{email}</span>
            </li>
          )}

          {form.getValues('sendMode') === WithdrawUserSendType.Phone && (
            <li className="flex justify-between gap-3">
              <span className="text-text-primary">{dictionary['Phone number']}</span>
              <span className="max-w-[15rem] break-words text-right">
                ({phonePrefix}) {phone}
              </span>
            </li>
          )}

          {form.getValues('sendMode') === WithdrawUserSendType.Id && (
            <li className="flex justify-between gap-3">
              <span className="text-text-primary">{dictionary['Xclusive ID']}</span>
              <span className="max-w-[15rem] break-words text-right">{id}</span>
            </li>
          )}
        </>
      )}
    </>
  )
}, isEqual)
DynamicListItem.displayName = 'DynamicListItem'

const AddressConfirmContent = memo(function AddressConfirmContent({ form }: IFormProps) {
  const { dictionary } = useDictionary()

  return (
    <div className="py-6">
      <ul className="space-y-5">
        <DynamicListItem form={form} />

        <NetworkListItem form={form} />

        <AmountListItem form={form} />

        <li>
          <ul>
            <li className="list-style">
              {dictionary['Ensure that the address is correct and on the same network.']}
            </li>
            <li className="list-style">{dictionary['Transactions cannot be cancel']}</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}, isEqual)
AddressConfirmContent.displayName = 'AddressConfirmContent'

const EmailConfirmContent = memo(function EmailConfirmContent({ form }: IFormProps) {
  const { dictionary } = useDictionary()

  return (
    <div className="py-6">
      <ul className="space-y-5">
        <DynamicListItem form={form} />

        <AmountListItem form={form} />

        <li>
          <ul>
            <li className="list-style">{dictionary['Ensure that the email is correct.']}</li>
            <li className="list-style">{dictionary['Transactions cannot be cancel']}</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}, isEqual)
EmailConfirmContent.displayName = 'EmailConfirmContent'

const PhoneConfirmContent = memo(function PhoneConfirmContent({ form }: IFormProps) {
  const { dictionary } = useDictionary()
  return (
    <div className="py-6">
      <ul className="space-y-5">
        <DynamicListItem form={form} />

        <AmountListItem form={form} />

        <li>
          <ul>
            <li className="list-style">{dictionary['Ensure that the phone is correct.']}</li>
            <li className="list-style">{dictionary['Transactions cannot be cancel']}</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}, isEqual)
PhoneConfirmContent.displayName = 'PhoneConfirmContent'

const IdConfirmContent = memo(function IdConfirmContent({ form }: IFormProps) {
  const { dictionary } = useDictionary()

  return (
    <div className="py-6">
      <ul className="space-y-5">
        <DynamicListItem form={form} />

        <AmountListItem form={form} />

        <li>
          <ul>
            <li className="list-style">{dictionary['Ensure that the Xclusive ID is correct.']}</li>
            <li className="list-style">{dictionary['Transactions cannot be cancel']}</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}, isEqual)
IdConfirmContent.displayName = 'IdConfirmContent'

const PendingContent = memo(function PendingContent({ form }: IFormProps) {
  const { network, amount, coin } = form.getValues()
  const { dictionary } = useDictionary()
  const networkOptions = useWalletStore((state) => state.networks)
  const networkSelected = networkOptions.find((item) => item.symbol === network)

  return (
    <div className="py-6">
      <ul className="space-y-5">
        <li className="pb-6">
          <div className="mb-[1.375rem] flex justify-center">
            <Image
              src="/svgs/alarm-bottom.svg"
              width={75}
              height={100}
              alt="alarm"
              className="block min-h-[6.25rem]"
            />
          </div>

          <ul className="text-center">
            <li className="text-body/large/medium font-normal">
              {dictionary['Payment processing']}
            </li>
            <li className="mb-1 mt-4 text-heading-5 text-success">
              {formatCurrency({
                value: amount,
                currency: coin.toUpperCase(),
              })}
            </li>
            <li className="text-text-primary">
              {dictionary['Please wait 5s. Your payment is being processed']}
            </li>
          </ul>
        </li>

        <DynamicListItem form={form} />

        <li className="flex justify-between gap-3">
          <span className="text-text-primary">{dictionary['Send to']}</span>
          <span className="max-w-[15rem] break-words text-right">
            {networkSelected?.symbol} {networkSelected?.name}
          </span>
        </li>

        <li className="flex justify-between gap-3">
          <span className="text-text-primary">{dictionary['Send form']}</span>
          <span className="max-w-[15rem] break-words text-right">{dictionary['My Wallet']}</span>
        </li>
      </ul>
    </div>
  )
}, isEqual)
PendingContent.displayName = 'PendingContent'

const CompletedContent = memo(function CompletedContent({ form }: IFormProps) {
  const { amount, coin } = form.getValues()
  const { dictionary } = useDictionary()

  return (
    <div className="py-6">
      <ul className="space-y-5">
        <li className="pb-6">
          <div className="mb-[1.375rem] flex justify-center">
            <Image
              src="/images/post-ad/post-ad-success.svg"
              width={60}
              height={60}
              alt="payment-success"
            />
          </div>

          <ul className="text-center">
            <li className="text-body/large/medium font-normal">{dictionary['Recipient Amount']}</li>
            <li className="mb-1 mt-4 text-heading-5 text-success">
              {formatCurrency({
                value: amount,
                currency: coin.toUpperCase(),
              })}
            </li>

            <li className="text-text-primary">
              {
                dictionary[
                  'You will receive and email once the withdrawal transaction is completed'
                ]
              }
            </li>
          </ul>
        </li>

        <DynamicListItem form={form} />

        <NetworkListItem form={form} />

        <AmountListItem form={form} />
      </ul>
    </div>
  )
}, isEqual)
CompletedContent.displayName = 'CompletedContent'

const ConfirmContent = memo(function ConfirmContent({ form }: IFormProps) {
  return (
    <>
      {form.getValues('type') === WithdrawType.Address && <AddressConfirmContent form={form} />}

      {form.getValues('type') === WithdrawType.User && (
        <>
          {form.getValues('sendMode') === WithdrawUserSendType.Email && (
            <EmailConfirmContent form={form} />
          )}

          {form.getValues('sendMode') === WithdrawUserSendType.Phone && (
            <PhoneConfirmContent form={form} />
          )}

          {form.getValues('sendMode') === WithdrawUserSendType.Id && (
            <IdConfirmContent form={form} />
          )}
        </>
      )}
    </>
  )
}, isEqual)
ConfirmContent.displayName = 'ConfirmContent'

const AmountField = memo(function AmountField({ form }: IFormProps) {
  const { dictionary } = useDictionary()
  return (
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="justify-between">
            <span className="flex items-center gap-1">
              {dictionary['Withdraw Amount']}{' '}
              <TooltipInfo
                size={16}
                content={
                  dictionary['When withdrawing, a fee will be deducted from the amount withdrawn']
                }
              />
            </span>
            <ButtonStepAmount />
          </FormLabel>
          <FormControl>
            <AppInputNumber
              {...field}
              placeholder={dictionary['Enter amount']}
              inputSuffix={<Coin form={form} />}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}, isEqual)
AmountField.displayName = 'AmountField'

const AddressField = memo(function AddressField({ form }: IFormProps) {
  const { dictionary } = useDictionary()

  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{dictionary.Address}</FormLabel>
          <FormControl>
            <AppInput {...field} placeholder={dictionary['Enter your address']} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}, isEqual)
AddressField.displayName = 'AddressField'

const EmailField = memo(function EmailField({ form }: IFormProps) {
  const { dictionary } = useDictionary()
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field: emailField }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <AppInput {...emailField} type="email" placeholder={dictionary['Recipient’s email']} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}, isEqual)
EmailField.displayName = 'EmailField'

const PhoneField = memo(function PhoneField({ form }: IFormProps) {
  const { dictionary } = useDictionary()

  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field: phoneField }) => {
        const handleChangePhonePrefix = (value?: string) =>
          form.setValue('phonePrefix', value, {
            shouldValidate: true,
          })

        return (
          <FormItem>
            <FormLabel>{dictionary['Xclusive ID']}</FormLabel>
            <FormControl>
              <div className="flex gap-1">
                <AppCombobox
                  triggerClassName="w-auto pl-[0.9375rem] pr-[0.6875rem] gap-0 min-w-[5.9375rem]"
                  className="min-w-[12.5rem] p-0"
                  placeholder="Phone"
                  options={[
                    {
                      label: (
                        <span className="flex items-center gap-1">
                          <Image
                            src="/images/flag/vn.svg"
                            width={16}
                            height={16}
                            alt="vn"
                            className="block min-w-4"
                          />

                          <span>+84</span>
                        </span>
                      ),
                      value: '+84',
                    },
                  ]}
                  value={form.getValues('phonePrefix') as string}
                  onChange={handleChangePhonePrefix}
                  error={form.getFieldState('phonePrefix').error}
                />

                <AppInput placeholder="Recipient’s phone number" onChange={phoneField.onChange} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}, isEqual)
PhoneField.displayName = 'PhoneField'

const IdField = memo(function IdField({ form }: IFormProps) {
  const { dictionary } = useDictionary()

  return (
    <FormField
      control={form.control}
      name="id"
      render={({ field: emailField }) => (
        <FormItem>
          <FormLabel>{dictionary['Xclusive ID']}</FormLabel>
          <FormControl>
            <AppInput {...emailField} placeholder={dictionary['Recipient’s Xclusive ID']} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}, isEqual)
IdField.displayName = 'IdField'

const UserSendModeField = memo(function UserSendModeField({ form }: IFormProps) {
  const { dictionary } = useDictionary()
  return (
    <FormField
      control={form.control}
      name="sendMode"
      render={({ field, fieldState }) => (
        <>
          <FormItem>
            <FormLabel>{dictionary['Send mode']}</FormLabel>
            <AppCombobox
              triggerClassName="w-full"
              options={[
                { label: dictionary.Email, value: WithdrawUserSendType.Email },
                { label: dictionary.Phone, value: WithdrawUserSendType.Phone },
                { label: dictionary['Xclusive ID'], value: WithdrawUserSendType.Id },
              ]}
              value={field.value as string}
              onChange={field.onChange}
              placeholder={dictionary['Select send mode']}
              error={fieldState.error}
            />
            <FormMessage />
          </FormItem>
          {field.value === WithdrawUserSendType.Email && <EmailField form={form} />}
          {field.value === WithdrawUserSendType.Phone && <PhoneField form={form} />}
          {field.value === WithdrawUserSendType.Id && <IdField form={form} />}
        </>
      )}
    />
  )
}, isEqual)
UserSendModeField.displayName = 'UserSendModeField'

function OverviewItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <li className="flex justify-between gap-3">
      <span className="text-text-primary">{label}</span>
      <span className="text-right">{value}</span>
    </li>
  )
}

const WithdrawOverview = memo(function WithdrawOverview({ form }: IFormProps) {
  return (
    <ul className="space-y-2">
      <OverviewItem
        label="Available Withdraw"
        value={
          <span>
            {formatCurrency({
              value: 0,
              options: {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
              },
            })}
            &nbsp;
            <Coin form={form} />
          </span>
        }
      />
      <OverviewItem
        label="24h remaining limit"
        value={
          <span>
            <span>
              131.63089 <Coin form={form} />
            </span>
            <span className="text-text-primary">
              / 131.63089 <Coin form={form} />
            </span>
          </span>
        }
      />
    </ul>
  )
}, isEqual)
WithdrawOverview.displayName = 'WithdrawOverview'

const WithdrawSummary = memo(function WithdrawSummary({ form }: IFormProps) {
  const { dictionary } = useDictionary()

  return (
    <article className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
      <div className="space-y-1 text-body/small/regular font-light text-text-primary">
        <p>{dictionary.Amount}</p>
        <p className="text-heading-6 text-text-dark">
          <AmountOverview form={form} />
        </p>
        <p>
          {dictionary['Network Fee']} 0.00 <Coin form={form} />
        </p>
      </div>

      <Button className="min-w-[12.5rem]">{dictionary.Withdraw}</Button>
    </article>
  )
}, isEqual)
WithdrawSummary.displayName = 'WithdrawSummary'

const TypeField = memo(function TypeField({ form }: IFormProps) {
  const { dictionary } = useDictionary()
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <Tabs onValueChange={field.onChange} value={field.value as string}>
          <TabsList>
            <TabsTrigger value={WithdrawType.Address}>{dictionary.Address}</TabsTrigger>
            <TabsTrigger value={WithdrawType.User}>{dictionary['Xclusive user']}</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
    />
  )
}, isEqual)
TypeField.displayName = 'TypeField'

export {
  AddressConfirmContent,
  EmailConfirmContent,
  PhoneConfirmContent,
  IdConfirmContent,
  CompletedContent,
  PendingContent,
  ConfirmContent,
  Coin,
  AmountOverview,
  AddressField,
  UserSendModeField,
  TypeField,
  AmountField,
  WithdrawOverview,
  WithdrawSummary,
}
