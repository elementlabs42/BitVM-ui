import { QueryKey } from '@tanstack/react-query'
import { Address, parseAbiItem, encodeFunctionData, decodeFunctionResult } from 'viem'
import { useAccount, useCall } from 'wagmi'

const abiItem = parseAbiItem('function balanceOf(address owner) view returns (uint256)')

export function useBalanceOf(tokenContract: Address): [bigint, QueryKey] {
  const account = useAccount()

  const requestData = account.address
    ? encodeFunctionData({
        abi: [abiItem],
        functionName: 'balanceOf',
        args: [account.address],
      })
    : undefined

  const { data: callResult, queryKey } = useCall({
    account: account.address,
    data: requestData,
    to: tokenContract,
  })

  const balance =
    callResult && callResult.data
      ? decodeFunctionResult({
          abi: [abiItem],
          functionName: 'balanceOf',
          data: callResult.data,
        })
      : 0n

  return [balance, queryKey]
}
