import React, { memo, PropsWithChildren } from 'react'
import isEqual from 'react-fast-compare'
import { KeyRound, User2 } from 'lucide-react'

import { AppAvatar } from '@/components/common/app-avatar'
import { Card } from '@/components/ui/card'

import { AVATAR_DEFAULT } from '@/constants'
import { DictionaryProps } from '@/types/common'

import UpdatePasswordModal from './modal/update-password-modal'
import UpdateProfileModal from './modal/update-profile-modal'

function CardLayout({ children }: PropsWithChildren) {
  return (
    <Card className="flex flex-col justify-between border-transparent border-b-dark-3 pl-4 pr-4 sm:flex-row md:items-center xl:pl-6 xl:pr-0">
      {children}
    </Card>
  )
}
function ButtonLayout({ children }: PropsWithChildren) {
  return <div className="flex items-start gap-4 self-end">{children}</div>
}

function DashboardAccountPage({ dictionary }: DictionaryProps) {
  return (
    <div>
      <CardLayout>
        <div className="flex items-start gap-4">
          <User2 size={40} strokeWidth={2.5} className="text-text-placeholder" />

          <div>
            <h2 className="text-body/large/semibold">{dictionary.Profile}</h2>
            <p className="text-text-primary">{dictionary['Set up an avatar and nickname']},</p>
          </div>
        </div>

        <ButtonLayout>
          <AppAvatar className="size-[2.625rem]" url={AVATAR_DEFAULT} fallback="Thomas Anree" />
          <div>
            <p className="text-body/medium/medium font-normal">Thomas Anree</p>
            <p className="text-text-primary">User-cfa42</p>
          </div>

          <UpdateProfileModal />
        </ButtonLayout>
      </CardLayout>

      <CardLayout>
        <div className="flex items-start gap-4">
          <KeyRound size={40} strokeWidth={2.5} className="text-text-placeholder" />

          <div>
            <h2 className="text-body/large/semibold">{dictionary['Change password']}</h2>
            <p className="text-text-primary">{dictionary['Change password everytime']}</p>
          </div>
        </div>

        <ButtonLayout>
          <UpdatePasswordModal />
        </ButtonLayout>
      </CardLayout>
    </div>
  )
}

export default memo(DashboardAccountPage, isEqual)
