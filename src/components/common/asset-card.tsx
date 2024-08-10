'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { ChevronDown, EyeOff } from 'lucide-react'

import { useDictionary } from '@/providers/dictionary-provider'
import { formatCurrency } from '@/utils/format-currency'

import { Button } from '../ui/button'

interface IAssetCardContentProps {
  assetDefault: string
}
const AssetCardContent = memo(function AssetCardContent({ assetDefault }: IAssetCardContentProps) {
  const { dictionary } = useDictionary()
  return (
    <div className="space-y-[0.625rem]">
      <p className="flex items-center gap-2 text-body/extra/small/regular text-text-primary">
        <span>{dictionary['Estimated Balance']}</span>

        <Button variant="none" size="none" asChild aria-label="click to hide">
          <EyeOff size={16} />
        </Button>
      </p>

      <div className="flex flex-wrap items-baseline gap-1">
        <span className="flex items-baseline gap-1">
          <span className="grid grid-cols-1">
            <span className="overflow-hidden text-ellipsis text-heading-6">
              {formatCurrency({
                value: 0,
                options: {
                  minimumFractionDigits: 2,
                },
              })}
            </span>
          </span>
          <span className="flex items-center text-body/extra/small/regular">
            {assetDefault} <ChevronDown size={16} />
          </span>
        </span>

        <span className="flex text-body/small/regular text-text-primary">
          <span>≈&nbsp;</span>
          <span className="grid grid-cols-1">
            <span className="overflow-hidden text-ellipsis">0$</span>
          </span>
        </span>
      </div>
    </div>
  )
}, isEqual)
AssetCardContent.displayName = 'AssetCardContent'

export { AssetCardContent }
