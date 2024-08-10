import React, { memo, PropsWithChildren } from 'react'
import isEqual from 'react-fast-compare'
import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useDictionary } from '@/providers/dictionary-provider'

function DeleteAdModal({ children }: PropsWithChildren) {
  const { dictionary } = useDictionary()
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[calc(590px+1.5rem)] [&_.content]:p-8">
        <div className="mb-[2.1875rem] flex items-start gap-[1.375rem]">
          <span className="inline-block rounded-full bg-another-8/20 p-[0.9375rem]">
            <Trash2 size={30} className="text-blueLight" />
          </span>

          <div className="space-y-1">
            <h2 className="text-heading-6">{dictionary['Delete this AD']}</h2>
            <p className="text-text-primary">
              {dictionary['Are you sure you want to delete this Ad? This action cannot be undone.']}
            </p>
          </div>
        </div>

        <DialogFooter className="py-0">
          <DialogClose>
            <Button variant="ghost" className="min-w-[7.5rem]">
              {dictionary.Cancel}
            </Button>
          </DialogClose>
          <Button className="min-w-[7.5rem]">{dictionary.Delete}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default memo(DeleteAdModal, isEqual)
