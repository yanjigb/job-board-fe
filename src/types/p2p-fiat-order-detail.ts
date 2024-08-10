export enum P2pPaymentStatus {
  Pending = 'Pending',
  CustomerPaymentConfirmation = 'CustomerPaymentConfirmation',
  PaymentPeriodExpires = 'PaymentPeriodExpires',
  Success = 'Success',
  AdvertiserPaymentConfirmation = 'AdvertiserPaymentConfirmation',
  LockedDueToComplain = 'LockedDueToComplain',
  Canceled = 'Canceled',
  Failed = 'Failed',
}
