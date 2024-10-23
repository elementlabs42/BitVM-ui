import fs from 'fs'
import p from 'path'
import { spawnSync } from 'child_process'
import { getErrorOnly } from '@/utils'
import * as bitcoin from 'bitcoinjs-lib'
import { isAddress } from 'viem'
import { BitvmReponseStatus, Command, Env, Graph, GraphType, Tx, TxStatus, TxType } from '@/types'

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

  static validateCommand(input: string) {
    return Object.values(Command).find((cmd) => cmd.toString() === input.toLowerCase())
  }

  static validateBitcoinPublicKey(publicKeyHex: string) {
    const publicKeyBytes = Buffer.from(publicKeyHex, 'hex')
    return publicKeyBytes.toString('hex') === publicKeyHex && bitcoin.script.isCanonicalPubKey(publicKeyBytes)
  }

  private call(subCommand: Command, args: string[]): Graph[] {
    const exec = `${this.path}${this.exec}`
    const options = `-e ${this.env} -p ${this.path}`.split(' ')
    const output = spawnSync(exec, [...options, subCommand, ...args], { cwd: this.path, stdio: [null, 'pipe', 'pipe'] })
    return this.prepareResponse(output.stdout.toString())
  }

  private prepareResponse(output: string): Graph[] {
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
        if (Array.isArray(obj.data)) {
          return this.interperet(obj.data)
        } else {
          throw new Error('Invalid response, data is not vector')
        }
      } else {
        throw new Error(`Upsteam error: ${obj.error}`)
      }
    }
    throw new Error(`Response doesn't contain delimeter`)
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  private interperet(graphs: any[]): Graph[] {
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
