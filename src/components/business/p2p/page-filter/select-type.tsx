import React, { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { useController } from 'react-hook-form'

import { TabsSelect } from '@/components/common/tabs-select'

import { useDictionary } from '@/providers/dictionary-provider'

import { getP2pTypeList } from '../constants'
import { IFormProps } from '../schema'

interface ISelectTypeProps extends IFormProps {}

function SelectType({ form }: ISelectTypeProps) {
  const { dictionary } = useDictionary()
  const p2pTypes = React.useMemo(() => getP2pTypeList(dictionary), [dictionary])

  const { field } = useController({
    name: 'type',
    control: form.control,
  })

  const onClick = useCallback(
    (value: string) => {
      field.onChange(value)
    },
    [field],
  )

  return <TabsSelect list={p2pTypes} currentValue={field.value} onClick={onClick} />
}

export default memo(SelectType, isEqual)
