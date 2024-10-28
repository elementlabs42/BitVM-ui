import * as bitcoin from 'bitcoinjs-lib';

export function formatAddress(address: string, startLength = 6, endLength = 4) {
  if (!address) {
    return ''
  }
  if (address.length <= startLength + endLength) {
    return address // Return the full address if it's shorter than the total of start and end lengths
  }
  const start = address.slice(0, startLength)
  const end = address.slice(-endLength)
  return `${start}...${end}`
}

export const isPowerOfTwo = (n: number) => n > 0 && (n & (n - 1)) === 0;

export const closestSmallerPowerOfTwo = (n: number) => {
  if (n <= 1) {
    return 0;
  }

  let power = 1;

  while (power * 2 < n) {
    power *= 2;
  }

  return power;
}

export const getBTCAddressType = (address: string) => {
  try {
    const decodedAddress = bitcoin.address.fromBase58Check(address);
    const { version } = decodedAddress;

    if (version === bitcoin.networks.bitcoin.pubKeyHash) {
      return 'Legacy (P2PKH)'
    } else if (version === bitcoin.networks.bitcoin.scriptHash) {
      return 'Nested SegWit (P2SH)'
    }
  } catch (e) {
    try {
      const decodedBech32 = bitcoin.address.fromBech32(address);
      if (decodedBech32.prefix === 'bc' || decodedBech32.prefix === 'tb') {
        return 'Native SegWit (Bech32)';
      }
    } catch (e) {
      return 'Unknown';
    }
  }
  return 'Unknown';
}

export const formatBalance = (balance: string, decimals = 8) => {
  if (parseFloat(balance) === 0) {
    return '0'
  }
  return (Number(balance) / 10 ** decimals).toFixed(decimals)
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
