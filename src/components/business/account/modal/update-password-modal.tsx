'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import PasswordInput from '@/components/common/password-input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { useDictionary } from '@/providers/dictionary-provider'

import { FormUpdatePasswordSchema } from '../schema'

function UpdatePasswordModal() {
  const { dictionary } = useDictionary()

  const form = useForm({
    resolver: yupResolver(FormUpdatePasswordSchema(dictionary)),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    console.log('🚀 ~ onSubmit ~ values:', values)
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="min-w-20">{dictionary.Edit}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>{dictionary['Change password']}</DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className="w-full space-y-5 py-6">
              <FormField
                name="newPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary['New password']}</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} placeholder={dictionary['Enter password']} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="confirmNewPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary['Confirm new password']}</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} placeholder={dictionary['Confirm Password']} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose>
                <Button className="min-w-[200px]" variant="ghost" type="button">
                  {dictionary.Cancel}
                </Button>
              </DialogClose>
              <Button className="min-w-[200px]">{dictionary.Save}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(UpdatePasswordModal, isEqual)
