export function isSSR() {
  return typeof window === 'undefined'
}

export function getTabValue<T extends Record<string, string>>(
  tabQuery: string | undefined | null,
  tabEnum: T,
  defaultTab: T[keyof T],
  allValue?: string,
): T[keyof T] | string {
  if (allValue && tabQuery === allValue) return allValue

  if (!tabQuery) return defaultTab

  return Object.values(tabEnum).includes(tabQuery as T[keyof T])
    ? (tabQuery as T[keyof T])
    : defaultTab
}
