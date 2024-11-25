import { Address } from 'viem'
import { EthChainId } from './chains'

export const BRIDGE_ADDRESSES: Record<number, Address> = {
  [EthChainId.MAINNET]: '0xC3549920b94a795D75E6C003944943D552C46F97',
  [EthChainId.SEPOLIA]: '0xC3549920b94a795D75E6C003944943D552C46F97',
  [EthChainId.ANVIL]: '0xbB57FE325e769DEDB1236525a91cDEd842143fA7',
}

export const EBTC_ADDRESSES: Record<number, Address> = {
  [EthChainId.MAINNET]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  [EthChainId.SEPOLIA]: '0x98628033f7395a6d935c986152125Db0D7730d71',
  [EthChainId.ANVIL]: '0x205Cfc23ef26922E116135500abb4B12Ab6d4668',
}
