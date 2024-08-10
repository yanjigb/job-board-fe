'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Hourglass, Image, Minus, SendHorizontal, ThumbsUp } from 'lucide-react'

import { useDictionary } from '@/providers/dictionary-provider'

import { Stat, Stats } from '../business/p2p/stat-info'
import { InputRaw } from '../ui/input'

import { AppAvatarOnline } from './app-avatar'

const Message = memo(function Message() {
  return (
    <div className="flex flex-col items-start space-y-2">
      <p className="w-[calc(359/404*100%)] rounded-[0_0.75rem_1rem_0.75rem] bg-dark-3 px-4 py-3">
        I want to make an appointment tomorrow from 2:00 to 5:00pm?
      </p>
      <span className="inline-block text-body/extra/small/regular text-text-primary">1:55pm</span>
    </div>
  )
}, isEqual)
Message.displayName = 'Message'

const MyMessage = memo(function MyMessage() {
  return (
    <div className="flex flex-col items-end space-y-2">
      <p className="w-[calc(359/404*100%)] rounded-[1rem_0.75rem_0_0.75rem] bg-primary px-4 py-3">
        I want to make an appointment tomorrow from 2:00 to 5:00pm?
      </p>
      <span className="inline-block text-body/extra/small/regular text-text-primary">1:55pm</span>
    </div>
  )
}, isEqual)
MyMessage.displayName = 'MyMessage'

function ChatBox() {
  const { dictionary } = useDictionary()

  return (
    <div>
      <div className="overflow-hidden rounded-t-xl border border-stroke">
        <div className="flex items-center justify-between bg-dark-3 p-3">
          <span>{dictionary['Chat with seller']}</span>
          <Minus />
        </div>

        <div className="h-[31.75rem] space-y-3 overflow-auto px-4 pt-3">
          <div className="flex-col-center gap-3 text-center">
            <AppAvatarOnline online fallback="TG" className="size-20" />

            <div className="space-y-1">
              <h5>Jonathan Higgins</h5>
              <Stats>
                <Stat label="orders" value="346" />
                <Stat label="completion" value="91.50%" />
              </Stats>
            </div>

            <Stats>
              <Stat
                value={<ThumbsUp size={16} strokeWidth={1} className="text-success" />}
                label="100%"
              />
              <Stat
                value={<Hourglass size={16} strokeWidth={1} className="text-secondary" />}
                label="15 mins"
              />
            </Stats>

            <p className="text-body/extra/small/regular text-text-primary">
              {dictionary['Successfully placed an order, please pay within the time limit.']}
            </p>
          </div>

          <div className="flex flex-col items-start space-y-[1.6875rem]">
            <Message />

            <MyMessage />
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-stroke px-4 pb-3 pt-[0.6875rem]">
          <InputRaw
            placeholder={dictionary['Type your message']}
            className="h-auto border-none bg-transparent p-0 outline-none !ring-0"
          />

          <span className="flex items-center gap-3">
            <Image />

            <span
              className="flex-center inline-block size-10 rounded-full bg-primary"
              aria-label="send"
            >
              <SendHorizontal size={20} />
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(ChatBox, isEqual)
