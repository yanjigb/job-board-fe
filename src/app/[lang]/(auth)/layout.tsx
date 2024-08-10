import React, { memo, PropsWithChildren } from 'react'
import isEqual from 'react-fast-compare'

import Background from '@/components/common/background'

function AuthenticationLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Background />

      {children}
    </>
  )
}

export default memo(AuthenticationLayout, isEqual)
