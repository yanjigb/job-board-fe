'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { AppAvatar } from '@/components/common/app-avatar'
import AppInput from '@/components/common/app-input'
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

import { AVATAR_DEFAULT } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'

import { FormUpdateProfileSchema } from '../schema'

function UpdateProfileModal() {
  const { dictionary } = useDictionary()

  const form = useForm({
    resolver: yupResolver(FormUpdateProfileSchema),
    defaultValues: {
      displayName: '',
      username: '',
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
        <DialogHeader>{dictionary['Change profile']}</DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className="w-full space-y-5 py-6">
              <div className="flex-center">
                <AppAvatar
                  fallback="Thomas Anree"
                  url={AVATAR_DEFAULT}
                  className="size-[6.25rem]"
                />
              </div>

              <FormField
                name="displayName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary['Display name']}</FormLabel>
                    <FormControl>
                      <AppInput {...field} type="text" placeholder={dictionary['Enter Username']} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.Username}</FormLabel>
                    <FormControl>
                      <AppInput {...field} type="text" placeholder={dictionary['Enter Username']} />
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

export default memo(UpdateProfileModal, isEqual)
