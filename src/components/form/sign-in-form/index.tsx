/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useBoolean } from 'usehooks-ts'
import * as yup from 'yup'

import AppLink from '@/components/common/app-link'
import PasswordInput from '@/components/common/password-input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import AuthenticationLayout from '@/components/layout/authentication/layout'
import { EMPTY_FUNC } from '@/constants'
import RouteNames from '@/constants/routes'
import { useDictionary } from '@/providers/dictionary-provider'

import SignInOtpForm from '../sign-in-otp-form'

import { DEFAULT_SIGN_IN_FORM, formSchema } from './schema'

function SignInForm() {
  const { dictionary } = useDictionary()

  const { value: isFinished, setTrue: setIsFinished } = useBoolean(false)

  const finalSchema = formSchema(dictionary)

  const form = useForm<yup.InferType<typeof finalSchema>>({
    resolver: yupResolver(finalSchema),
    defaultValues: DEFAULT_SIGN_IN_FORM,
  })

  const onSubmit = (values: yup.InferType<typeof finalSchema>) => {
    console.log(`🆘 src/pages/sign-in/index.tsx`) // eslint-disable-line
    console.log(values) // eslint-disable-line
    console.log('%c => value ', 'background: #0095FF; color: #fff') // eslint-disable-line
    console.log(new Date()) // eslint-disable-line

    setIsFinished()
  }

  if (isFinished) return <SignInOtpForm onComplete={EMPTY_FUNC} />
  return (
    <AuthenticationLayout
      title={dictionary['Buy and Sell With Your Preferred Payment Method']}
      description={
        <>
          {dictionary["If you don't have an account, please"]}
          <span className="text-secondary">&nbsp;{dictionary.Register}!</span>
        </>
      }
      className="space-y-[1.5625rem]"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:flex-row">
        <Button
          className="gap-2 rounded-sm border border-solid border-another-4 bg-white px-1 py-1 text-dark-background hover:bg-white/90"
          rounded="sm"
        >
          <Image width={28} height={28} src="/images/google.svg" alt="icon-google" />
          {dictionary['Sign in with Google']}
        </Button>

        <Button
          className="gap-2 rounded-sm border border-solid border-another-4 bg-white px-1 py-1 text-dark-background hover:bg-white/90"
          rounded="sm"
        >
          <Image width={28} height={28} src="/images/apple.svg" alt="icon-apple" />
          {dictionary['Sign in with Apple']}
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex-1 border-t border-solid border-stroke" />
        <span className="text-text-primary">{dictionary['or continue with']}</span>
        <span className="flex-1 border-t border-solid border-stroke" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary['Email/Username/Phone']}</FormLabel>
                <FormControl>
                  <Input placeholder={dictionary['Enter your Email/Username/Phone']} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <PasswordInput placeholder={dictionary['Enter password']} {...field} />
                <FormControl />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {dictionary['Log in']}
          </Button>
        </form>
      </Form>

      <p className="text-center">
        <AppLink href={RouteNames.ForgotPassword} className="font-light text-secondary">
          {dictionary['Forgot password']}
        </AppLink>
      </p>
    </AuthenticationLayout>
  )
}

export default memo(SignInForm, isEqual)
