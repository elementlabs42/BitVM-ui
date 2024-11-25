import { BRIDGE_ADDRESSES, EBTC_ADDRESSES } from '@/constants/addresses'
import { QueryKey } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Address, parseAbiItem, encodeFunctionData, decodeFunctionResult, EncodeFunctionDataReturnType } from 'viem'
import { UseAccountReturnType, useCall } from 'wagmi'

const balanceOfAbi = parseAbiItem('function balanceOf(address owner) view returns (uint256)')
const allowanceAbi = parseAbiItem('function allowance(address owner, address spender) public view returns (uint256)')

export function useEBtcBalanceOf(account: UseAccountReturnType): [bigint, QueryKey | undefined] {
  const [eBtcAddress, setEBtcAddress] = useState<Address>()
  const [requestData, setRequestData] = useState<EncodeFunctionDataReturnType>()

  useEffect(() => {
    if (account.address && account.chainId) {
      setRequestData(encodeFunctionData({ abi: [balanceOfAbi], functionName: 'balanceOf', args: [account.address] }))
      setEBtcAddress(EBTC_ADDRESSES[account.chainId])
    }
  }, [account.address, account.chainId])

  const { data: callResult, queryKey } = useCall({
    account: account.address,
    data: requestData,
    to: eBtcAddress,
  })

  const balance =
    callResult && callResult.data
      ? decodeFunctionResult({
          abi: [balanceOfAbi],
          functionName: 'balanceOf',
          data: callResult.data,
        })
      : 0n

  return [balance, queryKey]
}

export function useEBtcAllowance(account: UseAccountReturnType): [bigint, QueryKey | undefined] {
  const [eBtcAddress, setEBtcAddress] = useState<Address>()
  const [requestData, setRequestData] = useState<EncodeFunctionDataReturnType>()

  useEffect(() => {
    if (account.address && account.chainId) {
      const bridgeAddress = BRIDGE_ADDRESSES[account.chainId]
      setRequestData(
        encodeFunctionData({ abi: [allowanceAbi], functionName: 'allowance', args: [account.address, bridgeAddress] }),
      )
      setEBtcAddress(EBTC_ADDRESSES[account.chainId])
    }
  }, [account.address, account.chainId])

  const { data: callResult, queryKey } = useCall({
    account: account.address,
    data: requestData,
    to: eBtcAddress,
  })

  const allowance =
    callResult && callResult.data
      ? decodeFunctionResult({
          abi: [allowanceAbi],
          functionName: 'allowance',
          data: callResult.data,
        })
      : 0n

  return [allowance, queryKey]
}
