import { BitvmService } from '@/services/bitvm/bitvm'
import { BitvmReponseStatus, BitvmResponse } from '@/types'
import { validate, ValidationResult } from '@/services/validation'
import { getErrorOnly } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { validateEthereumAddress } from '@/services/bitvm/validation'

type WithdrawerArgs = {
  address: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<BitvmResponse | string>) {
  const validation = validate(req, validateWithDrawer)
  if (validation.status === 200 && validation.args) {
    const bitvm = new BitvmService(validation.env)
    const result = getWithdrawerStatus(bitvm, validation.args.address)
    res.status(result.status === 'OK' ? 200 : 500).json(result)
  } else {
    res.status(validation.status).send(validation.error ?? 'Unknown error')
  }
}

function validateWithDrawer(
  req: NextApiRequest,
  result: ValidationResult<WithdrawerArgs>,
): ValidationResult<WithdrawerArgs> {
  const address = validateEthereumAddress(req)
  if (!address) {
    return { status: 400, error: 'Invalid ethereum address', env: result.env }
  } else {
    result.args = { ...result.args, address }
  }

  return result
}

function getWithdrawerStatus(client: BitvmService, address: string): BitvmResponse {
  try {
    return { status: BitvmReponseStatus.OK, data: client.getWithdrawerStatus(address) }
  } catch (err) {
    const error = getErrorOnly(err).message
    return { status: BitvmReponseStatus.NOK, error }
  }
}
