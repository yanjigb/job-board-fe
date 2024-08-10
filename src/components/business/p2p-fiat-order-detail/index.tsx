'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import ChatBox from '@/components/common/chat-box'

import { P2pTradingType } from '@/types/p2p'
import { P2pPaymentStatus } from '@/types/p2p-fiat-order-detail'

// Buy
import BuyCanceled from './buy/cancel'
import BuyCompleted from './buy/completed'
import CustomerPaymentConfirmation from './buy/customer-payment-confirmation'
import BuyPending from './buy/pending'
// Header Buy
import HeaderCanceled from './header-buy/header-canceled'
import HeaderSuccess from './header-buy/header-completed'
import HeaderCustomerPaymentConfirmation from './header-buy/header-customer-payment-confirmation'
import HeaderPending from './header-buy/header-pending'
// Header Sell
import HeaderSellSuccess from './header-sell/header-completed'
import HeaderSellLockedDueToComplain from './header-sell/header-locked-due-to-complain'
import HeaderSellPending from './header-sell/header-pending'
// Sell
import SellCompleted from './sell/completed'
import SellLockedDueToComplain from './sell/locked-due-to-complain'
import SellPending from './sell/pending'

import 'yet-another-react-lightbox/styles.css'

function P2pFiatOrderDetailPage() {
  const type = P2pTradingType.Sell
  const status = P2pPaymentStatus.LockedDueToComplain

  const mapping = React.useMemo(
    () => ({
      [P2pTradingType.Buy]: {
        [P2pPaymentStatus.Pending]: {
          header: <HeaderPending />,
          content: <BuyPending />,
        },
        [P2pPaymentStatus.Canceled]: {
          header: <HeaderCanceled />,
          content: <BuyCanceled />,
        },
        [P2pPaymentStatus.CustomerPaymentConfirmation]: {
          header: <HeaderCustomerPaymentConfirmation />,
          content: <CustomerPaymentConfirmation />,
        },
        [P2pPaymentStatus.Success]: {
          header: <HeaderSuccess />,
          content: <BuyCompleted />,
        },
      },

      [P2pTradingType.Sell]: {
        [P2pPaymentStatus.Pending]: {
          header: <HeaderSellPending />,
          content: <SellPending />,
        },
        [P2pPaymentStatus.Canceled]: {
          header: null,
          content: null,
        },
        [P2pPaymentStatus.CustomerPaymentConfirmation]: {
          header: null,
          content: null,
        },
        [P2pPaymentStatus.LockedDueToComplain]: {
          header: <HeaderSellLockedDueToComplain />,
          content: <SellLockedDueToComplain />,
        },
        [P2pPaymentStatus.Success]: {
          header: <HeaderSellSuccess />,
          content: <SellCompleted />,
        },
      },
    }),
    [],
  )

  return (
    <div className="container">
      {mapping[type][status]?.header}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-7 xl:col-span-8">{mapping[type][status]?.content}</div>

        <div className="md:col-span-5 xl:col-span-4">
          <ChatBox />
        </div>
      </div>
    </div>
  )
}

export default memo(P2pFiatOrderDetailPage, isEqual)
