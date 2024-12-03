import { BitvmService } from '@/services/bitvm/bitvm'
import { BitvmReponseStatus, BitvmResponse, SignaturesArgs } from '@/types'
import { validate, ValidationResult } from '@/services/validation'
import { getErrorOnly } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  validateBitcoinPublicKey,
  validateEthereumAddress,
  validateOutpoint,
  validateSatoshis,
  validateSignatures,
} from '@/services/bitvm/validation'

export default function handler(req: NextApiRequest, res: NextApiResponse<BitvmResponse | string>) {
  const validation = validate(req, validateHistory)
  if (validation.status === 200 && validation.args) {
    const bitvm = new BitvmService(validation.env)
    const result = postSignatures(bitvm, validation.args)
    res.status(result.status === 'OK' ? 200 : 500).json(result)
  } else {
    res.status(validation.status).send(validation.error ?? 'Unknown error')
  }
}

function validateHistory(
  req: NextApiRequest,
  result: ValidationResult<SignaturesArgs>,
): ValidationResult<SignaturesArgs> {
  const pubkey = validateBitcoinPublicKey(req)
  if (!pubkey) {
    return { status: 400, error: 'Invalid bitcoin public key', env: result.env }
  } else {
    result.args = { pubkey, address: '', outpoint: '', sat: 0n, deposit: '', confirm: '', refund: '' }
  }

  const address = validateEthereumAddress(req)
  if (!address) {
    return { status: 400, error: 'Invalid ethereum address', env: result.env }
  } else {
    result.args = { ...result.args, address }
  }

  const outpoint = validateOutpoint(req)
  if (!outpoint) {
    return { status: 400, error: 'Invalid Outpoint', env: result.env }
  } else {
    result.args = { ...result.args, outpoint }
  }

  const sat = validateSatoshis(req)
  if (!sat) {
    return { status: 400, error: 'Invalid Satoshis', env: result.env }
  } else {
    result.args = { ...result.args, sat }
  }

  const signatures = validateSignatures(req)
  if (!signatures) {
    return { status: 400, error: 'Invalid signatures', env: result.env }
  } else {
    result.args = { ...result.args, ...signatures }
  }

  return result
}

function postSignatures(client: BitvmService, args: SignaturesArgs): BitvmResponse {
  try {
    return { status: BitvmReponseStatus.OK, data: client.postSignatures(args) }
  } catch (err) {
    const error = getErrorOnly(err).message
    return { status: BitvmReponseStatus.NOK, error }
  }
}
