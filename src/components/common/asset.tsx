import { memo } from 'react'
import isEqual from 'react-fast-compare'
import Image from 'next/image'

import { cn } from '@/utils/cn'

export enum AssetSymbol {
  USDT = 'usdt',
  BNB = 'bnb',
  ETH = 'eth',
  BTC = 'btc',
  MATIC = 'matic',
}

const ASSET_IMAGES: Record<AssetSymbol, string> = Object.values(AssetSymbol).reduce(
  (acc, symbol) => ({
    ...acc,
    [symbol]: `/images/coin/${symbol}.svg`,
  }),
  {} as Record<AssetSymbol, string>,
)

interface AssetProps {
  className?: string
  symbol?: AssetSymbol
  size?: number
  children?: React.ReactNode
  hiddenChildren?: boolean
}
const Asset = memo(function Asset({
  symbol,
  size = 24,
  children,
  hiddenChildren,
  className,
}: AssetProps) {
  const sizeStyles = `${size / 16}rem`
  const imageSrc = symbol ? ASSET_IMAGES[symbol] : undefined

  return (
    <span className={cn('flex items-center gap-2', className)}>
      {imageSrc && (
        <span style={{ width: sizeStyles, height: sizeStyles }}>
          <Image
            src={imageSrc}
            width={size}
            height={size}
            className="block h-full w-full"
            alt={symbol || ''}
          />
        </span>
      )}

      {!hiddenChildren && (
        <span className="label text-body/large/regular font-light">
          {children || symbol?.toUpperCase()}
        </span>
      )}
    </span>
  )
}, isEqual)

Asset.displayName = 'Asset'

export { Asset }
