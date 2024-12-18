import { Address } from 'viem'

export enum Env {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  LOCAL = 'local',
}

export enum Command {
  DEPOSITOR = 'depositor',
  WITHDRAWER = 'withdrawer',
  HISTORY = 'history',
  TRANSACTIONS = 'transactions',
  SIGNATURES = 'signatures',
  PEGINS = 'pegins',
  DEPOSIT_PEGIN_TX = 'pegin_deposit_tx',
}

export type TransactionsArgs = {
  pubkey: string
  address: string
  outpoint: string
  sat: bigint
}

export type SignaturesArgs = TransactionsArgs & Signatures
export type Signatures = {
  deposit: string
  confirm: string
  refund: string
}

export enum BitvmReponseStatus {
  OK = 'OK',
  NOK = 'NOK',
}

export type BitvmResponseData = PegInGraph[] | Graph[] | PegInPsbt | string
export type BitvmResponse = {
  status: BitvmReponseStatus
  data?: BitvmResponseData
  error?: string
}

export type TxStatus = {
  confirmed: boolean
  blockHeight: number
  blockHash: string
  blockTime: number
}

export enum TxType {
  PEG_IN_DEPOSIT = 'peg_in_deposit',
  PEG_IN_CONFIRM = 'peg_in_confirm',
  PEG_IN_REFUND = 'peg_in_refund',
  PEG_OUT = 'peg_out',
  UNKNOWN = 'unknown',
}

export type Tx = {
  type: TxType
  txId: string
  status: TxStatus
}

// TODO refactor with real psbt format
export type PegInPsbt = {
  deposit: string
  confirm: string
  refund: string
}

type BaseGraph = {
  graphId: string
  amount: bigint
}

export enum GraphType {
  PEG_IN = 'peg_in',
  PEG_OUT = 'peg_out',
  UNKNOWN = 'unknown',
}

export type Graph = BaseGraph & {
  type: GraphType
  status: string
  transactions: Tx[]
  receipient: string
}

export type PegInGraph = BaseGraph & {
  sourceOutpoint: OutPoint
}

export type OutPoint = {
  txid: string
  vout: number
}

export type PegOutInitiated = {
  withdrawer: Address
  destinationAddress: string
  sourceOutpoint: OutPoint
  amount: bigint
  operatorPubkey: `0x${string}`
  block: bigint
}
