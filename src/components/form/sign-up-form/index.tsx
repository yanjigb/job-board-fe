/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useBoolean } from 'usehooks-ts'
import * as yup from 'yup'

import AppLink from '@/components/common/app-link'
import PasswordInput from '@/components/common/password-input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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

import { DEFAULT_SIGN_UP_FORM, formSchema } from './schema'

function SignUpForm() {
  const { dictionary } = useDictionary()

  const finalSchema = formSchema(dictionary)

  const form = useForm<yup.InferType<typeof finalSchema>>({
    resolver: yupResolver(finalSchema),
    defaultValues: DEFAULT_SIGN_UP_FORM,
  })

  const { value: isFinished, setTrue: setIsFinished } = useBoolean(false)
  const { value: isCheckedTerm, toggle: toggleIsCheckedTerm } = useBoolean(false)

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
      title={dictionary['Create an account']}
      description={
        <>
          {dictionary['Already have an account?']}
          <AppLink href={RouteNames.SignIn} className="text-primary">
            &nbsp;{dictionary['Sign in']}!
          </AppLink>
        </>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary.Username}</FormLabel>
                <FormControl>
                  <Input placeholder={dictionary['Enter Username']} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary.Email}</FormLabel>
                <FormControl>
                  <Input placeholder={dictionary['Enter Email']} {...field} />
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
                <FormLabel>{dictionary.Password}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder={dictionary['Enter Password']} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary['Confirm Password']}</FormLabel>
                <PasswordInput placeholder={dictionary['Confirm Password']} {...field} />
                <FormControl />
                <FormMessage />
              </FormItem>
            )}
          />

          <label htmlFor="terms" className="flex items-center gap-2">
            <Checkbox id="terms" onClick={toggleIsCheckedTerm} checked={isCheckedTerm} />

            <span className="font-normal">
              {dictionary["I accept P2P's"]}&nbsp;
              <AppLink href={RouteNames.Term} className="font-medium text-primary">
                {dictionary['Terms of Service and Privacy Policy.']}
              </AppLink>
            </span>
          </label>

          <Button type="submit" className="w-full">
            {dictionary['Log in']}
          </Button>
        </form>
      </Form>
    </AuthenticationLayout>
  )
}

export default memo(SignUpForm, isEqual)
