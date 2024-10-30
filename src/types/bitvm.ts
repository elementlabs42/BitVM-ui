export enum Env {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

export enum Command {
  DEPOSITOR = 'depositor',
  WITHDRAWER = 'withdrawer',
  HISTORY = 'history',
  TRANSACTIONS = 'transactions',
  SIGNATURES = 'signatures',
  PEGINS = 'pegins',
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

export type BitvmResponseData = GraphSimple[] | Graph[] | PegInPsbt | string
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

export enum GraphType {
  PEG_IN = 'peg_in',
  PEG_OUT = 'peg_out',
  UNKNOWN = 'unknown',
}

export type Graph = GraphSimple & {
  type: GraphType
  status: string
  transactions: Tx[]
}

export type GraphSimple = {
  graphId: string
  amount: bigint
}
