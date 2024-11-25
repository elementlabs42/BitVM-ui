import { mainnet, sepolia } from 'wagmi/chains'
import { Chain, defineChain } from 'viem'

export function getWagmiChainsConfig(): readonly [Chain, ...Chain[]] {
  const supported = process.env.NEXT_PUBLIC_SUPPORTED_CHAINS
    ? process.env.NEXT_PUBLIC_SUPPORTED_CHAINS.split(',')
    : ['mainnet']
  const chains: Chain[] = supported
    .map((name) => {
      switch (name) {
        case 'mainnet':
          return mainnet
        case 'sepolia':
          return sepolia
        case 'local':
          return defineLocalChain()
      }
    })
    .filter((x): x is NonNullable<Chain> => x !== null && x !== undefined)
  return [chains[0], ...chains.slice(1)]
}

export function defineLocalChain(): Chain | undefined {
  if (process.env.NEXT_PUBLIC_LOCAL_RPC && process.env.NEXT_PUBLIC_LOCAL_CHAINID) {
    return defineChain({
      id: parseInt(process.env.NEXT_PUBLIC_LOCAL_CHAINID),
      name: 'Local Chain',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: {
        default: {
          http: [`http://${process.env.NEXT_PUBLIC_LOCAL_RPC}`],
        },
      },
    })
  }
}
