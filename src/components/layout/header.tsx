import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import AppLink from '@/components/common/app-link'

import AppLogo from '../common/app-logo'

import HeaderRight from './header/header-right'
import NavDesktop from './header/nav-desktop'

interface IHeaderProps {
  authenticationButtonTab?: RequestCookie
}

async function Header({ authenticationButtonTab }: IHeaderProps) {
  return (
    <header className="border-b border-dark-3 pb-[0.9375rem] pt-4">
      <div className="container flex items-center justify-between gap-8">
        <div className="flex items-center justify-between">
          <div className="lg:w-[17.5rem] design:w-[calc(17.5rem-2.4375rem)]">
            <AppLink href="/">
              <AppLogo />
            </AppLink>
          </div>

          <NavDesktop />
        </div>

        <HeaderRight authenticationButtonTab={authenticationButtonTab} />
      </div>
    </header>
  )
}

export default memo(Header, isEqual)
