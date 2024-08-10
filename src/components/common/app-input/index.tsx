'use client'

/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, memo } from 'react'
import isEqual from 'react-fast-compare'
import { FieldError } from 'react-hook-form'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { VariantProps } from 'class-variance-authority'

import { useFormField } from '@/components/ui/form'
import { inputVariants } from '@/components/ui/input'

import { cn } from '@/utils/cn'

interface IAppInputLayoutProps {
  children: React.ReactNode
  classNameWrapper?: string
  inputPrefix?: React.ReactNode
  inputSuffix?: React.ReactNode
  error?: FieldError
  disabled?: boolean
}

const AppInputLayout = memo(function AppInputLayout({
  children,
  classNameWrapper,
  inputPrefix,
  inputSuffix,
  error,
  disabled,
}: IAppInputLayoutProps) {
  return (
    <div
      className={cn(
        'flex gap-[0.625rem]',
        inputVariants({
          className: classNameWrapper,
          error: error ? 'default' : 'none',
          customDisabled: disabled ? 'default' : 'none',
        }),
      )}
    >
      {inputPrefix && (
        <span className="inputPrefix flex items-center justify-center">{inputPrefix}</span>
      )}
      {children}
      {inputSuffix && (
        <span className="inputSuffix flex items-center justify-center">{inputSuffix}</span>
      )}
    </div>
  )
}, isEqual)
AppInputLayout.displayName = 'AppInputLayout'

interface IAppInputNumberProps extends Omit<NumericFormatProps, 'onChange'> {
  onChange?: (value: string, e: React.ChangeEvent) => void
  className?: string
  classNameWrapper?: string
  inputPrefix?: React.ReactNode
  inputSuffix?: React.ReactNode
}

const AppInputNumber = forwardRef<HTMLInputElement, IAppInputNumberProps>(function AppInputNumber(
  { className, disabled, classNameWrapper, inputPrefix, inputSuffix, onChange, ...rest },
  ref,
) {
  const { error } = useFormField()

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value.replace(/\$\s?|(,*)/g, '')
      onChange?.(v, e)
    },
    [onChange],
  )

  return (
    <AppInputLayout
      classNameWrapper={classNameWrapper}
      error={error}
      disabled={disabled}
      inputPrefix={inputPrefix}
      inputSuffix={inputSuffix}
    >
      <NumericFormat
        getInputRef={ref}
        className={cn(inputVariants({ variant: 'none', customDisabled: 'none' }))}
        thousandSeparator=","
        decimalSeparator="."
        decimalScale={10}
        fixedDecimalScale={false}
        {...rest}
        onChange={handleChange}
      />
    </AppInputLayout>
  )
})
AppInputNumber.displayName = 'AppInputNumber'

interface IAppInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  className?: string
  classNameWrapper?: string
  inputPrefix?: React.ReactNode
  inputSuffix?: React.ReactNode
}

const AppInput = React.forwardRef<HTMLInputElement, IAppInputProps>(
  ({ className, disabled, classNameWrapper, inputPrefix, inputSuffix, ...props }, ref) => {
    const { error } = useFormField()
    return (
      <AppInputLayout
        classNameWrapper={classNameWrapper}
        inputPrefix={inputPrefix}
        inputSuffix={inputSuffix}
        error={error}
        disabled={disabled}
      >
        <input
          {...props}
          ref={ref}
          disabled={disabled}
          className={cn(inputVariants({ variant: 'none', customDisabled: 'none', className }))}
        />
      </AppInputLayout>
    )
  },
)

AppInput.displayName = 'AppInput'

export default React.memo(AppInput, isEqual)
export { AppInputNumber, AppInputLayout }
