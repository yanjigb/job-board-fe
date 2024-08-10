'use client'

/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { cn, cnWithClxs } from '@/utils/cn'

import { useFormField } from './form'

export const inputVariantDefault =
  'flex h-12 rounded-sm border border-solid border-stroke px-[0.9375rem] py-[0.6875rem] hover:ring-1 hover:ring-primary focus:ring-1 focus:ring-primary focus-visible:ring-primary'

export const inputVariantError =
  'border border-solid border-error hover:ring-1 hover:ring-error focus:ring-1 focus:ring-error focus-visible:ring-error'

export const inputVariants = cva(
  'w-full font-light text-text-dark outline-none transition-all duration-300 placeholder:text-body/medium/regular placeholder:font-light placeholder:text-text-placeholder bg-transparent',
  {
    variants: {
      variant: {
        default: inputVariantDefault,
        none: '',
      },
      error: {
        default: inputVariantError,
        none: '',
      },
      customDisabled: {
        default: 'border-stroke bg-dark-2 ring-0 hover:ring-0',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      error: 'none',
      customDisabled: 'default',
    },
  },
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: 'default' | 'none' | null
}

const InputRaw = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, error, ...props }, ref) => {
    return (
      <input
        className={cnWithClxs(
          cn(
            inputVariants({
              variant,
              className,
              error,
              customDisabled: props.disabled ? 'default' : 'none',
            }),
          ),
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
InputRaw.displayName = 'InputRaw'

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  const { error } = useFormField()
  return <InputRaw ref={ref} error={error ? 'default' : 'none'} {...props} />
})
Input.displayName = 'Input'

export { Input, InputRaw }
