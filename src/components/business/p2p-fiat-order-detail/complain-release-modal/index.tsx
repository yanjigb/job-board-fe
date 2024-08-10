import React, { memo, PropsWithChildren, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useBoolean } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { useDictionary } from '@/providers/dictionary-provider'

import { ComplainReleaseFormSchema, InferTypeSecurityVerificationFormSchema } from '../schema'
import SecurityVerificationModal from '../security-verification-modal'

function ComplainReleaseModal({ children }: PropsWithChildren) {
  const { dictionary } = useDictionary()

  const form = useForm({
    resolver: yupResolver(ComplainReleaseFormSchema),
    defaultValues: {
      reason: '',
    },
  })

  const {
    value: isOpenSecurityVerificationModal,
    setValue: setValueSecurityVerificationModal,
    setTrue: setOpenSecurityVerificationModal,
    setFalse: setCloseSecurityVerificationModal,
  } = useBoolean(false)

  const onSubmitSecurity = useCallback(
    async (values: InferTypeSecurityVerificationFormSchema) => {
      console.log('🚀 ~ onSubmitSecurity ~ values:', values)
      setCloseSecurityVerificationModal()
    },
    [setCloseSecurityVerificationModal],
  )

  const onSubmitComplainRelease = useCallback(() => {
    console.log('🚀 ~ onSubmitComplainRelease ~ values:', form.getValues())
    setOpenSecurityVerificationModal()
  }, [form, setOpenSecurityVerificationModal])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>{dictionary['Complain release']}</DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitComplainRelease)}>
              <div className="space-y-5 py-6">
                <div>
                  <h2 className="text-heading-6">{dictionary['Lock transactions']}</h2>
                  <p className="mt-1 text-text-primary">
                    {
                      dictionary[
                        "You haven't received the money yet. Be sure to confirm receipt of the."
                      ]
                    }
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} value={field.value} asChild>
                      <ul>
                        {[
                          {
                            label: dictionary["I haven't received the money yet"],
                            value: "I haven't received the money yet",
                          },
                        ].map((item) => {
                          return (
                            <li key={item.value}>
                              <FormLabel htmlFor={item.value}>
                                <div className="flex min-w-[12.5rem] items-center gap-2">
                                  <FormControl>
                                    <RadioGroupItem
                                      value={item.value}
                                      id={item.value}
                                      formValue={field.value}
                                    />
                                  </FormControl>

                                  <span>{item.label}</span>
                                </div>
                              </FormLabel>
                            </li>
                          )
                        })}
                      </ul>
                    </RadioGroup>
                  )}
                />
              </div>

              <DialogFooter>
                <DialogClose>
                  <Button variant="ghost" className="min-w-[12.5rem]">
                    {dictionary.Cancel}
                  </Button>
                </DialogClose>
                <Button className="min-w-[12.5rem]" disabled={!form.getValues('reason')}>
                  {dictionary.Confirm}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <SecurityVerificationModal
        isOpen={isOpenSecurityVerificationModal}
        onSubmit={onSubmitSecurity}
        setValueOpen={setValueSecurityVerificationModal}
      />
    </>
  )
}

export default memo(ComplainReleaseModal, isEqual)
