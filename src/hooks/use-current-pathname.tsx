'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

function useCurrentPathname() {
  const pathname = usePathname()
  const currentPathname = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, lang, ...rest] = pathname.split('/')
    return `/${rest.join('/')}`
  }, [pathname])

  return currentPathname
}

export default useCurrentPathname
