export enum Env {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

export enum Command {
  DEPOSITOR = 'depositor',
  WITHDRAWER = 'withdrawer',
  HISTORY = 'history',
}

export enum BitvmReponseStatus {
  OK = 'OK',
  NOK = 'NOK',
}

export type BitvmResponse = {
  status: BitvmReponseStatus
  data?: Graph[]
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

export enum GraphType {
  PEG_IN = 'peg_in',
  PEG_OUT = 'peg_out',
  UNKNOWN = 'unknown',
}

export type Graph = {
  type: GraphType
  graphId: string
  amount: bigint
  status: string
  transactions: Tx[]
}
