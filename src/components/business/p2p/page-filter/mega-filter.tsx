import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'

import { DEFAULT_VALUE } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'
import { cn } from '@/utils/cn'

import { getAdsTypesList, getOrderList, getPeriodDefaultOption, PERIOD_LIST } from '../constants'
import { IFormProps } from '../schema'

function MegaFilter({ form }: IFormProps) {
  const { dictionary } = useDictionary()

  const periodsOptions = React.useMemo(
    () => [getPeriodDefaultOption(dictionary), ...PERIOD_LIST],
    [dictionary],
  )

  const adTypesList = React.useMemo(() => getAdsTypesList(dictionary), [dictionary])

  const orderList = React.useMemo(() => getOrderList(dictionary), [dictionary])

  return (
    <div>
      <h5 className="py-2 text-body/small/regular font-light text-text-secondary">
        {dictionary['Ad Types']}
      </h5>
      {adTypesList.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between gap-2 py-3 text-body/medium/regular"
        >
          {item.label}
          <Switch />
        </div>
      ))}

      <h5 className="pb-2 pt-6 text-body/small/regular font-light text-text-secondary">
        {dictionary['Sort By']}
      </h5>

      <FormField
        control={form.control}
        name="order"
        render={({ field }) => (
          <RadioGroup onValueChange={field.onChange} defaultValue={DEFAULT_VALUE} className="gap-0">
            {orderList.map((item) => (
              <FormItem
                key={item.label}
                className="flex items-center justify-between gap-2 space-y-0 py-3"
              >
                <FormLabel className="font-normal">{item.label}</FormLabel>

                <FormControl>
                  <RadioGroupItem value={item.value} formValue={field.value} />
                </FormControl>
              </FormItem>
            ))}
          </RadioGroup>
        )}
      />

      <h5 className="pb-2 pt-6 text-body/small/regular font-light text-text-secondary">
        {dictionary['Payment Time Limit (minutes)']}
      </h5>

      <FormField
        control={form.control}
        name="period"
        render={({ field }) => (
          <ul className="grid grid-cols-5 gap-[0.375rem] py-3">
            {periodsOptions.map((item) => {
              const isChecked =
                field.value.includes(item.value) || (!field.value.length && item.value === 'All')

              const onClick = () => {
                const addOrRemove = isChecked
                  ? field.value.filter((v) => v !== item.value)
                  : [...field.value, item.value]

                const nextValue = item.value === 'All' ? [] : addOrRemove

                field.onChange(nextValue)
              }

              return (
                <li key={item.label}>
                  <Button
                    className={cn(
                      'w-full rounded-sm text-center',
                      isChecked ? 'bg-primary' : 'bg-dark-3',
                    )}
                    onClick={onClick}
                  >
                    {item.label}
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      />
    </div>
  )
}

export default memo(MegaFilter, isEqual)
