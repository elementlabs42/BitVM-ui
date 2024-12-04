import fs from 'fs'
import p from 'path'
import { spawnSync } from 'child_process'
import { empty, getErrorOnly } from '@/utils'
import * as bitcoin from 'bitcoinjs-lib'
import { isAddress } from 'viem'
import {
  BitvmResponseData,
  Command,
  Env,
  Graph,
  GraphSimple,
  GraphType,
  PegInPsbt,
  Tx,
  TxStatus,
  TxType,
} from '@/types'
import { BitvmReponseStatus, SignaturesArgs, TransactionsArgs } from '@/types'

const DEFAULT_PATH = 'bitvm/'
const DEFAULT_EXEC = 'cli-query'
const DEFAULT_DELIMITER_TOKEN = '>>>> BitVM Query Response <<<<'

export class BitvmService {
  env: Env
  private path: string
  private exec: string

  constructor(env?: Env, path?: string) {
    this.path = p.join(process.cwd(), path ? path : DEFAULT_PATH)
    this.exec = DEFAULT_EXEC
    this.env = env ? env : Env.MAINNET
    this.validateClient()
  }

  getDepositPeginTx(publicKey: string, amount: bigint, recipient: string) {
    if (!isAddress(recipient)) {
      throw new Error('Invalid ethereum address')
    }
    return this.call(Command.DEPOSITOR, [Command.DEPOSIT_PEGIN_TX, publicKey, amount.toString(), recipient])
  }

  getHistory(publicKey: string, address: string) {
    if (!BitvmService.validateBitcoinPublicKey(publicKey)) {
      throw new Error('Invalid bitcoin public key')
    }
    if (!isAddress(address)) {
      throw new Error('Invalid ethereum address')
    }
    return this.call(Command.HISTORY, [publicKey, address])
  }

  getDepositorStatus(publicKey: string) {
    if (!BitvmService.validateBitcoinPublicKey(publicKey)) {
      throw new Error('Invalid bitcoin public key')
    }
    return this.call(Command.DEPOSITOR, [publicKey])
  }

  getWithdrawerStatus(address: string) {
    if (!isAddress(address)) {
      throw new Error('Invalid ethereum address')
    }
    return this.call(Command.WITHDRAWER, [address])
  }

  getTransactions(args: TransactionsArgs) {
    if (!BitvmService.validateBitcoinPublicKey(args.pubkey)) {
      throw new Error('Invalid bitcoin public key')
    }
    if (!isAddress(args.address)) {
      throw new Error('Invalid ethereum address')
    }
    if (!BitvmService.validateOutpoint(args.outpoint)) {
      throw new Error('Invalid Outpoint')
    }
    return this.call(Command.TRANSACTIONS, [...Object.values(args).map((x) => x.toString())])
  }

  postSignatures(args: SignaturesArgs) {
    if (!BitvmService.validateBitcoinPublicKey(args.pubkey)) {
      throw new Error('Invalid bitcoin public key')
    }
    if (!isAddress(args.address)) {
      throw new Error('Invalid ethereum address')
    }
    if (!BitvmService.validateOutpoint(args.outpoint)) {
      throw new Error('Invalid Outpoint')
    }
    return this.call(Command.SIGNATURES, [...Object.values(args).map((x) => x.toString())])
  }

  getUnusedPegInGraphs() {
    return this.call(Command.PEGINS, [])
  }

  static validateCommand(input: string) {
    return Object.values(Command).find((cmd) => cmd.toString() === input.toLowerCase())
  }

  static validateBitcoinPublicKey(publicKeyHex: string) {
    const publicKeyBytes = Buffer.from(publicKeyHex, 'hex')
    return publicKeyBytes.toString('hex') === publicKeyHex && bitcoin.script.isCanonicalPubKey(publicKeyBytes)
  }

  static validateOutpoint(outpoint: string) {
    const [txid, vout] = outpoint.split(':')
    return outpoint.length <= 75 && txid && txid.length === 64 && vout && !empty(vout)
  }

  private call(subCommand: Command, args: string[]): BitvmResponseData {
    const exec = `${this.path}${this.exec}`
    const options = `-e ${this.env} -p ${this.path}`.split(' ')
    console.log(exec, [...options, subCommand, ...args])
    const output = spawnSync(exec, [...options, subCommand, ...args], { cwd: this.path, stdio: [null, 'pipe', 'pipe'] })
    return this.prepareResponse(subCommand, output.stdout.toString())
  }

  private prepareResponse(subCommand: Command, output: string): BitvmResponseData {
    const response = output.split(DEFAULT_DELIMITER_TOKEN)
    if (response.length === 2) {
      let obj = undefined
      try {
        obj = JSON.parse(response[1].trim())
      } catch {
        console.log(`Failed to parse response: ${response[1]}`)
        throw new Error(`Failed to parse response`)
      }
      if (obj.status === BitvmReponseStatus.OK) {
        switch (subCommand) {
          case Command.TRANSACTIONS:
            return this.interperetTransactions(obj.data)
          case Command.SIGNATURES:
            return ''
          case Command.PEGINS:
            if (Array.isArray(obj.data)) {
              return this.interperetUnusedPegInGraphs(obj.data)
            } else {
              throw new Error('Invalid response, data is not vector')
            }
          default:
            if (Array.isArray(obj.data)) {
              return this.interperetGraphs(obj.data)
            } else {
              throw new Error('Invalid response, data is not vector')
            }
        }
      } else {
        throw new Error(`Upsteam error: ${obj.error}`)
      }
    }
    throw new Error(`Response doesn't contain delimeter`)
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  private interperetUnusedPegInGraphs(graphs: any[]): GraphSimple[] {
    return graphs.map((g) => {
      const graph: GraphSimple = {
        graphId: String(g.graph_id),
        amount: BigInt(g.amount),
      }
      return graph
    })
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  private interperetGraphs(graphs: any[]): Graph[] {
    return graphs.map((g) => {
      const txs: Tx[] = Array.isArray(g.txs)
        ? g.txs.map((t: any) => {
          const txStatus: TxStatus = {
            confirmed: Boolean(t.status.confirmed),
            blockHeight: Number(t.status.block_height),
            blockHash: String(t.status.block_hash),
            blockTime: Number(t.status.block_time),
          }
          const tx: Tx = {
            type: Object.values(TxType).find((type) => type.toString() === t.type.toLowerCase()) ?? TxType.UNKNOWN,
            txId: String(t.txid),
            status: txStatus,
          }
          return tx
        })
        : []
      const graph: Graph = {
        type: Object.values(GraphType).find((type) => type.toString() === g.type.toLowerCase()) ?? GraphType.UNKNOWN,
        graphId: String(g.graph_id),
        amount: BigInt(g.amount),
        status: String(g.status),
        transactions: txs,
      }
      return graph
    })
  }

  private interperetTransactions(data: any): PegInPsbt {
    return {
      deposit: data.deposit,
      confirm: data.confirm,
      refund: data.refund,
    }
  }

  private validateClient() {
    if (!fs.existsSync(this.path)) {
      throw new Error('Bitvm not found')
    }

    try {
      fs.accessSync(this.path, fs.constants.X_OK)
    } catch (err) {
      const error = getErrorOnly(err, 'Bitvm not executable')
      throw error
    }
  }
}
