import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import Image from 'next/image'

import { HTMLTypeWithoutRefHasClassNameOptional } from '@/types/common'
import { cn } from '@/utils/cn'

function AppLogo({ className, ...rest }: HTMLTypeWithoutRefHasClassNameOptional<HTMLDivElement>) {
  return (
    <div className={cn('aspect-[115.82/40] max-w-[7.2387rem]', className)} {...rest}>
      <Image
        src="/images/logo.svg"
        width={115.82}
        height={40}
        alt="logo"
        className="block h-full object-contain"
      />
    </div>
  )
}

export default memo(AppLogo, isEqual)
