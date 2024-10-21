import { NetworkType } from '@/constants/unisat'

export enum BTCAddressType {
  LEGACY = 'Legacy (P2PKH)',
  NESTED_SEGWIT = 'Nested SegWit (P2SH-P2WPKH)',
  NATIVE_SEGWIT = 'Native SegWit (P2WPKH)',
  TAPROOT = 'Taproot (P2TR)',
  UNKNOWN = 'Unknown',
}

export function formatAddress(address: string, startLength = 6, endLength = 4) {
  if (address.length <= startLength + endLength) {
    return address // Return the full address if it's shorter than the total of start and end lengths
  }
  const start = address.slice(0, startLength)
  const end = address.slice(-endLength)
  return `${start}...${end}`
}

export function parseAddressType(address: string): { address: BTCAddressType; network: NetworkType } {
  if (address.startsWith('1')) {
    return { address: BTCAddressType.LEGACY, network: NetworkType.MAINNET }
  } else if (address.startsWith('3')) {
    return { address: BTCAddressType.NESTED_SEGWIT, network: NetworkType.MAINNET }
  } else if (address.startsWith('bc1')) {
    return { address: BTCAddressType.NATIVE_SEGWIT, network: NetworkType.MAINNET }
  } else if (address.startsWith('bc1p')) {
    return { address: BTCAddressType.TAPROOT, network: NetworkType.MAINNET }
  } else if (address.startsWith('m') || address.startsWith('n')) {
    return { address: BTCAddressType.LEGACY, network: NetworkType.TESTNET }
  } else if (address.startsWith('2')) {
    return { address: BTCAddressType.NESTED_SEGWIT, network: NetworkType.TESTNET }
  } else if (address.startsWith('tb1') || address.startsWith('bcrt1')) {
    return { address: BTCAddressType.NATIVE_SEGWIT, network: NetworkType.TESTNET }
  } else if (address.startsWith('tb1p') || address.startsWith('bcrt1p')) {
    return { address: BTCAddressType.TAPROOT, network: NetworkType.TESTNET }
  } else {
    return { address: BTCAddressType.UNKNOWN, network: NetworkType.MAINNET }
  }
}

export const copyToClipboard = (textToCopy: string | number) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy.toString())
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = textToCopy.toString()
    textArea.style.position = 'absolute'
    textArea.style.opacity = '0'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    return new Promise<void>((res, rej) => {
      /* eslint-disable-next-line @typescript-eslint/no-unused-expressions */
      document.execCommand('copy') ? res() : rej()
      textArea.remove()
    })
  }
}
