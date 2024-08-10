'use client'

import { memo, PropsWithChildren } from 'react'
import isEqual from 'react-fast-compare'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

import { Toaster } from '@/components/ui/sonner'

import { extendTheme } from '@/theme/extend-theme'

function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color={extendTheme.colors.primary.DEFAULT}
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Toaster />
    </>
  )
}

export default memo(ThemeProvider, isEqual)
