'use client'

import React, { PropsWithChildren } from 'react'
import Image from 'next/image'

import { useDictionary } from '@/providers/dictionary-provider'

function Empty({ children }: PropsWithChildren) {
  const { dictionary } = useDictionary()

  return (
    <span className="flex flex-col items-center justify-between gap-2 py-4 pb-5">
      <span className="max-w-[6.0756rem]">
        <Image
          src="/images/empty-image.svg"
          width={97.21}
          height={59.51}
          alt="empty"
          className="w-full object-contain"
        />
      </span>

      <span className="text-body/small/regular font-light text-text-primary">
        {children || dictionary['No Comments']}
      </span>
    </span>
  )
}

export { Empty }
