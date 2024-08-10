import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import HeaderNotification from './modal/header-notification'
import MyOrderNotification from './modal/my-order-notification'
import { NavUser } from './nav-user'

function UserLoggedIn() {
  return (
    <div className="flex items-center gap-3">
      <HeaderNotification />

      <MyOrderNotification />

      <NavUser />
    </div>
  )
}

export default memo(UserLoggedIn, isEqual)
