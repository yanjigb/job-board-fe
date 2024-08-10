import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cnWithClxs(className: string, ...inputs: ClassValue[]) {
  return clsx(className, cn(...inputs))
}
