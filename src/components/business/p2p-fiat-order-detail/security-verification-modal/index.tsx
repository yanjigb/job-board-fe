import React, { ChangeEvent, memo, useCallback, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import AppInput from '@/components/common/app-input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { OTP_LENGTH } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'

import { InferTypeSecurityVerificationFormSchema, SecurityVerificationFormSchema } from '../schema'

interface Props {
  isOpen: boolean
  setValueOpen: (value: boolean) => void
  onSubmit: (values: InferTypeSecurityVerificationFormSchema) => Promise<void>
}
function SecurityVerificationModal({ isOpen, setValueOpen, onSubmit }: Props) {
  const { dictionary } = useDictionary()

  const form = useForm({
    resolver: yupResolver(SecurityVerificationFormSchema),
    defaultValues: {
      securityCode: '',
    },
  })

  const handleSubmit = useCallback(
    async (values: InferTypeSecurityVerificationFormSchema) => {
      await onSubmit(values)
    },
    [onSubmit],
  )

  useEffect(() => {
    return () => {
      form.reset()
    }
  }, [form])

  return (
    <Dialog open={isOpen} onOpenChange={setValueOpen}>
      <DialogContent>
        <DialogHeader>{dictionary['Security verification']}</DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="py-6">
              <FormField
                control={form.control}
                name="securityCode"
                render={({ field }) => {
                  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length > OTP_LENGTH) return
                    field.onChange(e)
                  }

                  return (
                    <FormItem>
                      <FormLabel>{dictionary['2FA Google Authenticator']}</FormLabel>
                      <FormControl>
                        <AppInput
                          {...field}
                          type="number"
                          onChange={onChange}
                          placeholder={dictionary['Enter Authenticator Code']}
                          inputSuffix={
                            <Button size="none" variant="none" asChild className="cursor-pointer">
                              <span className="!font-light text-secondary">
                                {dictionary['Get code']}
                              </span>
                            </Button>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>

            <DialogFooter>
              <FormField
                control={form.control}
                name="securityCode"
                render={() => <Button className="w-full">{dictionary.Confirm}</Button>}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(SecurityVerificationModal, isEqual)
