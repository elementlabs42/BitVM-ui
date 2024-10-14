import fs from 'fs'
import p from 'path'
import { spawnSync } from 'child_process'
import { empty, getErrorOnly } from '@/utils'
import * as bitcoin from 'bitcoinjs-lib'
import * as ethers from 'ethers'

const DEFAULT_PATH = 'bitvm/'
const DEFAULT_EXEC = 'cli-query'
const DEFAULT_DELIMITER_TOKEN = '>>>> BitVM Query Response <<<<'

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
  data?: UpstreamResponse[]
  error?: string
}

export type DepositorStatus = {
  pegInGraphId: string
  status: string
  pegInConfirm: string
  pegInDeposit: string
  pegInRefund: string
}

export type WithdrawerStatus = {
  pegOutGraphId: string
  status: string
  pegOut?: string
}

type UpstreamResponse = DepositorStatus | WithdrawerStatus

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
    if (!ethers.isAddress(address)) {
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
    if (!ethers.isAddress(address)) {
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

  private call(subCommand: Command, args: string[]): UpstreamResponse[] {
    const exec = `${this.path}${this.exec}`
    const options = `-e ${this.env} -p ${this.path}`.split(' ')
    const output = spawnSync(exec, [...options, subCommand, ...args], { cwd: this.path, stdio: [null, 'pipe', 'pipe'] })
    return this.prepareResponse(output.stdout.toString())
  }

  private prepareResponse(output: string): UpstreamResponse[] {
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
          const data: UpstreamResponse[] = []
          for (const item of obj.data) {
            if (item.peg_in_graph) {
              data.push({
                pegInGraphId: String(item.peg_in_graph),
                status: String(item.depositor_status),
                pegInConfirm: String(item.peg_in_confirm),
                pegInDeposit: String(item.peg_in_deposit),
                pegInRefund: String(item.peg_in_refund),
              })
            } else {
              data.push({
                pegOutGraphId: String(item.peg_out_graph),
                status: String(item.withdrawer_status),
                pegOut: empty(item.peg_out) ? undefined : String(item.peg_out),
              })
            }
          }
          return data
        } else {
          throw new Error('Invalid response, data is not vector')
        }
      } else {
        throw new Error(`Upsteam error: ${obj.error}`)
      }
    }
    throw new Error(`Response doesn't contain delimeter`)
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
