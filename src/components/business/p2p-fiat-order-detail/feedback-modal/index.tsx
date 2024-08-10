import React, { memo, PropsWithChildren, useRef } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { useDictionary } from '@/providers/dictionary-provider'
import { cn } from '@/utils/cn'

function FeedbackModal({ children }: PropsWithChildren) {
  const { dictionary } = useDictionary()

  const option = useRef({
    Negative: 'Negative',
    Positive: 'Positive',
  }).current
  const [currentOption, setCurrentOption] = React.useState('')

  const form = useForm({
    defaultValues: {
      message: '',
    },
  })

  const onclickPositive = () => setCurrentOption(option.Positive)
  const onclickNegative = () => setCurrentOption(option.Negative)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[calc(24.625rem+1.5rem)]">
        <DialogHeader>{dictionary.Feedback}</DialogHeader>
        <div className="py-6">
          <h2 className="mb-5">{dictionary['Please choose your rating']}</h2>

          <div className="flex justify-center gap-10 py-4">
            <div>
              <Button
                asChild
                variant="none"
                size="none"
                className={cn(
                  'flex-center block size-[6.25rem] cursor-pointer overflow-hidden rounded-full',
                  'bg-success/10 text-success hover:bg-success hover:text-dark-background',
                  currentOption === option.Positive && 'bg-success text-dark-background',
                )}
                onClick={onclickPositive}
              >
                <span>
                  <ThumbsUp color="currentColor" size={50} />
                </span>
              </Button>

              <span
                className={cn(
                  'mt-2 block text-center',
                  currentOption === option.Positive
                    ? 'text-text-dark'
                    : 'text-text-primaryTextColor',
                  !currentOption && 'text-text-primary',
                )}
              >
                {dictionary.Positive}
              </span>
            </div>

            <div>
              <Button
                asChild
                variant="none"
                size="none"
                className={cn(
                  'flex-center block size-[6.25rem] cursor-pointer overflow-hidden rounded-full',
                  'bg-error/10 text-error hover:bg-error hover:text-text-dark',
                  currentOption === option.Negative && 'bg-error/100 text-text-dark',
                )}
                onClick={onclickNegative}
              >
                <span>
                  <ThumbsDown color="currentColor" size={50} />
                </span>
              </Button>

              <span
                className={cn(
                  'mt-2 block text-center',
                  currentOption === option.Negative
                    ? 'text-text-dark'
                    : 'text-text-primaryTextColor',
                  !currentOption && 'text-text-primary',
                )}
              >
                {dictionary.Negative}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <Form {...form}>
              <form>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-[0.625rem]">
                      <FormLabel>{dictionary['Description (Optional)']}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={dictionary['Please enter']}
                          id="message-2"
                          maxLength={50}
                          className="h-[9.5rem] resize-none"
                        />
                      </FormControl>
                      <FormDescription className="!mt-[0.625rem] text-right">
                        {field.value.length}/50
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="w-full">
              {dictionary.Cancel}
            </Button>
          </DialogClose>

          <Button disabled className="w-full">
            {dictionary.Submit}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default memo(FeedbackModal, isEqual)
