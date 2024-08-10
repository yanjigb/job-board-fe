'use client'

import { memo, useCallback, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import { Copy } from 'lucide-react'
import { useCopyToClipboard } from 'usehooks-ts'

import { cn } from '@/utils/cn'

interface IAppCopyProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
  copyValue?: string
  copyChildren?: boolean
}
const AppCopy = memo(function AppCopy({
  copyChildren = true,
  copyValue,
  className,
  children,
  ...rest
}: IAppCopyProps) {
  const [, setCopied] = useCopyToClipboard()

  const value = useMemo(
    () => (copyChildren ? children : copyValue),
    [children, copyChildren, copyValue],
  )

  const onCopy = useCallback(() => {
    if (!value) return
    setCopied(value as string)
  }, [value, setCopied])

  return (
    <span className={cn('flex items-center gap-3', className)} {...rest}>
      {children}

      {value && (
        <button type="button" aria-label="copy" onClick={onCopy}>
          <Copy size={16} className="icon text-text-dark" />
        </button>
      )}
    </span>
  )
}, isEqual)
AppCopy.displayName = 'AppCopy'

export { AppCopy }
