const RouteNames = {
  Home: '/',
  SignIn: '/sign-in',
  SignUp: '/sign-up',
  Dashboard: '/dashboard',
  Term: '/term',
  ForgotPassword: '/forgot-password',
  Kyc: '/dashboard/kyc',
  Account: '/dashboard/account',
  TransactionHistory: '/dashboard/transaction-history',
  WithdrawInternal: '/dashboard/withdraw-internal',
  Wallet: '/dashboard/wallet',
  Deposit: '/dashboard/wallet/deposit',
  Withdraw: '/dashboard/wallet/withdraw',
  P2p: '/p2p',
  UserCenter: '/p2p/user-center',
  MyAds: '/p2p/my-ads',
  MyAdDetail: (id = ':id') => `/p2p/my-ads/${id}`,
  PostAd: '/p2p/post-ad',
} as const

export default RouteNames
