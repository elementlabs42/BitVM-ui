import { useAccount, useChains } from 'wagmi'

export function useEthAccount(): [ReturnType<typeof useAccount>, boolean] {
  const ethereumAccount = useAccount()
  const chains = useChains()
  const isUnsupported = ethereumAccount.chainId ? !chains.map((c) => c.id).includes(ethereumAccount.chainId) : true
  return [ethereumAccount, isUnsupported]
}
