import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { useDictionary } from '@/providers/dictionary-provider'

import { ONLINE_BUY_ADS, ONLINE_SELL_ADS } from '../faker'

import OnlineTabTable from './online-tab-table'

function OnlineAdTab() {
  const { dictionary } = useDictionary()
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h3 className="text-body/large/medium font-normal text-success">
          {dictionary['Online Buy Ads']}
        </h3>
        <div>
          <OnlineTabTable list={ONLINE_BUY_ADS} />
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-body/large/medium font-normal text-error">
          {dictionary['Online Sell Ads']}
        </h3>
        <div>
          <OnlineTabTable list={ONLINE_SELL_ADS} />
        </div>
      </section>
    </div>
  )
}

export default memo(OnlineAdTab, isEqual)
