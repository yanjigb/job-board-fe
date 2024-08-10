import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import Link from 'next/link'

import { DictionaryProps } from '@/types/common'

import { getPageHeaderP2p } from './constants'

function PageHeader({ dictionary }: DictionaryProps) {
  return (
    <div className="container py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-heading-5 font-semibold uppercase">{dictionary.P2p}</h1>
          <p className="mt-1 text-text-primary">
            {dictionary['Buy and Sell With Your Preferred Payment Method']}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 xl:flex-nowrap">
          {getPageHeaderP2p(dictionary).map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-1 text-body/small/regular font-light"
              >
                <item.icon className="text-text-primary" size={16} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default memo(PageHeader, isEqual)
