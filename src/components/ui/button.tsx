/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex gap-2 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 text-body/medium/medium font-normal',
  {
    variants: {
      variant: {
        default:
          'disabled:bg-disabledBg bg-primary text-white hover:bg-blueLight disabled:text-text-primary',
        secondary:
          'disabled:bg-disabledBg bg-secondary text-dark-3 hover:bg-yellowDark disabled:text-text-primary hover:text-dark-background shadow-[0_0_0_1px] shadow-dark-3',
        ghost: 'text-blueLight hover:bg-dark-3 disabled:bg-disabledBg disabled:text-text-primary',
        bg: 'bg-dark-3 text-text-primary hover:text-text-dark disabled:bg-disabledBg disabled:text-text-primary',
        none: '',
      },
      size: {
        default: 'h-12 px-6 py-3',
        none: '',
      },
      rounded: {
        default: 'rounded-md',
        sm: 'rounded-sm',
        lg: 'rounded-lg',
        full: 'rounded-full',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, rounded }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
