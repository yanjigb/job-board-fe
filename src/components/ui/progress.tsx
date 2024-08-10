/* eslint-disable react/prop-types */

'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/utils/cn'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-[0.25rem] w-full overflow-hidden rounded-full bg-stroke dark:bg-slate-800',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="indicator h-full w-full flex-1 rounded-full transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)`, background: 'currentColor' }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
