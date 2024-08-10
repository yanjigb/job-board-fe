import { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'

import { AppAvatar } from '@/components/common/app-avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { AVATAR_DEFAULT } from '@/constants'
import { useDictionary } from '@/providers/dictionary-provider'
import { HTMLTypeWithoutRefHasClassNameOptional } from '@/types/common'
import { UserItem } from '@/types/p2p-user-center'
import { cn } from '@/utils/cn'

const CardItem = memo(function CardItem({ item }: { item: UserItem }) {
  const { dictionary } = useDictionary()

  const renderButton = useCallback(() => {
    switch (item.type) {
      case 'block':
        return <Button variant="bg">{dictionary.Unblock}</Button>
      case 'following':
        return <Button variant="bg">{dictionary.Unfollow}</Button>
      case 'follower':
        return <Button variant="bg">{dictionary.Follow}</Button>
      default:
        return null
    }
  }, [dictionary.Follow, dictionary.Unblock, dictionary.Unfollow, item.type])

  return (
    <Card className="space-y-4 rounded-lg border-stroke px-8 py-[1.4375rem]">
      <div className="flex justify-between gap-3">
        <div className="flex items-center gap-2">
          <AppAvatar fallback="Thomas Anree" url={AVATAR_DEFAULT} className="size-[2.375rem]" />

          <div className="space-y">
            <p className="text-body/medium/medium font-normal">{item.username}</p>
            <p className="text-body/extra/small/regular text-text-primary">ID {item.systemId}</p>
          </div>
        </div>

        {renderButton()}
      </div>

      {item.message && <p>{item.message}</p>}
    </Card>
  )
}, isEqual)
CardItem.displayName = 'CardItem'

const CardLayout = memo(function CardLayout({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLDivElement>) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3', className)}
      {...rest}
    />
  )
}, isEqual)
CardLayout.displayName = 'CardLayout'

export { CardItem, CardLayout }
