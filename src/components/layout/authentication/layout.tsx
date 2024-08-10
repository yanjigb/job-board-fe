import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { cn } from '@/utils/cn'

interface Props {
  children: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  className?: string
}

function AuthenticationLayout({ children, className, title, description }: Props) {
  return (
    <section className="container">
      <div
        className={cn(
          'mx-auto my-9 w-[calc(min(100%,34.25rem))] space-y-6 rounded-xl bg-dark-3 p-10',
          className,
        )}
      >
        <div>
          <h1 className="text-heading-4 font-bold">{title}</h1>
          {description && <p className="mt-1 text-text-primary">{description}</p>}
        </div>

        {children}
      </div>
    </section>
  )
}

export default memo(AuthenticationLayout, isEqual)
