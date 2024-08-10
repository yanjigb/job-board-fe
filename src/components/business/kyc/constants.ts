import { LocaleKeys } from '@/types/locales'

export const getConditionHeadingIdCard = (dictionary: LocaleKeys) => [
  dictionary['Personal information'],
  dictionary['Government-issued ID'],
]

export const getConditionImageIdCard = (dictionary: LocaleKeys) => [
  dictionary['Upload a complete image of your ID document.'],
  dictionary['Ensure all details are readable in the image you upload.'],
  dictionary['Ensure the document is the original and has not expired.'],
  dictionary['Place documents against a solid-colored background.'],
]

export const getConditionHeadingUtilityBilling = (dictionary: LocaleKeys) => [
  dictionary['Personal information'],
  dictionary['Document type selection'],
]

export const getConditionImageUtilityBilling = (dictionary: LocaleKeys) => [
  dictionary['Upload a complete bill of your ID document.'],
  dictionary['It must be usually within the last 3 months.'],
  dictionary["It should clearly show the user's name and address."],
  dictionary['The document should be fully legible.'],
]
