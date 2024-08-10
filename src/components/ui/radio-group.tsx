/* eslint-disable react/prop-types */

'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'

import { cn } from '@/utils/cn'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

interface ICustomRadioGroupItemProps {
  formValue?: string | number
}

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    ICustomRadioGroupItemProps {}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, formValue, ...props }, ref) => {
  const isActive = formValue === props.value
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square rounded-full border ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-50 dark:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
        // custom
        'h-5 min-h-5 w-5 min-w-5',
        // inner
        'text-secondary',
        // outer
        'border-stroke',
        isActive && 'border-secondary',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
