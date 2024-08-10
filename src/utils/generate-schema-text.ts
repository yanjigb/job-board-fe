import { LocaleKeys } from '@/types/locales'

export function generateRequireText(dictionary: LocaleKeys, label: string) {
  return dictionary['%label% is required'].replace('%label%', label)
}
