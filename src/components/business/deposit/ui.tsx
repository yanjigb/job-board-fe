import { memo, useMemo, useRef } from 'react'
import isEqual from 'react-fast-compare'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { PopoverClose } from '@radix-ui/react-popover'
import { Search } from 'lucide-react'
import { useResizeObserver } from 'usehooks-ts'

import {
  ComboboxItemMockup,
  ComboboxTriggerMockup,
} from '@/components/common/app-combobox/components'
import { WarningNotification } from '@/components/common/app-notification'
import { Asset, AssetSymbol } from '@/components/common/asset'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { useDictionary } from '@/providers/dictionary-provider'
import { cn } from '@/utils/cn'

interface IAssetItemProps {
  className?: string
  symbol: AssetSymbol
  onChange: (symbol: AssetSymbol) => void
}

const AssetItem = memo(function AssetItem({ symbol, className, onChange }: IAssetItemProps) {
  const handleChange = () => onChange(symbol)
  return (
    <PopoverClose asChild onClick={handleChange}>
      <span>
        <Asset
          size={20}
          symbol={symbol}
          className={cn(
            'inline-flex rounded-sm bg-another-10/20 px-3 py-2 [&_.label]:text-body/medium/medium [&_.label]:font-normal',
            className,
          )}
        />
      </span>
    </PopoverClose>
  )
}, isEqual)
AssetItem.displayName = 'AssetItem'

interface INetworkOptionProps {
  symbol: string
  name: string
  estimatedTime: string
  confirmations: number
  onChange: (symbol: string) => void
}
const NetworkOption = memo(function NetworkOption({
  symbol,
  name,
  estimatedTime,
  confirmations,
  onChange,
}: INetworkOptionProps) {
  const handleChange = () => onChange(symbol)
  const { dictionary } = useDictionary()
  return (
    <PopoverClose asChild onClick={handleChange}>
      <li>
        <ComboboxItemMockup className="flex justify-between gap-3 py-2 font-light">
          <div className="space-y-1">
            <p>{symbol}</p>
            <p>{name}</p>
          </div>
          <div className="space-y-1 text-right">
            <p>{estimatedTime}</p>
            <p>
              {confirmations} {dictionary.Confirmation}/s
            </p>
          </div>
        </ComboboxItemMockup>
      </li>
    </PopoverClose>
  )
}, isEqual)
NetworkOption.displayName = 'NetworkOption'

interface IAssetItemWithNameProps {
  symbol: AssetSymbol
  name: string
  onChange: (symbol: AssetSymbol) => void
}
const AssetItemWithName = memo(function AssetItemWithName({
  symbol,
  name,
  onChange,
}: IAssetItemWithNameProps) {
  const handleChange = () => onChange(symbol)
  return (
    <PopoverClose asChild onClick={handleChange}>
      <li>
        <ComboboxItemMockup className="px-4 py-3 font-light">
          <Asset
            symbol={symbol}
            className="[&_.label]:text-body/medium/regular [&_.label]:font-normal"
          />
          <span className="text-text-secondary">{name}</span>
        </ComboboxItemMockup>
      </li>
    </PopoverClose>
  )
}, isEqual)
AssetItemWithName.displayName = 'AssetItemWithName'

function FormFieldSelectCoin<T extends FieldValues>({ form }: { form: UseFormReturn<T> }) {
  const ref = useRef<HTMLDivElement>(null)
  const { width = 0 } = useResizeObserver({ ref })

  const { dictionary } = useDictionary()

  return (
    <FormField
      control={form.control}
      name={'coin' as Path<T>}
      render={({ field, fieldState }) => (
        <FormItem ref={ref}>
          <FormLabel>{dictionary['Select Coin']}</FormLabel>

          <Popover>
            <PopoverTrigger asChild>
              <div>
                <ComboboxTriggerMockup
                  customPrefix={!field.value && <Search size={16} className="text-text-primary" />}
                  className="w-full"
                  error={fieldState.error}
                >
                  {field.value ? (
                    <Asset
                      symbol={field.value as AssetSymbol}
                      size={16}
                      className="[&_.label]:text-body/medium/regular"
                    />
                  ) : (
                    <span className="text-text-placeholder">{dictionary['Search Coin']}</span>
                  )}
                </ComboboxTriggerMockup>
              </div>
            </PopoverTrigger>

            <PopoverContent style={{ width }} className="p-0 py-[0.5625rem]">
              <h4 className="px-4 py-2 text-body/small/regular font-light text-text-secondary">
                {dictionary['Search History']}
              </h4>

              <ul className="flex gap-3 px-4 py-3">
                {[AssetSymbol.USDT, AssetSymbol.BTC].map((item) => (
                  <AssetItem symbol={item} key={item} onChange={field.onChange} />
                ))}
              </ul>

              <h4 className="mt-4 px-4 py-2 text-body/small/regular font-light text-text-secondary">
                {dictionary.Trending}
              </h4>

              <ul className="flex gap-3 px-4 py-3">
                {[
                  AssetSymbol.USDT,
                  AssetSymbol.BTC,
                  AssetSymbol.ETH,
                  AssetSymbol.MATIC,
                  AssetSymbol.BNB,
                ].map((item) => (
                  <AssetItem symbol={item} key={item} onChange={field.onChange} />
                ))}
              </ul>

              <h4 className="mt-4 px-4 py-2 text-body/small/regular font-light text-text-secondary">
                {dictionary['Coin List']}
              </h4>

              <ul>
                {[
                  { symbol: AssetSymbol.USDT, name: 'TetherUS' },
                  { symbol: AssetSymbol.BTC, name: 'Bitcoin' },
                  { symbol: AssetSymbol.ETH, name: 'Ethereum' },
                  { symbol: AssetSymbol.BNB, name: 'BNB' },
                ].map((item) => (
                  <AssetItemWithName
                    key={item.symbol}
                    symbol={item.symbol}
                    name={item.name}
                    onChange={field.onChange}
                  />
                ))}
              </ul>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function FormFieldSelectNetwork<T extends FieldValues>({ form }: { form: UseFormReturn<T> }) {
  const { dictionary } = useDictionary()

  const ref = useRef<HTMLDivElement>(null)
  const { width = 0 } = useResizeObserver({ ref })

  const networkOptions = useMemo(
    () => [
      {
        symbol: 'TRX',
        name: 'Tron (TRC20)',
        estimatedTime: '≈ 2 mins',
        confirmations: 1,
      },
      {
        symbol: 'BSC',
        name: 'BNB Smart Chain (BEP20)',
        estimatedTime: '≈ 3 mins',
        confirmations: 15,
      },
      {
        symbol: 'ETH',
        name: 'Ethereum (ERC20)',
        estimatedTime: '≈ 4 mins',
        confirmations: 6,
      },
    ],
    [],
  )

  return (
    <FormField
      control={form.control}
      name={'network' as Path<T>}
      render={({ field, fieldState }) => {
        const selectedItem = networkOptions.find((item) => item.symbol === field.value)

        return (
          <FormItem>
            <FormLabel>{dictionary['Select Network']}</FormLabel>

            <Popover>
              <PopoverTrigger asChild>
                <div ref={ref}>
                  <ComboboxTriggerMockup className="w-full" error={fieldState.error}>
                    {selectedItem ? (
                      <p>
                        <span>{selectedItem.symbol}</span>
                        <span className="pl-1 text-text-primary">{selectedItem.name}</span>
                      </p>
                    ) : (
                      <span className="text-text-placeholder">{dictionary['Select network']}</span>
                    )}
                  </ComboboxTriggerMockup>
                </div>
              </PopoverTrigger>

              <PopoverContent style={{ width }} className="p-0 py-[0.9375rem]">
                <WarningNotification className="mx-4">
                  {
                    dictionary[
                      'Please note that only supported networks on Binance platform are shown, if you deposit via another network your assets may be lost.'
                    ]
                  }
                </WarningNotification>

                <ul className="mt-4 [&_p:nth-child(2)]:text-text-primary">
                  {networkOptions.map((item) => (
                    <NetworkOption
                      key={item.symbol}
                      symbol={item.symbol}
                      name={item.name}
                      estimatedTime={item.estimatedTime}
                      confirmations={item.confirmations}
                      onChange={field.onChange}
                    />
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export { AssetItemWithName, AssetItem, NetworkOption, FormFieldSelectCoin, FormFieldSelectNetwork }
