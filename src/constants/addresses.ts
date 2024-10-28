import { Address } from 'viem'
import { mainnet, sepolia } from 'wagmi/chains'

export const EBTC_ADDRESSES: Record<number, Address> = {
  //TODO replace with real addresses, these are USDT addresses
  [mainnet.id]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  [sepolia.id]: '0x98628033f7395a6d935c986152125Db0D7730d71',
}
