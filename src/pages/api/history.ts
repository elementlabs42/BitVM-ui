import { BitvmService } from '@/services/bitvm/bitvm'
import { BitvmReponseStatus, BitvmResponse } from '@/types'
import { validate, ValidationResult } from '@/services/validation'
import { getErrorOnly } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { validateBitcoinPublicKey, validateEthereumAddress } from '@/services/bitvm/validation'

type HistoryArgs = {
  pubkey: string
  address: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<BitvmResponse | string>) {
  const validation = validate(req, validateHistory)
  if (validation.status === 200 && validation.args) {
    const bitvm = new BitvmService(validation.env)
    const result = getHistory(bitvm, validation.args.pubkey, validation.args.address)
    res.status(result.status === 'OK' ? 200 : 500).json(result)
  } else {
    res.status(validation.status).send(validation.error ?? 'Unknown error')
  }
}

function validateHistory(req: NextApiRequest, result: ValidationResult<HistoryArgs>): ValidationResult<HistoryArgs> {
  const pubkey = validateBitcoinPublicKey(req)
  if (!pubkey) {
    return { status: 400, error: 'Invalid bitcoin public key', env: result.env }
  } else {
    result.args = { pubkey, address: '' }
  }

  const address = validateEthereumAddress(req)
  console.log(address)
  if (!address) {
    return { status: 400, error: 'Invalid ethereum address', env: result.env }
  } else {
    result.args = { ...result.args, address }
  }

  return result
}

function getHistory(client: BitvmService, pubkey: string, address: string): BitvmResponse {
  try {
    return { status: BitvmReponseStatus.OK, data: client.getHistory(pubkey, address) }
  } catch (err) {
    const error = getErrorOnly(err).message
    return { status: BitvmReponseStatus.NOK, error }
  }
}
