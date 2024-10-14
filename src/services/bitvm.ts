import fs from 'fs'
import p from 'path'
import { execSync } from 'child_process'
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
}

export enum BitvmReponseStatus {
  OK = 'OK',
  NOK = 'NOK',
}

export type BitvmResponse = {
  status: BitvmReponseStatus
  data?: UpstreamResponse
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

  getDepositorStatus(publicKey: string) {
    if (!BitvmService.validateBitcoinPublicKey(publicKey)) {
      throw new Error('Invalid bitcoin public key')
    }
    return this.call<DepositorStatus>(Command.DEPOSITOR, [publicKey])
  }

  getWithdrawerStatus(address: string) {
    if (!ethers.isAddress(address)) {
      throw new Error('Invalid ethereum address')
    }
    return this.call<WithdrawerStatus>(Command.WITHDRAWER, [address])
  }

  static validateCommand(input: string) {
    return Object.values(Command).find((cmd) => cmd.toString() === input.toLowerCase())
  }

  static validateBitcoinPublicKey(publicKeyHex: string) {
    const publicKeyBytes = Buffer.from(publicKeyHex, 'hex')
    return publicKeyBytes.toString('hex') === publicKeyHex && bitcoin.script.isCanonicalPubKey(publicKeyBytes)
  }

  private call<T extends UpstreamResponse>(cmd: Command, args: string[]): T {
    const command = `${this.path}${this.exec} -e ${this.env} -p ${this.path} ${cmd} ${args.join(' ')}`
    const output = execSync(command, { cwd: this.path, stdio: 'pipe' })
    return this.prepareResponse<T>(output.toString())
  }

  private prepareResponse<T extends UpstreamResponse>(output: string): T {
    const response = output.split(DEFAULT_DELIMITER_TOKEN)
    if (response.length === 2) {
      try {
        const obj = JSON.parse(response[1])
        if (obj.status === BitvmReponseStatus.OK) {
          if (obj.data.depositor_status) {
            return {
              pegInGraphId: String(obj.data.peg_in_graph),
              status: String(obj.data.depositor_status),
              pegInConfirm: String(obj.data.peg_in_confirm),
              pegInDeposit: String(obj.data.peg_in_deposit),
              pegInRefund: String(obj.data.peg_in_refund),
            } as T
          } else {
            return {
              pegOutGraphId: String(obj.data.peg_out_graph),
              status: String(obj.data.withdrawer_status),
              pegOut: empty(obj.data.peg_out) ? undefined : String(obj.peg_out),
            } as T
          }
        } else {
          throw new Error(obj.error)
        }
      } catch {
        throw new Error(`Failed to parse response: ${response[1]}`)
      }
    }
    throw new Error(`Response doesn't contain delimeter: ${output}`)
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
