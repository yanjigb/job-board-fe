/* eslint-disable react/no-unstable-nested-components */

'use client'

import * as React from 'react'
import { DayPicker, Matcher } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/utils/cn'

export type CalendarProps = React.ComponentProps<typeof DayPicker>
export type TypeDisabledCalendarDate = (
  date: Matcher | Matcher[] | undefined,
) => boolean | undefined

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  onDisable,
  ...props
}: CalendarProps & {
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
  onDisable?: (date: Matcher | Matcher[] | undefined) => boolean | undefined
}) {
  const yearNow = new Date().getFullYear()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        vhidden: 'hidden',
        caption_dropdowns:
          'flex items-center gap-x-2 bg-transparent rounded-none outline-none text-sm font-medium text-text-primary cursor-pointer',
        dropdown:
          'flex items-center bg-transparent rounded-none outline-none text-body font-medium cursor-pointer [&_option]:bg-dark-3 [&_option]:text-text-dark',
        dropdown_year: 'flex-1 justify-between',
        caption_label: 'hidden',
        caption: 'flex justify-center pt-1 relative items-center mb-3',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants(),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-stroke',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
          '!bg-transparent',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-text-dark',
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary !text-text-dark hover:bg-primary hover:text-primary focus:bg-primary focus:text-primary',
        day_today: 'text-[hsl(var(--secondary))]',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: '!text-text-dark opacity-20 !bg-transparent',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      disabled={(date: Date) => {
        if (!date) return false
        const isDisabled = date > new Date() || date < new Date('1900-01-01')
        return isDisabled || (typeof onDisable === 'function' ? onDisable(date) ?? false : false)
      }}
      fromYear={1900}
      // toMonth={monthNow}
      toYear={yearNow}
      captionLayout="dropdown-buttons"
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
