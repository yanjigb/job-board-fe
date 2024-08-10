import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { AVATAR_DEFAULT } from '@/constants'
import { UserCenterType } from '@/types/p2p-user-center'

import { CardItem, CardLayout } from './ui'

function FollowingTab() {
  return (
    <CardLayout>
      {[
        {
          _id: '1',
          username: 'Thomas Anree',
          systemId: '038134891',
          avatarUrl: AVATAR_DEFAULT,
          type: UserCenterType.Following,
        },
        {
          _id: '2',
          username: 'Thomas Anree',
          systemId: '038134891',
          avatarUrl: AVATAR_DEFAULT,
          type: UserCenterType.Following,
        },
        {
          _id: '3',
          username: 'Thomas Anree',
          systemId: '038134891',
          avatarUrl: AVATAR_DEFAULT,
          type: UserCenterType.Following,
        },
        {
          _id: '4',
          username: 'Thomas Anree',
          systemId: '038134891',
          avatarUrl: AVATAR_DEFAULT,
          type: UserCenterType.Following,
        },
      ].map((item) => (
        <CardItem key={item._id} item={item} />
      ))}
    </CardLayout>
  )
}

export default memo(FollowingTab, isEqual)
