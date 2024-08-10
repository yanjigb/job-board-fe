export const isNotNumeric = (value: any) => !value || Number.isNaN(+value)

export const getCeilNumber = (number: number | string, decimal = 10) =>
  isNotNumeric(number) ? 0 : Math.ceil(+number * 10 ** decimal) / 10 ** decimal

export const getFloorNumber = (number: number | string, decimal = 10) =>
  isNotNumeric(number) || Number.isNaN(+number)
    ? 0
    : Math.floor(+number * 10 ** decimal) / 10 ** decimal

export const formatCurrency = ({
  value,
  currency = '',
  isPrefix = false,
  isWithoutSpace = false,
  format = 'floor',
  options,
  decimal = 10,
}: {
  isPrefix?: boolean
  isWithoutSpace?: boolean
  value: number | string
  format?: 'floor' | 'ceil' | null
  currency?: string
  options?: Intl.NumberFormatOptions | undefined
  decimal?: number
}) => {
  const displayCurrency = currency || ''

  const space = isWithoutSpace ? '' : ' '
  const displaySpace = currency ? space : ''

  let formattedValue = +value
  if (format === 'floor') {
    formattedValue = getFloorNumber(value, decimal)
  } else if (format === 'ceil') {
    formattedValue = getCeilNumber(value, decimal)
  }

  const number = Intl.NumberFormat('en-US', options || { maximumFractionDigits: 10 }).format(
    formattedValue,
  )
  return isPrefix
    ? displayCurrency + displaySpace + number
    : number + displaySpace + displayCurrency
}
