import { BitvmReponseStatus, BitvmResponse, BitvmService, Env } from '@/services/bitvm'
import { validate, ValidationResult } from '@/services/validation'
import { getErrorOnly } from '@/utils'
import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'

type WithdrawerArgs = {
  address: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<BitvmResponse | string>) {
  const validation = validate(req, validateWithDrawer)
  if (validation.status === 200 && validation.args) {
    const bitvm = new BitvmService(Env.TESTNET)
    const result = getWithdrawerStatus(bitvm, validation.args.address)
    res.status(result.status === 'OK' ? 200 : 500).json(result)
  } else {
    res.status(validation.status).send(validation.error ?? 'Unknown error')
  }
}

function validateWithDrawer(req: NextApiRequest): ValidationResult<WithdrawerArgs> {
  const result: ValidationResult<WithdrawerArgs> = { status: 200 }

  if (!(req.query.address && typeof req.query.address === 'string' && ethers.isAddress(req.query.address))) {
    return { status: 400, error: 'Invalid ethereum address' }
  } else {
    result.args = { ...result.args, address: req.query.address }
  }

  return result
}

function getWithdrawerStatus(client: BitvmService, address: string): BitvmResponse {
  try {
    return { status: BitvmReponseStatus.OK, data: client.getWithdrawerStatus(address) }
  } catch (err) {
    const error = getErrorOnly(err).message
    console.log(error)
    return { status: BitvmReponseStatus.NOK, error: 'Internal error' }
  }
}
