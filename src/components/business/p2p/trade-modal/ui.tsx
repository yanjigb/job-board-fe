'use client'

import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Wallet } from 'lucide-react'
import Image from 'next/image'
import { useBoolean } from 'usehooks-ts'

import { AppAvatarOnline } from '@/components/common/app-avatar'
import { ComboboxTriggerMockup } from '@/components/common/app-combobox/components'
import { Asset, AssetSymbol } from '@/components/common/asset'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import InputNumber from '@/components/ui/input-number'

import { useDictionary } from '@/providers/dictionary-provider'
import { cn } from '@/utils/cn'
import { formatCurrency } from '@/utils/format-currency'

import { getAmountStep } from '../constants'
import PaymentMethodsModal from '../payment-method/payment-methods-modal'
import {
  BuyFormSchema,
  InferTypeBuyFormSchema,
  InferTypeSellFormSchema,
  P2pTradingModalFormType,
  SellFormSchema,
} from '../schema'
import { Stat, Stats } from '../stat-info'

const AdsInfo = memo(function AdsInfo() {
  const { dictionary } = useDictionary()
  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <AppAvatarOnline className="size-[2.625rem]" fallback="Jonathan Higgins" online />

        <div className="space-y-1">
          <p className="text-body/medium/semibold">Jonathan Higgins</p>
          <p>
            <Stats className="mb-3">
              <Stat
                value={formatCurrency({ value: 346 })}
                label={dictionary.Orders.toLowerCase()}
              />
              <Stat value="91.50%" label={dictionary.Completion.toLowerCase()} />
            </Stats>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-3 lg:grid-cols-3">
        {[
          { label: dictionary['Payment Time Limit'], value: '15 mins' },
          { label: dictionary['Avg. Release Time'], value: '4.71 Minutes' },
          { label: dictionary.Available, value: '245.67 USDT' },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-body/medium/medium font-normal">{item.value}</p>
            <p className="text-body/small/regular font-light text-text-primary">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 rounded-lg border-[0.0313rem] border-dark-3 bg-dark-2 p-3">
        <p className="text-body/medium/medium font-normal">{dictionary["Advertiser's Terms"]}</p>
        <p className="text-body/medium/regular font-light text-text-primary">
          {dictionary['This advertiser did not set any terms.']}
        </p>
      </div>
    </div>
  )
}, isEqual)
AdsInfo.displayName = 'AdsInfo'

const TradeInfo = memo(function TradeInfo() {
  const { dictionary } = useDictionary()
  return (
    <ul className="space-y-2 [&_li_span:first-child]:whitespace-nowrap">
      {[
        { label: dictionary.Price, value: '1.008 USD' },
        { label: dictionary.Available, value: '41,318.61 USDT' },
        { label: dictionary.Limit, value: '$ 2,500.00 - $ 20,000.00' },
      ].map((item) => (
        <li className="flex gap-x-6" key={item.label}>
          <span className="w-full max-w-[3.6875rem] text-body/regular text-text-primary">
            {item.label}
          </span>
          <span className="text-body/medium">{item.value}</span>
        </li>
      ))}
    </ul>
  )
}, isEqual)
TradeInfo.displayName = 'TradeInfo'

const PaymentMethod = memo(function PaymentMethod({ form }: { form: P2pTradingModalFormType }) {
  const { dictionary } = useDictionary()

  const {
    value: isOpenModalPaymentMethods,
    setValue: setValueModalPaymentMethods,
    setTrue: setOpenModalPaymentMethods,
    setFalse: setCloseModalPaymentMethods,
  } = useBoolean(false)

  const commonFields = form.getValues() as {
    paymentId: string
  }

  return (
    <div>
      <Button
        asChild
        variant="none"
        size="none"
        onClick={setOpenModalPaymentMethods}
        className="flex justify-between"
      >
        <ComboboxTriggerMockup
          iconPrefix={Wallet}
          className="w-full [&_.chevron]:-rotate-90 [&_.chevron]:opacity-100"
        >
          {commonFields.paymentId || dictionary['Select payment method']}
        </ComboboxTriggerMockup>
      </Button>

      <PaymentMethodsModal
        form={form}
        isOpen={isOpenModalPaymentMethods}
        setValueOpen={setValueModalPaymentMethods}
        setClose={setCloseModalPaymentMethods}
      />
    </div>
  )
}, isEqual)
PaymentMethod.displayName = 'PaymentMethod'

interface IButtonStepAmountProps {
  onClick?: (value: number) => void
  className?: string
}
const ButtonStepAmount = memo(function ButtonStepAmount({
  onClick,
  className,
}: IButtonStepAmountProps) {
  const { dictionary } = useDictionary()
  return (
    <ul className={cn('flex gap-3', className)}>
      {getAmountStep(dictionary).map((item) => {
        const handleClick = () => onClick && onClick(item.value)
        return (
          <Button
            key={item.label}
            asChild
            variant="none"
            size="none"
            onClick={handleClick}
            type="button"
          >
            <li className="item cursor-pointer text-body/small/regular font-light text-blueLight">
              {item.label}
            </li>
          </Button>
        )
      })}
    </ul>
  )
}, isEqual)
ButtonStepAmount.displayName = 'ButtonStepAmount'

const BuyForm = memo(function BuyForm() {
  const { dictionary } = useDictionary()

  const form = useForm<InferTypeBuyFormSchema>({
    defaultValues: {
      buyAmount: '',
      receive: '',
      paymentId: '',
    },
    resolver: yupResolver(BuyFormSchema),
  })

  return (
    <Form {...form}>
      <PaymentMethod form={form} />

      <div className="space-y-3 rounded-[9px] border border-solid border-stroke px-5 py-[1.1875rem]">
        <div className="flex justify-between gap-2">
          <p className="text-body/small/regular font-light">{dictionary['You Pay']}</p>

          <ButtonStepAmount />
        </div>

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="buyAmount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex gap-2">
                    <InputNumber
                      className="h-auto border-none px-0 py-0 text-body-large/regular !ring-0"
                      placeholder="20,000.00 - 375,123.000"
                      {...field}
                    />

                    <span className="text-body/large/regular font-light">USD</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <p className="text-body/small/regular font-light">
          <span>0.00000000&nbsp;</span>
          <span className="text-text-primary">{dictionary.Available}</span>
        </p>
      </div>

      <div className="space-y-3 rounded-[9px] border border-solid border-stroke px-5 py-[1.1875rem]">
        <p className="text-body/small/regular font-light">{['You Receive']}</p>
        <div className="mt-4 flex gap-2">
          <FormField
            control={form.control}
            name="receive"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex gap-2">
                    <InputNumber
                      className="h-auto border-none px-0 py-0 text-body-large/regular !ring-0"
                      placeholder="0.00"
                      {...field}
                    />
                    <span className="flex items-center gap-2">
                      <span className="min-w-6">
                        <Image
                          src="/images/coin/usdt.svg"
                          width={24}
                          height={24}
                          className="size-6"
                          alt="usdt"
                        />
                      </span>
                      <span className="text-body/large/regular font-light">USDT</span>
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  )
}, isEqual)
BuyForm.displayName = 'BuyForm'

const SellForm = memo(function SellForm() {
  const { dictionary } = useDictionary()

  const form = useForm<InferTypeSellFormSchema>({
    defaultValues: {
      sellAmount: '',
      pay: '',
      paymentId: '',
    },
    resolver: yupResolver(SellFormSchema),
  })

  return (
    <Form {...form}>
      <PaymentMethod form={form} />

      <div className="space-y-3 rounded-[9px] border border-solid border-stroke px-5 py-[1.1875rem]">
        <div className="flex justify-between gap-2">
          <p className="text-body/small/regular font-light">{dictionary['You Sell']}</p>
          <ul className="flex gap-3">
            {getAmountStep(dictionary).map((item) => (
              <Button key={item.label} asChild variant="none" size="none">
                <li className="cursor-pointer text-body/small/regular font-light text-blueLight">
                  {item.label}
                </li>
              </Button>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="pay"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex gap-2">
                    <InputNumber
                      className="h-auto border-none px-0 py-0 text-body-large/regular !ring-0"
                      placeholder="20,000.00 - 375,123.000"
                      {...field}
                    />

                    <Asset symbol={AssetSymbol.USDT}>USDT</Asset>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <p className="text-body/small/regular font-light">
          <span className="text-text-primary">{dictionary.Balance}&nbsp;</span>
          <span className="">
            {formatCurrency({
              value: 0,
              currency: 'USDT',
              options: {
                minimumFractionDigits: 2,
              },
            })}
          </span>
        </p>
      </div>

      <div className="space-y-3 rounded-[9px] border border-solid border-stroke px-5 py-[1.1875rem]">
        <p className="text-body/small/regular font-light">{dictionary['You Receive']}</p>
        <div className="mt-4 flex gap-2">
          <FormField
            control={form.control}
            name="pay"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex gap-2">
                    <InputNumber
                      className="h-auto border-none px-0 py-0 text-body-large/regular !ring-0"
                      placeholder="0.00"
                      {...field}
                    />

                    <Asset>USD</Asset>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  )
}, isEqual)
SellForm.displayName = 'SellForm'

export { TradeInfo, AdsInfo, BuyForm, SellForm, ButtonStepAmount }
