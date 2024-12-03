import { BRIDGE_ABI, EBTC_ABI } from '@/constants/abi'
import { BRIDGE_ADDRESSES, EBTC_ADDRESSES } from '@/constants/addresses'
import { OutPoint } from '@/types'
import {
  Address,
  Chain,
  ContractFunctionArgs,
  createPublicClient,
  createWalletClient,
  encodeFunctionData,
  Hex,
  http,
  parseAbiItem,
  publicActions,
} from 'viem'
import { Abi, AbiError } from 'abitype'

export type EthereumTransaction = {
  to: Address
  data: Hex
  abiErros: AbiError[]
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
  const abi = getAbiFor(info.functionName)
  return {
    to: BRIDGE_ADDRESSES[chainId],
    data: encodeFunctionData({
      abi,
      functionName: info.functionName,
      args: info.args,
    }),
    abiErros: getErrorsFrom(abi),
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
    abiErros: getErrorsFrom(EBTC_ABI),
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

export async function getPegOutLogs(chain: Chain) {
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  const filter = await publicClient.createEventFilter({
    address: BRIDGE_ADDRESSES[chain.id],
    event: parseAbiItem([
      'struct Outpoint {bytes32 txId;uint256 vOut;}',
      'event PegOutInitiated(address indexed withdrawer,string destinationAddress,Outpoint sourceOutpoint,uint256 amount,bytes operatorPubkey)',
    ]),
  })

  return await publicClient.getFilterLogs({ filter })
}

function getAbiFor(functionName: string): Abi {
  switch (functionName) {
    case 'pegOut':
      return [...EBTC_ABI, ...BRIDGE_ABI]
    default:
      return [] as Abi
  }
}

function getErrorsFrom(abi: Abi) {
  return abi
    .filter((item) => item.type === 'error')
    .map<AbiError>((item) => ({ name: item.name ?? '', inputs: item.inputs, type: 'error' }))
}
