'use server'

import { cookies } from 'next/headers'

import RouteNames from '@/constants/routes'

import { StoreKeys } from './store-keys'

export async function setAuthenticationButtonTab(
  tab: typeof RouteNames.SignIn | typeof RouteNames.SignUp,
) {
  cookies().set(StoreKeys.AuthenticationButtonTab, tab, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 12 * 10), // 10 years
  })
}
