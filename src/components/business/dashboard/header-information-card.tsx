'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { ChevronRight } from 'lucide-react'

import { AppAvatar } from '@/components/common/app-avatar'
import { AppCopy } from '@/components/common/app-copy'
import AppLink from '@/components/common/app-link'
import { Card } from '@/components/ui/card'

import { AVATAR_DEFAULT } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'

function HeaderInformationCard() {
  const { dictionary } = useDictionary()
  return (
    <Card className="space-y-7">
      <div className="flex items-center gap-3">
        <AppAvatar className="size-[3.25rem]" url={AVATAR_DEFAULT} fallback="hello@p2p.com" />

        <h2 className="text-heading-6 text-text-primary">
          <span className="grid grid-cols-1">
            <span className="break-words">{dictionary['Good morning']}, hello@p2p.com</span>
          </span>
        </h2>
      </div>

      <ul className="flex justify-between">
        <li className="space-y-[0.125rem]">
          <p className="text-body/small/regular font-light text-text-primary">{dictionary.UID}</p>
          <p>
            <AppCopy className="gap-2 [&_.icon]:text-text-primary" copyValue="1234523567">
              1234523567
            </AppCopy>
          </p>
        </li>

        <li className="space-y-[0.125rem]">
          <p className="text-body/small/regular font-light text-text-primary">
            {dictionary.Following}
          </p>
          <p>
            <AppCopy className="gap-2 [&_.icon]:text-text-primary" copyValue="0">
              0
            </AppCopy>
          </p>
        </li>

        <li className="space-y-[0.125rem]">
          <p className="text-body/small/regular font-light text-text-primary">
            {dictionary.Followers}
          </p>
          <p>
            <AppLink href="/##" className="flex items-center gap-2">
              <span>5</span>
              <span>
                <ChevronRight size={16} className="text-text-primary" />
              </span>
            </AppLink>
          </p>
        </li>
      </ul>
    </Card>
  )
}

export default memo(HeaderInformationCard, isEqual)
