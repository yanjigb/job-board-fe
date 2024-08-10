'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { CalendarIcon } from 'lucide-react'

import AppComboboxWithInput from '@/components/common/app-combobox/app-combobox-with-input'
import AppDatePicker from '@/components/common/app-date-picker'
import { Button } from '@/components/ui/button'
import { inputVariantDefault } from '@/components/ui/input'

import { ALL_VALUE } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'
import { cn } from '@/utils/cn'

function PageFilter() {
  const { dictionary } = useDictionary()
  return (
    <div className="flex flex-col flex-wrap gap-3 md:flex-row">
      <AppComboboxWithInput
        options={[{ value: ALL_VALUE, label: dictionary.All }]}
        value={ALL_VALUE}
        placeholder={dictionary['Asset/type']}
        triggerClassName="md:max-w-[12.0813rem]"
      />

      <AppComboboxWithInput
        options={[{ value: ALL_VALUE, label: dictionary.All }]}
        value={ALL_VALUE}
        placeholder={dictionary.Type}
        triggerClassName="md:max-w-[12.0813rem]"
      />

      <AppComboboxWithInput
        options={[{ value: ALL_VALUE, label: dictionary.All }]}
        value={ALL_VALUE}
        placeholder={dictionary.Status}
        triggerClassName="md:max-w-[12.0813rem]"
      />

      <div
        className={cn(
          'flex min-w-[17.5rem] items-center justify-between gap-3',
          inputVariantDefault,
        )}
      >
        <div>
          <AppDatePicker
            isHiddenIcon
            placeholder={dictionary['Start date']}
            formatDate="MM/dd/yyyy"
          />
          <span className="text-text-primary">&nbsp;-&nbsp;</span>
          <AppDatePicker
            isHiddenIcon
            placeholder={dictionary['End date']}
            formatDate="MM/dd/yyyy"
          />
        </div>

        <span>
          <CalendarIcon size={16} className="text-text-primary" />
        </span>
      </div>

      <Button variant="ghost">{dictionary.Reset}</Button>
    </div>
  )
}

export default memo(PageFilter, isEqual)
