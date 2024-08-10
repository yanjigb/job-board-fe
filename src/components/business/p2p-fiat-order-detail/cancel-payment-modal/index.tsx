import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { useDictionary } from '@/providers/dictionary-provider'

interface Props {
  children: React.ReactNode
}
function CancelPaymentModal({ children }: Props) {
  const { dictionary } = useDictionary()

  const FormSchema = yup.object({
    cancelType: yup.string(),
    term: yup.boolean().oneOf([true], '').required(''),
  })

  const form = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      cancelType: '',
      term: false,
    },
  })

  const onSubmit = useCallback((values: yup.InferType<typeof FormSchema>) => {
    console.log(values)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>{dictionary['Cancel Trading']}</DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 py-6">
              <h3 className="font-normal">{dictionary['Why did you cancel the order?']}</h3>

              <FormField
                control={form.control}
                name="cancelType"
                render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} className="gap-4" value={field.value}>
                    {[
                      { label: dictionary['I do not want to trade anymore'], value: 'Hello' },
                      {
                        label:
                          dictionary[
                            "I do not meet the requirements of the advertiser's trading terms and condition"
                          ],
                        value: 'Hello1',
                      },
                      {
                        label:
                          dictionary[
                            'There is technical or network error with the payment platform'
                          ],
                        value: 'Hello2',
                      },
                      {
                        label: dictionary["I have not paid but clicked 'Transferred'"],
                        value: 'Hello3',
                      },
                      {
                        label: dictionary['Other reasons'],
                        value: 'Hello4',
                      },
                    ].map((item) => (
                      <FormItem key={item.label} className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={item.value} formValue={field.value} />
                        </FormControl>
                        <FormLabel className="m-0 font-light">{item.label}</FormLabel>
                      </FormItem>
                    ))}

                    <FormMessage />
                  </RadioGroup>
                )}
              />

              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <Label className="flex items-center gap-2 font-light" htmlFor="term">
                      <Checkbox id="term" checked={field.value} onCheckedChange={field.onChange} />
                      <span>
                        {dictionary['I have read and agreed to']}&nbsp;
                        <Link className="text-secondary" href="/##">
                          {dictionary['P2P Service Agreement']}
                        </Link>
                      </span>
                    </Label>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={!form.getValues('cancelType') || !form.getValues('term')}
              >
                OK
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CancelPaymentModal
