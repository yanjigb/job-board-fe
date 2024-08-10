/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { forwardRef, memo, useState } from 'react'
import isEqual from 'react-fast-compare'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import AppInput from '@/components/common/app-input'
import { Button } from '@/components/ui/button'
import { InputProps } from '@/components/ui/input'

import { cn } from '@/utils/cn'

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const disabled = props.value === '' || props.value === undefined || props.disabled

  return (
    <AppInput
      type={showPassword ? 'text' : 'password'}
      className={cn('hide-password-toggle', className)}
      ref={ref}
      {...props}
      inputSuffix={
        <Button
          type="button"
          variant="none"
          className="-mr-1 h-full p-0 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon className="h-4 w-4 text-another-5" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4 text-another-5" aria-hidden="true" />
          )}
          <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
        </Button>
      }
    />
  )
})
PasswordInput.displayName = 'PasswordInput'

export default memo(PasswordInput, isEqual)
