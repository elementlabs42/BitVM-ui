import { formatUnits, parseUnits } from 'viem'

const BITCOIN_DECIMALS = 8
const NUMBER_REGEX = /^\d*(\.\d*)?$/

export function parseBtc(n: string, defaultOnFailure?: bigint) {
  try {
    return parseUnits(n, BITCOIN_DECIMALS)
  } catch {
    return defaultOnFailure
  }
}

export function formatBtc(n: bigint) {
  return formatUnits(n, BITCOIN_DECIMALS)
}

export function formatInput(value: string) {
  if (NUMBER_REGEX.test(value)) {
    value = stripLeadingZeroes(value)
    value = truncateDecimals(value, BITCOIN_DECIMALS)
    return value
  }
}

function stripLeadingZeroes(value: string) {
  if (value === '') {
    return value
  }
  const leadingZeroes = value.match(/^0*/)?.[0].length
  if (leadingZeroes) {
    value = value.substring(leadingZeroes)
  }
  if (value.startsWith('.') || value === '') {
    value = '0' + value
  }
  return value
}

function truncateDecimals(value: string, decimals: number) {
  if (value.includes('.')) {
    const [integer, _decimal] = value.split('.')
    const decimal = _decimal.substring(0, decimals)
    return decimals !== 0 ? `${integer}.${decimal}` : integer
  } else {
    return value
  }
}
