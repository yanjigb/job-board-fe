import React, { memo, PropsWithChildren, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useBoolean } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormField } from '@/components/ui/form'
import { Label } from '@/components/ui/label'

import { useDictionary } from '@/providers/dictionary-provider'

import { InferTypeSecurityVerificationFormSchema, ReceivedMoneyFormSchema } from '../schema'
import SecurityVerificationModal from '../security-verification-modal'

function ReceivedMoneyModal({ children }: PropsWithChildren) {
  const { dictionary } = useDictionary()

  const form = useForm({
    resolver: yupResolver(ReceivedMoneyFormSchema),
    defaultValues: {
      accepted: [],
    },
  })

  const data = React.useMemo(
    () => [
      {
        label: dictionary['I received %amount% from buyer.'].replace('%amount%', '$1,008.00'),
        value: 'received',
      },
      {
        label: dictionary['I checked that the payment account came from %name%'].replace(
          '%name%',
          'Jonathan Higgins.',
        ),
        value: 'checked',
      },
      {
        label: dictionary['I agree to unlock crypto currency for buyer.'],
        value: 'agreed',
      },
    ],
    [dictionary],
  )

  const {
    value: isOpenSecurityVerificationModal,
    setValue: setValueOpenSecurityVerificationModal,
    setTrue: setOpenSecurityVerificationModal,
    setFalse: setCloseSecurityVerificationModal,
  } = useBoolean(false)

  const {
    value: isOpenReceivedMoneyModal,
    setValue: setValueOpenReceivedMoneyModal,
    setFalse: setCloseReceivedMoneyModal,
  } = useBoolean(false)

  const onSecurityVerificationSubmit = useCallback(
    async (values: InferTypeSecurityVerificationFormSchema) => {
      console.log('🚀 ~ values:', values)
      setCloseSecurityVerificationModal()
      setCloseReceivedMoneyModal()
    },
    [setCloseReceivedMoneyModal, setCloseSecurityVerificationModal],
  )

  return (
    <>
      <Dialog open={isOpenReceivedMoneyModal} onOpenChange={setValueOpenReceivedMoneyModal}>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>{dictionary['Check the safety of assets']}</DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(setOpenSecurityVerificationModal)}>
              <FormField
                control={form.control}
                name="accepted"
                render={({ field }) => (
                  <div>
                    <ul className="space-y-5 py-6">
                      {data.map((item) => {
                        const onCheckedChange = (checked: boolean) => {
                          const acceptedClone = [...field.value]
                          if (checked) {
                            acceptedClone.push(item.value)
                          } else {
                            acceptedClone.splice(field.value.indexOf(item.value), 1)
                          }

                          field.onChange(acceptedClone)
                        }
                        return (
                          <Label className="flex items-center gap-2" key={item.value}>
                            <Checkbox
                              onCheckedChange={onCheckedChange}
                              defaultChecked={field.value.includes(item.value)}
                            />
                            <span>{item.label}.</span>
                          </Label>
                        )
                      })}
                    </ul>

                    <DialogFooter>
                      <Button disabled={field.value.length !== data.length} className="w-full">
                        {dictionary['Unlock confirmation']}
                      </Button>
                    </DialogFooter>
                  </div>
                )}
              />
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <SecurityVerificationModal
        isOpen={isOpenSecurityVerificationModal}
        setValueOpen={setValueOpenSecurityVerificationModal}
        onSubmit={onSecurityVerificationSubmit}
      />
    </>
  )
}

export default memo(ReceivedMoneyModal, isEqual)
