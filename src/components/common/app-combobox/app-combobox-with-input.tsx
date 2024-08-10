'use client'

import React, {
  ChangeEvent,
  CSSProperties,
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import isEqual from 'react-fast-compare'
import { FixedSizeList as List } from 'react-window'
import { PopoverContentProps } from '@radix-ui/react-popover'
import { Search } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { InputRaw } from '@/components/ui/input'
import InputNumber from '@/components/ui/input-number'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { useDictionary } from '@/providers/dictionary-provider'
import { OptionRequired, OptionValue } from '@/types/common'
import { cn } from '@/utils/cn'

import { AppInputLayout } from '../app-input'

import { ComboboxItemMockup, ComboboxTriggerMockup } from './components'

interface IAppComboboxWithInputProps extends Omit<PopoverContentProps, 'onChange'> {
  options: OptionRequired[]
  value: OptionValue
  onChange?: (value: string) => void
  customPrefix?: ReactNode
  placeholder?: string
  triggerClassName?: string
  contentClassName?: string
  popoverTriggerClassName?: string
  type?: 'number' | 'string'
  onTypeChange?: (value: number | string) => void
  hiddenSearch?: boolean
  inputDisabled?: boolean
}

const itemHeight = 48
const paddingYOuterItem = 16
const paddingYList = 16
const heightContainer = 300
const listHeight = heightContainer - paddingYList - itemHeight - paddingYOuterItem

const AppComboboxWithInput = forwardRef<HTMLButtonElement | null, IAppComboboxWithInputProps>(
  ({
    options,
    value: defaultValue,
    onChange,
    placeholder,
    customPrefix,
    triggerClassName,
    contentClassName,
    popoverTriggerClassName,
    type = 'text',
    onTypeChange,
    hiddenSearch,
    inputDisabled,
    ...props
  }) => {
    const { dictionary } = useDictionary()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(defaultValue)

    const [searchValue, setSearchValue] = useState('')
    const [popoverWidth, setPopoverWidth] = useState(0)

    const selectRef = useRef<HTMLDivElement | null>(null)

    const [initialOffset, setInitialOffset] = useState(0)

    const filteredOptions = useMemo(() => {
      if (!searchValue) return options
      return options.filter((option) =>
        option.value.toUpperCase().includes(searchValue.toUpperCase()),
      )
    }, [options, searchValue])

    const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value)
    }, [])

    const onOpenChange = useCallback((isOpen: boolean) => {
      setOpen(isOpen)

      if (!isOpen) {
        setSearchValue('')
      }
    }, [])

    const popoverContentStyles = React.useMemo(
      (): CSSProperties => ({
        width: popoverWidth,
      }),
      [popoverWidth],
    )

    useEffect(() => {
      if (options.length) {
        const option = options.findIndex((f) => f.value === value)
        setInitialOffset(option > -1 ? option * itemHeight : 0)
      }
    }, [options, value])

    useEffect(() => {
      if (selectRef.current) {
        setPopoverWidth(selectRef.current.clientWidth)
      }
    }, [])

    const onInputNumberChange = useCallback(
      (v: string) => onTypeChange && onTypeChange(v),
      [onTypeChange],
    )

    const onInputTextChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => onChange && onChange(event.target.value),
      [onChange],
    )

    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <div
          className={cn(
            'flex rounded-md border border-solid border-stroke hover:border-primary focus:border-primary',
            triggerClassName,
          )}
          ref={selectRef}
        >
          {inputDisabled ? (
            <PopoverTrigger asChild>
              <div className="flex w-full">
                {type === 'number' && (
                  <InputNumber
                    className="h-auto cursor-pointer border-none py-[0.6875rem] pl-4 !ring-0"
                    placeholder={placeholder}
                    onChange={onInputNumberChange}
                    readOnly
                  />
                )}

                {type === 'text' && (
                  <InputRaw
                    className="h-auto cursor-pointer border-none py-[0.6875rem] pl-4 !ring-0"
                    placeholder={placeholder}
                    onChange={onInputTextChange}
                    readOnly
                  />
                )}

                <ComboboxTriggerMockup
                  className={cn(
                    'w-[40%] justify-end gap-1 border-none p-0 pr-3',
                    popoverTriggerClassName,
                  )}
                  aria-expanded={open}
                >
                  <span>{value && options.find((option) => option.value === value)?.label}</span>
                </ComboboxTriggerMockup>
              </div>
            </PopoverTrigger>
          ) : (
            <>
              {type === 'number' && (
                <InputNumber
                  className="h-auto border-none py-[0.6875rem] pl-4 !ring-0"
                  placeholder={placeholder}
                  onChange={onInputNumberChange}
                />
              )}

              {type === 'text' && (
                <InputRaw
                  className="h-auto border-none py-[0.6875rem] pl-4 !ring-0"
                  placeholder={placeholder}
                  onChange={onInputTextChange}
                />
              )}

              <PopoverTrigger asChild>
                <ComboboxTriggerMockup
                  className={cn(
                    'w-[40%] justify-end gap-1 border-none p-0 pr-3',
                    popoverTriggerClassName,
                  )}
                  aria-expanded={open}
                >
                  <span>{value && options.find((option) => option.value === value)?.label}</span>
                </ComboboxTriggerMockup>
              </PopoverTrigger>
            </>
          )}
        </div>

        <PopoverContent
          className={cn('p-0', contentClassName)}
          style={popoverContentStyles}
          align="end"
          {...props}
        >
          <Command>
            <CommandList>
              {!hiddenSearch && (
                <div className="relative flex items-center px-4 py-2">
                  <AppInputLayout
                    inputPrefix={<Search size={16} strokeWidth={1} className="text-text-primary" />}
                  >
                    <InputRaw
                      onChange={onSearchChange}
                      placeholder="Search"
                      tabIndex={-1}
                      variant="none"
                    />
                  </AppInputLayout>
                </div>
              )}

              <CommandEmpty>{dictionary['Data not found']}</CommandEmpty>
              <CommandGroup className="p-0">
                <List
                  height={filteredOptions.length ? listHeight : 0}
                  itemCount={filteredOptions.length}
                  itemSize={itemHeight}
                  width="100%"
                  className="bg-transparent"
                  initialScrollOffset={initialOffset}
                >
                  {({ index, style }) => {
                    const option = filteredOptions[index]
                    const isSelected = value === option.value
                    const onSelect = (currentValue: OptionValue) => {
                      const onClear = () => {
                        setOpen(false)
                        setSearchValue('')
                      }

                      if (currentValue === value) {
                        onClear()
                        return
                      }

                      setValue(currentValue)
                      onChange?.(currentValue)
                      onClear()
                    }

                    return (
                      <div style={style} key={option.value}>
                        <CommandItem value={option.value} onSelect={onSelect} className="px-0">
                          <ComboboxItemMockup isSelected={isSelected}>
                            {option.label}
                          </ComboboxItemMockup>
                        </CommandItem>
                      </div>
                    )
                  }}
                </List>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
)

AppComboboxWithInput.displayName = 'AppComboboxWithInput'

export default memo(AppComboboxWithInput, isEqual)
