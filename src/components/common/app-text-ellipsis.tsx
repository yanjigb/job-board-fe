import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { HTMLTypeWithoutRefHasClassNameOptional } from '@/types/common'
import { cn } from '@/utils/cn'

function AppTextEllipsis({
  className,
  children,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLSpanElement>) {
  return (
    <span className={cn('grid grid-cols-1 whitespace-nowrap', className)} {...rest}>
      <span className="content overflow-hidden text-ellipsis">{children}</span>
    </span>
  )
}

export default memo(AppTextEllipsis, isEqual)
