export function getTwoInitials(name: string) {
  if (!name) return ''
  const [first, last] = name.split(' ')

  if (!last) {
    const [f, l] = first.split('')
    if (!l) return `${f}${f}`
    return `${f}${l}`
  }
  return `${first[0]}${last[0]}`
}

export const sliceEmail = (email: string, fallback = '*****') => {
  if (!email) return ''
  const exts = email.split('.')

  return `${email.slice(0, 2)}${fallback}.${exts[exts.length - 1]}`
}
