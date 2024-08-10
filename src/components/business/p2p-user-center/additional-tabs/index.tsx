'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useQueryState } from 'nuqs'

import { AdditionalTabSelect } from '@/components/common/tabs-select'

import { useDictionary } from '@/providers/dictionary-provider'
import { ITabsItem } from '@/types/common'
import { UserCenterTab } from '@/types/p2p-user-center'
import { getTabValue } from '@/utils'

import BlockedUsersTab from './blocked-users-tab'
import FeedbackTab from './feedback-tab'
import FollowerTab from './follower-tab'
import FollowingTab from './following-tab'
import PaymentMethodTab from './payment-method-tab'

function AdditionalTabs() {
  const { dictionary } = useDictionary()

  const [tabQuery, setTabQuery] = useQueryState('tab')

  const tab = React.useMemo(
    () => getTabValue(tabQuery, UserCenterTab, UserCenterTab.P2PPaymentMethods),
    [tabQuery],
  )

  const tabRender: Record<UserCenterTab, React.ReactElement> = React.useMemo(
    () => ({
      [UserCenterTab.P2PPaymentMethods]: <PaymentMethodTab />,
      [UserCenterTab.Feedback]: <FeedbackTab />,
      [UserCenterTab.BlockedUsers]: <BlockedUsersTab />,
      [UserCenterTab.Following]: <FollowingTab />,
      [UserCenterTab.Followers]: <FollowerTab />,
    }),
    [],
  )

  const onClick = (value: ITabsItem['value']) => setTabQuery(value)

  return (
    <div className="space-y-6">
      <div className="border-b border-stroke">
        <AdditionalTabSelect
          list={[
            { label: dictionary['P2P Payment Methods'], value: UserCenterTab.P2PPaymentMethods },
            { label: `${dictionary.Feedback} (0)`, value: UserCenterTab.Feedback },
            { label: dictionary['Blocked Users'], value: UserCenterTab.BlockedUsers },
            { label: dictionary.Following, value: UserCenterTab.Following },
            { label: dictionary.Followers, value: UserCenterTab.Followers },
          ]}
          onClick={onClick}
          currentTab={tab}
        />
      </div>

      {tabRender[tab as UserCenterTab]}
    </div>
  )
}

export default memo(AdditionalTabs, isEqual)
