'use client'

import { memo, ReactNode } from 'react'
import isEqual from 'react-fast-compare'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

import { extendTheme } from '@/theme/extend-theme'

interface Props {
  children: ReactNode
}

function MainProviders({ children }: Props) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color={extendTheme.colors.accent.DEFAULT}
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}

export default memo(MainProviders, isEqual)
