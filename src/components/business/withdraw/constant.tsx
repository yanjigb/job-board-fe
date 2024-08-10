import React from 'react'
import Image from 'next/image'

import { WithdrawUserSendType } from '@/types/withdraw'

export const SEND_MODE_OPTIONS = [
  { label: 'Email', value: WithdrawUserSendType.Email },
  { label: 'Phone', value: WithdrawUserSendType.Phone },
  { label: 'Xclusive ID', value: WithdrawUserSendType.Id },
]

export const PHONE_PREFIX_OPTIONS = [
  {
    label: (
      <span className="flex items-center gap-1">
        <Image
          src="/images/flag/vn.svg"
          width={16}
          height={16}
          alt="vn"
          className="block min-w-4"
        />
        <span>+84</span>
      </span>
    ),
    value: '+84',
  },
]
