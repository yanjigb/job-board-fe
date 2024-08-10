import * as React from 'react'

import { cn } from '@/utils/cn'

import { useFormField } from './form'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const { error } = useFormField()
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md placeholder:text-text-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
          'border border-stroke bg-transparent p-5 text-body/medium/regular font-light',
          error &&
            'border-error hover:ring-1 hover:ring-error focus:ring-1 focus:ring-error focus-visible:ring-error',
          !props.disabled &&
            !error &&
            'ring-primary hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
