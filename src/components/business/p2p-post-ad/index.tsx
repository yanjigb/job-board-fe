'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useQueryState } from 'nuqs'

import { Button } from '@/components/ui/button'

import { useDictionary } from '@/providers/dictionary-provider'
import { ExChangeTab } from '@/types/home'
import { PostAdPriceType } from '@/types/post-ad'
import { getTabValue } from '@/utils'
import { cn } from '@/utils/cn'

import FixedStep1 from './fixed-step-1'
import FixedStep2 from './fixed-step-2'
import FixedStep3 from './fixed-step-3'
import { FormPostAdFixed } from './schema'

function PostAdPage() {
  const { dictionary } = useDictionary()
  const [tabQuery, setTabQuery] = useQueryState('tab')

  const tab = React.useMemo(
    () => getTabValue(tabQuery, ExChangeTab, ExChangeTab.Buy) as ExChangeTab,
    [tabQuery],
  )

  const form = useForm({
    resolver: yupResolver(FormPostAdFixed(dictionary)),
    defaultValues: {
      step: 1,
      tab,
      asset: '',
      fiat: '',
      type: PostAdPriceType.Fixed,
      payTimeLimit: '',
      paymentMethods: [],
      remark: '',
      autoReply: '',
      region: '',
      day: '',
      holding: '',
      status: '',
    },
  })

  const step = form.watch('step')

  return (
    <div className="container">
      <div className="mx-auto max-w-[41.625rem]">
        <h1 className="pb-9 pt-3 text-heading-5 font-semibold">{dictionary['Post Ad']}</h1>

        <div className="flex">
          {[
            {
              label: dictionary['I want to buy'],
              value: ExChangeTab.Buy,
            },
            {
              label: dictionary['I want to sell'],
              value: ExChangeTab.Sell,
            },
          ].map((item) => {
            const onChangeTab = () => {
              setTabQuery(item.value)
              form.setValue('tab', item.value)
            }
            const isActive = item.value === tab
            return (
              <div className="relative w-full" key={item.value}>
                {isActive && (
                  <Image
                    src="/images/post-ad/bg-button.svg"
                    alt="bg-button"
                    fill
                    className={cn(
                      'rounded-tl-xl rounded-tr-xl object-cover',
                      tab === ExChangeTab.Sell && '-scale-x-100 transform',
                    )}
                  />
                )}

                <Button
                  className={cn(
                    'relative z-[2] min-h-[3.5rem] w-full rounded-none',
                    !isActive && 'text-text-primary',
                  )}
                  variant="none"
                  onClick={onChangeTab}
                >
                  <span className="text-body/large/medium font-normal">{item.label}</span>
                </Button>
              </div>
            )
          })}
        </div>

        <div className="rounded-b-[1.25rem] bg-dark-3 p-6">
          {step === 1 && <FixedStep1 form={form} />}
          {step === 2 && <FixedStep2 form={form} />}
          {step === 3 && <FixedStep3 form={form} />}
        </div>
      </div>
    </div>
  )
}

export default memo(PostAdPage, isEqual)
