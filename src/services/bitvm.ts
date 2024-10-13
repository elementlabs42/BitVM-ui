import fs from 'fs'
import p from 'path'
import { execSync } from 'child_process'
import { getErrorOnly } from '@/utils'
import * as bitcoin from 'bitcoinjs-lib'
import { isAddress } from 'ethers'

const DEFAULT_PATH = 'bitvm/'
const DEFAULT_EXEC = 'cli-query'
const DEFAULT_DELIMITER = '>>>> BitVM Query Response <<<<'

export enum Env {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

enum Command {
  DEPOSITOR_STATUS = 'depositor',
  WITHDRAWER_STATUS = 'withdrawer',
}

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

  getDepositorStatus(address: string) {
    if (!this.validateDepositorAddress(address)) {
      throw new Error('Invalid bitcoin address')
    }
    return this.call(Command.DEPOSITOR_STATUS, [address])
  }

  getWithdrawerStatus(address: string) {
    if (!this.validateWithdrawerAddress(address)) {
      throw new Error('Invalid ethereum address')
    }
    return this.call(Command.WITHDRAWER_STATUS, [address])
  }

  private call(cmd: Command, args: string[]) {
    const command = `${this.path}${this.exec} -e ${this.env} -p ${this.path} ${cmd} ${args.join(' ')}`
    const output = execSync(command, { cwd: this.path, stdio: 'pipe' })
    return this.prepareResponse(output.toString())
  }

  private prepareResponse(output: string) {
    const response = output.split(DEFAULT_DELIMITER)
    if (response.length === 2) {
      try {
        return JSON.parse(response[1])
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

  private validateDepositorAddress(address: string) {
    try {
      const u8 = Buffer.from(address, 'hex')
      console.log(u8)
      bitcoin.address.fromOutputScript(u8)
    } catch (error) {
      console.log(error)

      try {
        bitcoin.address.fromBech32(address)
      } catch (error) {
        console.log(error)

        try {
          bitcoin.address.fromBase58Check(address)
        } catch (error) {
          console.log(error)
        }
      }
    }
    return !!bitcoin.address.fromBase58Check(address)
  }

  private validateWithdrawerAddress(address: string) {
    return isAddress(address)
  }
}
