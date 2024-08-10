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
import RouteNames from '@/constants/routes'
import { useDictionary } from '@/providers/dictionary-provider'

import ResetPasswordForm from '../reset-password-form'
import SignInOtpForm from '../sign-in-otp-form'

import { FORGOT_PASSWORD_FORM, formSchema } from './schema'

function ForgotPasswordForm() {
  const { dictionary } = useDictionary()

  const { value: isShowOtpStep, setTrue: setIsShowOtpStep } = useBoolean(false)
  const { value: isShowResetPassword, setTrue: setIsShowResetPassword } = useBoolean(false)

  const finalSchema = formSchema(dictionary)

  const form = useForm<yup.InferType<typeof finalSchema>>({
    resolver: yupResolver(finalSchema),
    defaultValues: FORGOT_PASSWORD_FORM,
  })

  const onSubmit = (values: yup.InferType<typeof finalSchema>) => {
    console.log(`🆘 src/pages/sign-in/index.tsx`); // eslint-disable-line
    console.log(values); // eslint-disable-line
    console.log('%c => value ', 'background: #0095FF; color: #fff'); // eslint-disable-line
    console.log(new Date()); // eslint-disable-line

    setIsShowOtpStep()
  }

  if (isShowResetPassword) return <ResetPasswordForm />
  if (isShowOtpStep) return <SignInOtpForm onComplete={setIsShowResetPassword} />

  return (
    <AuthenticationLayout
      title={dictionary['Forgot password']}
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[1.5625rem]">
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

          <Button type="submit" className="w-full">
            {dictionary.Next}
          </Button>
        </form>
      </Form>
    </AuthenticationLayout>
  )
}

export default memo(ForgotPasswordForm, isEqual)
