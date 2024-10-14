import { BitvmReponseStatus, BitvmResponse, BitvmService, Env } from '@/services/bitvm'
import { validate, ValidationResult } from '@/services/validation'
import { getErrorOnly } from '@/utils'
import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'

type WithdrawerArgs = {
  pubkey: string
  address: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<BitvmResponse | string>) {
  const validation = validate(req, validateHistory)
  if (validation.status === 200 && validation.args) {
    const bitvm = new BitvmService(Env.TESTNET)
    const result = getHistory(bitvm, validation.args.pubkey, validation.args.address)
    res.status(result.status === 'OK' ? 200 : 500).json(result)
  } else {
    res.status(validation.status).send(validation.error ?? 'Unknown error')
  }
}

function validateHistory(req: NextApiRequest): ValidationResult<WithdrawerArgs> {
  const result: ValidationResult<WithdrawerArgs> = { status: 200 }

  if (
    !(
      req.query.pubkey &&
      typeof req.query.pubkey === 'string' &&
      BitvmService.validateBitcoinPublicKey(req.query.pubkey)
    )
  ) {
    return { status: 400, error: 'Invalid bitcoin public key' }
  } else {
    result.args = { pubkey: req.query.pubkey, address: '' }
  }

  if (!(req.query.address && typeof req.query.address === 'string' && ethers.isAddress(req.query.address))) {
    return { status: 400, error: 'Invalid ethereum address' }
  } else {
    result.args = { ...result.args, address: req.query.address }
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
