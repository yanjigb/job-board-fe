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
import { FieldError } from 'react-hook-form'
import { FixedSizeList as List } from 'react-window'
import { PopoverContentProps } from '@radix-ui/react-popover'
import { LucideProps, Search } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { InputRaw } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { useDictionary } from '@/providers/dictionary-provider'
import { OptionRequired, OptionValue } from '@/types/common'
import { cn } from '@/utils/cn'

import { ComboboxItemMockup, ComboboxTriggerMockup } from './components'

interface IAppComboboxForwardProps extends Omit<PopoverContentProps, 'onChange'> {
  options: OptionRequired[]
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  iconPrefix?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  customPrefix?: ReactNode
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
  hiddenChevron?: boolean
  hiddenSearch?: boolean
  modal?: boolean
  error?: FieldError
}

const itemHeight = 48
const paddingYOuterItem = 16
const paddingYList = 16
const heightContainer = 300
const listHeight = heightContainer - paddingYList - itemHeight - paddingYOuterItem

const AppComboboxForward = forwardRef<HTMLButtonElement | null, IAppComboboxForwardProps>(
  ({
    modal,
    hiddenSearch,
    options,
    value: defaultValue,
    onChange,
    placeholder,
    iconPrefix: IconPrefix,
    customPrefix,
    triggerClassName,
    contentClassName,
    itemClassName,
    hiddenChevron,
    error,
    ...props
  }) => {
    const { dictionary } = useDictionary()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(defaultValue)

    const [searchValue, setSearchValue] = useState('')
    const [popoverWidth, setPopoverWidth] = useState(0)

    const selectRef = useRef<HTMLButtonElement | null>(null)

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
        const offsetHeight = option * itemHeight
        const alreadyInView = offsetHeight <= listHeight
        setInitialOffset(alreadyInView ? 0 : offsetHeight)
      }
    }, [options, value])

    useEffect(() => {
      if (selectRef.current) {
        setPopoverWidth(selectRef.current.clientWidth)
      }
    }, [])

    return (
      <Popover open={open} onOpenChange={onOpenChange} modal={modal}>
        <PopoverTrigger asChild>
          <ComboboxTriggerMockup
            ref={selectRef}
            aria-expanded={open}
            className={triggerClassName}
            hiddenChevron={hiddenChevron}
            iconPrefix={IconPrefix}
            customPrefix={customPrefix}
            error={error}
          >
            {value ? options.find((option) => option.value === value)?.label : placeholder}
          </ComboboxTriggerMockup>
        </PopoverTrigger>

        <PopoverContent
          className={cn('p-0', contentClassName)}
          style={popoverContentStyles}
          align="start"
          {...props}
        >
          <Command>
            <CommandList>
              {!hiddenSearch && (
                <div className="relative flex items-center px-4 py-2">
                  <span className="absolute left-8 top-1/2 -translate-y-1/2">
                    <Search size={16} strokeWidth={1} />
                  </span>

                  <InputRaw
                    className="pl-[2.625rem]"
                    onChange={onSearchChange}
                    placeholder="Search"
                    tabIndex={-1}
                  />
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
                        <CommandItem value={option.value} onSelect={onSelect} className="p-0">
                          <ComboboxItemMockup isSelected={isSelected} className={itemClassName}>
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

AppComboboxForward.displayName = 'AppCombobox'
const AppCombobox = memo(AppComboboxForward, isEqual)

export { AppCombobox }
