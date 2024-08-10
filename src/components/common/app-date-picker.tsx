'use client'

import * as React from 'react'
import { format, isValid } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import PropTypes from 'prop-types'

import { Button } from '@/components/ui/button'
import { Calendar, CalendarProps, TypeDisabledCalendarDate } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/utils/cn'

type IAppDatePickerProps = CalendarProps & {
  isHiddenIcon?: boolean
  formatDate?: string
  placeholder?: string
  classNameTrigger?: string
  date?: string
  onDisable?: TypeDisabledCalendarDate
  onSetDate?: (newDate: Date | undefined) => void
}

function AppDatePicker(props: IAppDatePickerProps) {
  const {
    isHiddenIcon = false,

    formatDate = 'PPP',
    placeholder = 'Pick a date',
    classNameTrigger,
    date,

    onDisable,
    onSetDate,
  } = props
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    date ? new Date(date) : undefined,
  )

  const handleDateSelect = React.useCallback(
    (newDate: Date | undefined) => {
      setSelectedDate(newDate)
      onSetDate?.(newDate)
    },
    [onSetDate],
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="none"
          size="none"
          className={cn('justify-start font-light', classNameTrigger)}
        >
          {selectedDate && isValid(selectedDate) ? (
            format(selectedDate, formatDate)
          ) : (
            <span className="placeholder text-text-placeholder">{placeholder}</span>
          )}

          {!isHiddenIcon && <CalendarIcon className="h-4 w-4" />}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" sideOffset={10} align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          onDisable={onDisable}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

AppDatePicker.propTypes = {
  isHiddenIcon: PropTypes.bool,

  classNameTrigger: PropTypes.string,
  formatDate: PropTypes.string,
  placeholder: PropTypes.string,

  onDisable: PropTypes.func,

  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.instanceOf(Object),
  ]).isRequired,

  onSetDate: PropTypes.func.isRequired,
}

export default React.memo(AppDatePicker)
