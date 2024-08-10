import React, { forwardRef, memo, ReactNode } from 'react'
import isEqual from 'react-fast-compare'
import { FieldError } from 'react-hook-form'
import { ChevronDown, LucideProps } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn, cnWithClxs } from '@/utils/cn'

interface IComboboxItemTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hiddenChevron?: boolean
  iconPrefix?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  customPrefix?: ReactNode
  customSuffix?: ReactNode
  error?: FieldError
}
const ComboboxTriggerMockup = forwardRef<HTMLButtonElement, IComboboxItemTriggerProps>(
  function ComboboxTriggerMockup(
    {
      className,
      children,
      hiddenChevron,
      iconPrefix: IconPrefix,
      customPrefix,
      customSuffix,
      error,
      ...props
    },
    ref,
  ) {
    return (
      <Button
        type="button"
        ref={ref}
        variant="none"
        size="none"
        role="combobox"
        className={cn(
          'min-h-12 w-[300px] justify-between border border-solid border-stroke px-[1.1875rem] py-[0.6875rem]',
          error &&
            'border-error hover:ring-1 hover:ring-error focus:ring-1 focus:ring-error focus-visible:ring-error',
          !error && !props.disabled && 'hover:border-primary',
          className,
        )}
        {...props}
      >
        <span className="item flex items-center gap-2">
          {IconPrefix && (
            <span>
              <IconPrefix size={24} strokeWidth="1" className="size-6 text-text-primary" />
            </span>
          )}
          {customPrefix && <span>{customPrefix}</span>}

          <span className="grid grid-cols-1 whitespace-nowrap">
            <span className="overflow-hidden text-ellipsis font-light text-text-dark">
              {children}
            </span>
          </span>
        </span>

        {customSuffix}

        {!hiddenChevron && (
          <ChevronDown
            className="chevron h-4 w-4 shrink-0 text-text-dark opacity-50"
            size={16}
            strokeWidth={1}
          />
        )}
      </Button>
    )
  },
)
ComboboxTriggerMockup.displayName = 'ComboboxTriggerMockup'

interface IComboboxItemMockupProps extends React.HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean
}
const ComboboxItemMockup = memo(function ComboboxItemMockup({
  className,
  isSelected,
  ...props
}: IComboboxItemMockupProps) {
  return (
    <div
      className={cnWithClxs(
        'text-body/medium/semibold',
        cn(
          'flex w-full items-center gap-2 px-4 py-3 text-text-dark hover:bg-another-7',
          isSelected && 'border-r-2 border-solid border-primary bg-another-7',
          className,
        ),
      )}
      {...props}
    />
  )
}, isEqual)
ComboboxItemMockup.displayName = 'ComboboxItemMockup'

export { ComboboxItemMockup, ComboboxTriggerMockup }
