import React from 'react'
import isEqual from 'react-fast-compare'

import AppIcon from './app-icon'

function AppLoading() {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white delay-1000 duration-1000">
      <AppIcon
        src="/svg/circle-loading.svg"
        className="h-10 w-10 animate-spin text-primary md:h-20 md:w-20"
      />
    </div>
  )
}

export default React.memo(AppLoading, isEqual)
