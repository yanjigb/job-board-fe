import { LocaleKeys } from '@/types/locales'

export const getQRScanStep = (dictionary: LocaleKeys) => [
  dictionary['Download Google Authenticator mobile app'],
  dictionary['Scan QR Code or enter the key to set up'],
  dictionary['Enable Google Authenticator'],
]

export const getKycVerifyFailureMessage = (dictionary: LocaleKeys) => [
  dictionary['Images not clear.'],
  dictionary['Place documents against a solid-colored background.'],
]
