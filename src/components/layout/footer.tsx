'use client'

import { memo } from 'react'
import isEqual from 'react-fast-compare'

import RouteNames from '@/constants/routes'
import useCurrentPathname from '@/hooks/use-current-pathname'
import { useDictionary } from '@/providers/dictionary-provider'
import { cnWithClxs } from '@/utils/cn'

function Footer({ className, acceptHidden }: { className?: string; acceptHidden?: boolean }) {
  const { dictionary } = useDictionary()
  const currentPathname = useCurrentPathname()
  const isDashboard = currentPathname.includes(RouteNames.Dashboard)

  if (isDashboard && acceptHidden) return null
  return (
    <footer
      className={cnWithClxs(
        'text-body/small/regular font-normal',
        'py-[1.4375rem] text-center text-text-placeholder',
        className,
      )}
    >
      {dictionary['© 2024 P2P. All Rights Reserved']}
    </footer>
  )
}

export default memo(Footer, isEqual)
