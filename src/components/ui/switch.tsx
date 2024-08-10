/* eslint-disable react/prop-types */

'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '@/utils/cn'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950 dark:data-[state=checked]:bg-slate-50 dark:data-[state=unchecked]:bg-slate-800',
      // custom,
      'h-8 w-[3.4375rem] border-0',
      // bg checked
      'data-[state=checked]:bg-secondary',
      // bg un-checked
      'data-[state=unchecked]:bg-stroke',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block rounded-full shadow-lg ring-0 transition-all dark:bg-slate-950',
        // custom
        // 0.125rem = gap from controller
        // 0.0625rem = gap from border
        // Rewrite size when change size
        'absolute top-1/2 h-6 w-6 -translate-y-1/2 border-[0.0625rem] border-solid data-[state=checked]:left-[calc(100%-0.125rem-0.0625rem)] data-[state=unchecked]:left-[calc(0.125rem+0.0625rem)] data-[state=checked]:-translate-x-full',
        // Check
        'border-yellowDark bg-yellowLight',
        // Uncheck
        'data-[state=unchecked]:border-stroke data-[state=unchecked]:bg-text-primary',
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
