import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import Background from '@/components/common/background'

import PostAdPage from '@/components/business/p2p-post-ad'

function PostAd() {
  return (
    <section>
      <Background />

      <PostAdPage />
    </section>
  )
}

export default memo(PostAd, isEqual)
