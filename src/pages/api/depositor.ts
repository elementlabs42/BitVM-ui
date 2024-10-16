import { BitvmService } from '@/services/bitvm/bitvm'
import { BitvmReponseStatus, BitvmResponse, Env } from '@/types'
import { validate, ValidationResult } from '@/services/validation'
import { getErrorOnly } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { validateBitcoinPublicKey } from '@/services/bitvm/validation'

type DepositorArgs = {
  pubkey: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<BitvmResponse | string>) {
  const validation = validate(req, validateDepositor)
  if (validation.status === 200 && validation.args) {
    const bitvm = new BitvmService(Env.TESTNET)
    const result = getDepositorStatus(bitvm, validation.args.pubkey)
    res.status(result.status === 'OK' ? 200 : 500).json(result)
  } else {
    res.status(validation.status).send(validation.error ?? 'Unknown error')
  }
}

function validateDepositor(req: NextApiRequest): ValidationResult<DepositorArgs> {
  const result: ValidationResult<DepositorArgs> = { status: 200 }
  const pubkey = validateBitcoinPublicKey(req)
  if (!pubkey) {
    return { status: 400, error: 'Invalid bitcoin public key' }
  } else {
    result.args = { pubkey }
  }
  return result
}

function getDepositorStatus(client: BitvmService, publicKey: string): BitvmResponse {
  try {
    return { status: BitvmReponseStatus.OK, data: client.getDepositorStatus(publicKey) }
  } catch (err) {
    const error = getErrorOnly(err).message
    return { status: BitvmReponseStatus.NOK, error }
  }
}
