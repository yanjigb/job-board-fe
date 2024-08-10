'use client'

import React, { memo, useCallback, useState } from 'react'
import isEqual from 'react-fast-compare'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import AppLink from '@/components/common/app-link'
import { Button } from '@/components/ui/button'

import RouteNames from '@/constants/routes'
import { useDictionary } from '@/providers/dictionary-provider'
import { setAuthenticationButtonTab } from '@/stores/server-action'

import NavMobile from './nav-mobile'
import UserLoggedIn from './user-logged-in'

interface IAuthenticationButtonsProps {
  authenticationButtonTab?: RequestCookie
}
const AuthenticationButtons = memo(function AuthenticationButtons({
  authenticationButtonTab,
}: IAuthenticationButtonsProps) {
  const { dictionary } = useDictionary()

  const lastTab = authenticationButtonTab?.value ?? ''
  const tabDefault =
    lastTab === RouteNames.SignIn || lastTab === RouteNames.SignUp ? lastTab : RouteNames.SignIn

  const [tab, setTab] = useState(tabDefault)

  const onSignIn = useCallback(() => {
    setTab(RouteNames.SignIn)
    setAuthenticationButtonTab(RouteNames.SignIn)
  }, [])

  const onSignUp = useCallback(() => {
    setTab(RouteNames.SignUp)
    setAuthenticationButtonTab(RouteNames.SignUp)
  }, [])

  return (
    <div className="hidden gap-[1.375rem] lg:flex">
      <AppLink href={RouteNames.SignIn}>
        <Button variant={tab === RouteNames.SignIn ? 'default' : 'ghost'} onClick={onSignIn}>
          {dictionary['Sign in']}
        </Button>
      </AppLink>

      <AppLink href={RouteNames.SignUp}>
        <Button variant={tab === RouteNames.SignUp ? 'default' : 'ghost'} onClick={onSignUp}>
          {dictionary['Sign up']}
        </Button>
      </AppLink>
    </div>
  )
}, isEqual)

interface IHeaderRightProps {
  authenticationButtonTab?: RequestCookie
}
function HeaderRight({ authenticationButtonTab }: IHeaderRightProps) {
  const [loggedIn] = React.useState(true)
  return (
    <div className="flex items-center">
      {loggedIn ? (
        <UserLoggedIn />
      ) : (
        <AuthenticationButtons authenticationButtonTab={authenticationButtonTab} />
      )}

      <NavMobile authenticationButtonTab={authenticationButtonTab} />
    </div>
  )
}

export default memo(HeaderRight, isEqual)
