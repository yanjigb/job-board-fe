import React, { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'

import { useDictionary } from '@/providers/dictionary-provider'
import { p2pStoreActions, useP2pStore } from '@/stores/use-p2p'
import { cn } from '@/utils/cn'

import { AdsInfo, BuyForm, TradeInfo } from './ui'

function BuyModal() {
  const { dictionary } = useDictionary()

  const isOpenModalTradeP2p = useP2pStore((state) => state.isOpenModalTradeP2p)

  const onCloseModal = useCallback(() => {
    p2pStoreActions.setModalTradeP2p(false)
  }, [])

  return (
    <Dialog open={isOpenModalTradeP2p} onOpenChange={p2pStoreActions.setModalTradeP2p}>
      <DialogContent className="max-w-[calc(70.625rem+1.5rem)]">
        <DialogHeader>{dictionary['P2P Trading']}</DialogHeader>

        <div className="relative grid grid-cols-1 gap-12 overflow-hidden break-words md:grid-cols-2">
          <div
            className={cn(
              'relative py-6',
              "after:absolute after:-bottom-6 after:right-0 after:h-px after:w-full after:bg-dark-3 after:content-[''] md:after:-right-6 md:after:bottom-0 md:after:h-full md:after:w-px",
            )}
          >
            <AdsInfo />
          </div>

          <div className="py-6">
            <div className="space-y-6">
              <TradeInfo />
              <BuyForm />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button className="min-w-[12.5rem]" variant="ghost" onClick={onCloseModal}>
            {dictionary.Cancel}
          </Button>
          <Button className="min-w-[12.5rem]" disabled>
            {dictionary.Buy} USDT
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default memo(BuyModal, isEqual)
