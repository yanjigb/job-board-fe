/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

import { cn } from '@/utils/cn'

import { useFormField } from './form'

interface Props extends Omit<NumericFormatProps, 'onChange'> {
  onChange?: (value: string, e: React.ChangeEvent) => void
}

const InputNumber = React.forwardRef<HTMLInputElement, Props>(function InputNumber(
  { onChange, className, ...rest },
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
    <NumericFormat
      getInputRef={ref}
      className={cn(
        'flex h-12 w-full rounded-sm border border-solid border-stroke bg-transparent px-[0.9375rem] py-[0.6875rem] font-light outline-none transition-all duration-300 placeholder:text-body/medium/regular placeholder:text-text-placeholder',
        error
          ? 'border-error'
          : 'hover:ring-1 hover:ring-primary focus:ring-1 focus:ring-primary focus-visible:ring-primary',
        'disabled:border-stroke disabled:bg-dark-2 disabled:ring-0',
        className,
      )}
      thousandSeparator=","
      decimalSeparator="."
      decimalScale={10}
      fixedDecimalScale={false}
      {...rest}
      onChange={handleChange}
    />
  )
})

InputNumber.displayName = 'InputNumber'

export default InputNumber
