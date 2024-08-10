import React, { memo, PropsWithChildren } from 'react'
import isEqual from 'react-fast-compare'

import SideBar from '@/components/layout/sidebar'

function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <section className="relative flex flex-1 flex-col">
      <div className="container flex h-full flex-1 flex-col px-0">
        <div className="flex max-w-[88.875rem] flex-1">
          <div className="hidden min-w-[17.5rem] shadow-side-bar lg:flex design_:shadow-none">
            <SideBar />
          </div>

          <div className="flex flex-1 flex-col justify-between">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default memo(SidebarLayout, isEqual)
