'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { Asset, AssetSymbol } from '@/components/common/asset'
import { Switch } from '@/components/ui/switch'

import { useDictionary } from '@/providers/dictionary-provider'
import { formatCurrency } from '@/utils/format-currency'

import s from './style.module.scss'

function AdInformation() {
  const { dictionary } = useDictionary()
  return (
    <div>
      <ul className="space-y-7 bg-dark-2 py-3 md:px-8 md:py-6">
        {[
          {
            label: dictionary.Asset,
            value: (
              <Asset symbol={AssetSymbol.USDT} size={24}>
                USDT
              </Asset>
            ),
          },
          {
            label: dictionary.Currency,
            value: 'USD',
          },
          {
            label: dictionary.Price,
            value: formatCurrency({
              value: 1.008,
              currency: 'USD',
            }),
          },
          {
            label: dictionary['Available/ Limit'],
            value: (
              <span className={s.List}>
                <span>
                  {formatCurrency({
                    value: 41318.61,
                    currency: 'USDT',
                  })}
                </span>
                <span>
                  {formatCurrency({
                    value: 2500,
                    currency: '$',
                    isPrefix: true,
                    options: {
                      minimumFractionDigits: 2,
                    },
                  })}
                  -
                  {formatCurrency({
                    value: 20000,
                    currency: '$',
                    isPrefix: true,
                    options: {
                      minimumFractionDigits: 2,
                    },
                  })}
                </span>
              </span>
            ),
          },
          {
            label: dictionary['Total Trading Amount'],
            value: formatCurrency({
              value: 1000,
              currency: 'USDT',
            }),
          },
          {
            label: dictionary['Estimate Fee'],
            value: formatCurrency({
              value: 8.61,
              currency: 'USDT',
            }),
          },
          {
            label: dictionary['Payment Method'],
            value: (
              <span className={s.List}>
                <span>Bank Transfer</span>
                <span>Visa</span>
                <span>MasterCard</span>
              </span>
            ),
          },
          {
            label: dictionary.Status,
            value: (
              <span className="block h-8">
                <Switch defaultChecked />
              </span>
            ),
          },
        ].map((item) => (
          <li key={item.label} className="flex justify-between gap-1 md:justify-start">
            <span className="max-w-[13.75rem] flex-1 text-text-primary">{item.label}</span>
            <span className="text-body/large/regular font-light">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(AdInformation, isEqual)
