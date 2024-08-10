export enum UserCenterTab {
  P2PPaymentMethods = 'payment_methods',
  Feedback = 'feedback',
  BlockedUsers = 'block_users',
  Following = 'following',
  Followers = 'followers',
}

export enum UserCenterType {
  Block = 'block',
  Following = 'following',
  Follower = 'follower',
}

export interface IBlockUser {
  _id: string
  username: string
  systemId: string
  avatarUrl: string
  message?: string
  type: 'block'
}

export interface IFollowingUser {
  _id: string
  username: string
  systemId: string
  avatarUrl: string
  message?: string
  type: 'following'
}

export interface IFollowerUser {
  _id: string
  username: string
  systemId: string
  avatarUrl: string
  message?: string
  type: 'follower'
}

export type UserItem = IBlockUser | IFollowingUser | IFollowerUser
