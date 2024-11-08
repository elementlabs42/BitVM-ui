import { BRIDGE_ABI, EBTC_ABI } from '@/constants/abi'
import { BRIDGE_ADDRESSES, EBTC_ADDRESSES } from '@/constants/addresses'
import { OutPoint } from '@/types'
import {
  Address,
  Chain,
  ContractFunctionArgs,
  createWalletClient,
  encodeFunctionData,
  Hex,
  http,
  publicActions,
} from 'viem'

export type EthereumTransaction = {
  to: Address
  data: Hex
  callArgs: TxCallArgs
}

interface TxCallArgs {
  functionName: string
  args: ContractFunctionArgs
}

interface PegOutInfo extends TxCallArgs {
  destinationBitcoinAddress: string
  outpoint: OutPoint
  amount: bigint
  operatorPublicKey: string
}

export function getPegOutTransaction(chainId: number, info: PegOutInfo): EthereumTransaction {
  info.args = [
    info.destinationBitcoinAddress,
    { txId: `0x${info.outpoint.txid}`, vOut: BigInt(info.outpoint.vout) },
    info.amount,
    `0x${info.operatorPublicKey}`,
  ]
  return {
    to: BRIDGE_ADDRESSES[chainId],
    data: encodeFunctionData({
      abi: getAbiFor(info.functionName),
      functionName: 'pegOut',
      args: info.args,
    }),
    callArgs: info,
  }
}

export function getEbtcApprovalTransaction(chainId: number): EthereumTransaction {
  const callArgs = {
    functionName: 'approve',
    args: [BRIDGE_ADDRESSES[chainId], '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'],
  }
  return {
    to: EBTC_ADDRESSES[chainId],
    data: encodeFunctionData({
      abi: EBTC_ABI,
      ...callArgs,
    }),
    callArgs,
  }
}

export async function estimateGas(account: Address, chain: Chain, arg: TxCallArgs) {
  const client = createWalletClient({
    account,
    chain,
    transport: http(),
  }).extend(publicActions)

  return await client.estimateContractGas({
    abi: getAbiFor(arg.functionName),
    address: BRIDGE_ADDRESSES[chain.id],
    ...arg,
  })
}

function getAbiFor(functionName: string) {
  switch (functionName) {
    case 'pegOut':
      return [...EBTC_ABI, ...BRIDGE_ABI]
    default:
      return []
  }
}
