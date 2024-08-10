import React, { memo, useCallback, useState } from 'react'
import isEqual from 'react-fast-compare'
import { Menu } from 'lucide-react'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { useBoolean } from 'usehooks-ts'

import { AppDrawerContent } from '@/components/common/app-drawer'
import AppLink from '@/components/common/app-link'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'

import RouteNames from '@/constants/routes'
import { useDictionary } from '@/providers/dictionary-provider'
import { setAuthenticationButtonTab } from '@/stores/server-action'

import NavDesktop from './nav-desktop'
import { User, UserMenus } from './nav-user'

interface IAuthenticationButtonsProps {
  authenticationButtonTab?: RequestCookie
  setCloseDrawer: () => void
}
const AuthenticationButtons = memo(function AuthenticationButtons({
  authenticationButtonTab,
  setCloseDrawer,
}: IAuthenticationButtonsProps) {
  const { dictionary } = useDictionary()

  const lastTab = authenticationButtonTab?.value ?? ''
  const tabDefault =
    lastTab === RouteNames.SignIn || lastTab === RouteNames.SignUp ? lastTab : RouteNames.SignIn

  const [tab, setTab] = useState(tabDefault)

  const onSignIn = useCallback(() => {
    setTab(RouteNames.SignIn)
    setAuthenticationButtonTab(RouteNames.SignIn)
    setCloseDrawer()
  }, [setCloseDrawer])

  const onSignUp = useCallback(() => {
    setTab(RouteNames.SignUp)
    setAuthenticationButtonTab(RouteNames.SignUp)
    setCloseDrawer()
  }, [setCloseDrawer])

  return (
    <div className="order-1 space-y-3">
      <AppLink href={RouteNames.SignIn} className="block">
        <Button
          className="w-full"
          variant={tab === RouteNames.SignIn ? 'default' : 'ghost'}
          onClick={onSignIn}
        >
          {dictionary['Sign in']}
        </Button>
      </AppLink>

      <AppLink href={RouteNames.SignUp} className="block" onClick={onSignUp}>
        <Button className="w-full" variant={tab === RouteNames.SignUp ? 'default' : 'ghost'}>
          {dictionary['Sign up']}
        </Button>
      </AppLink>
    </div>
  )
}, isEqual)

interface INavMobileProps {
  authenticationButtonTab?: RequestCookie
}
function NavMobile({ authenticationButtonTab }: INavMobileProps) {
  const [loggedIn] = React.useState(true)

  const {
    value: isOpenDrawer,
    setTrue: setOpenDrawer,
    setValue: setValueDrawer,
    setFalse: setCloseDrawer,
  } = useBoolean(false)
  return (
    <Drawer direction="right" open={isOpenDrawer} onOpenChange={setValueDrawer}>
      <DrawerTrigger asChild>
        <Button
          className="ml-[9px] aspect-square
         min-w-11 p-3 lg:hidden"
          aria-label="menu"
          onClick={setOpenDrawer}
        >
          <Menu strokeWidth={1} size={20} />
        </Button>
      </DrawerTrigger>

      <AppDrawerContent type="sidebar">
        <div className="flex h-full flex-col gap-3">
          <NavDesktop className="order-2 flex flex-col items-start" onClick={setCloseDrawer} />

          {loggedIn ? (
            <div className="order-3 space-y-3 border-t border-solid border-stroke pt-3">
              <User className="flex [&_.chevron]:hidden" />
              <UserMenus onClose={setCloseDrawer} />
            </div>
          ) : (
            <AuthenticationButtons
              setCloseDrawer={setCloseDrawer}
              authenticationButtonTab={authenticationButtonTab}
            />
          )}
        </div>
      </AppDrawerContent>
    </Drawer>
  )
}

export default memo(NavMobile, isEqual)
