import React, { memo, PropsWithChildren } from 'react'
import isEqual from 'react-fast-compare'

const TextOverflow = memo(function TextOverflow({ children }: PropsWithChildren) {
  return (
    <span className="grid grid-cols-1 whitespace-nowrap">
      <span className="overflow-hidden text-ellipsis">{children}</span>
    </span>
  )
}, isEqual)
TextOverflow.displayName = 'TextOverflow'

const TextBreak = memo(function TextBreak({ children }: PropsWithChildren) {
  return (
    <span className="grid grid-cols-1">
      <span className="break-words">{children}</span>
    </span>
  )
}, isEqual)
TextBreak.displayName = 'TextBreak'

export { TextOverflow, TextBreak }
