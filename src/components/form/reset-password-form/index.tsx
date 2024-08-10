/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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

import AuthenticationLayout from '@/components/layout/authentication/layout'
import { useDictionary } from '@/providers/dictionary-provider'

import { formSchema, RESET_PASSWORD_FORM } from './schema'

function ResetPasswordForm() {
  const { dictionary } = useDictionary()

  const finalSchema = formSchema(dictionary)

  const form = useForm<yup.InferType<typeof finalSchema>>({
    resolver: yupResolver(finalSchema),
    defaultValues: RESET_PASSWORD_FORM,
  })

  const onSubmit = (values: yup.InferType<typeof finalSchema>) => {
    console.log(`🆘 src/pages/sign-in/index.tsx`); // eslint-disable-line
    console.log(values); // eslint-disable-line
    console.log('%c => value ', 'background: #0095FF; color: #fff'); // eslint-disable-line
    console.log(new Date()); // eslint-disable-line
  }

  return (
    <AuthenticationLayout title={dictionary['Reset password']}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary['New password']}</FormLabel>
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
                <FormLabel>{dictionary['Confirm new password']}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder={dictionary['Confirm Password']} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {dictionary['Log in']}
          </Button>
        </form>
      </Form>
    </AuthenticationLayout>
  )
}

export default memo(ResetPasswordForm, isEqual)
