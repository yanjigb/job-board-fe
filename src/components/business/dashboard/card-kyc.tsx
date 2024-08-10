'use client'

import React, { memo, PropsWithChildren } from 'react'
import isEqual from 'react-fast-compare'
import { CircleCheck, X } from 'lucide-react'

import AppIcon from '@/components/common/app-icon'
import { Button } from '@/components/ui/button'

import { useDictionary } from '@/providers/dictionary-provider'

import { getKycVerifyFailureMessage } from './constants'

function CardVerifyLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col justify-between gap-6 px-6 md:flex-row">{children}</div>
}

const CardKycVerifyPending = memo(function CardKycVerifyPending() {
  const { dictionary } = useDictionary()
  return (
    <CardVerifyLayout>
      <div>
        <p className="flex items-center gap-2 text-secondary">
          <span>
            <AppIcon
              src="/images/dashboard/history.svg#id"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            />
          </span>
          <span className="text-body/large/semibold">
            {dictionary['Waiting for your KYC verification']}
          </span>
        </p>
        <p className="mt-2 text-text-primary">
          {dictionary['P2P will review your KYC and respond as soon as possible']}
        </p>
      </div>

      <div className="self-end">
        <Button className="min-w-[10rem]" disabled>
          {dictionary.Verify}
        </Button>
      </div>
    </CardVerifyLayout>
  )
}, isEqual)
CardKycVerifyPending.displayName = 'CardKycVerifyPending'

const CardKycVerifyFail = memo(function CardKycVerifyFail() {
  const { dictionary } = useDictionary()
  return (
    <CardVerifyLayout>
      <div>
        <p className="flex items-center gap-2 text-error">
          <span aria-label="not-valid">
            <X />
          </span>
          <span className="text-body/large/semibold">
            {dictionary['Your KYC verification is not valid']}
          </span>
        </p>
        <ul className="mt-2 text-text-primary">
          {dictionary['The reason']}:
          {getKycVerifyFailureMessage(dictionary).map((item) => (
            <li className="list-style" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="self-end">
        <Button className="min-w-[10rem]" disabled>
          {dictionary.Verify}
        </Button>
      </div>
    </CardVerifyLayout>
  )
}, isEqual)
CardKycVerifyFail.displayName = 'CardKycVerifyFail'

const CardKycVerifyComplete = memo(function CardKycVerifyComplete() {
  const { dictionary } = useDictionary()
  return (
    <CardVerifyLayout>
      <div>
        <p className="flex items-center gap-2 text-success">
          <span aria-label="success">
            <CircleCheck />
          </span>
          <span className="text-body/large/semibold">{dictionary['Complete Verify Account']}</span>
        </p>
        <p className="mt-2 text-text-primary">
          {dictionary['Complete identity verification to access all P2P services']}
        </p>
      </div>

      <div className="self-end">
        <Button className="min-w-[10rem]" disabled>
          {dictionary.Verify}
        </Button>
      </div>
    </CardVerifyLayout>
  )
}, isEqual)
CardKycVerifyComplete.displayName = 'CardKycVerifyComplete'

export { CardKycVerifyPending, CardKycVerifyFail, CardKycVerifyComplete }
