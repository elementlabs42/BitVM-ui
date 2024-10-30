import { BitvmService } from '@/services/bitvm/bitvm'
import { BitvmReponseStatus, BitvmResponse, Env } from '@/types'
import { validate } from '@/services/validation'
import { getErrorOnly } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<BitvmResponse | string>) {
  const validation = validate(req)
  if (validation.status === 200) {
    const bitvm = new BitvmService(Env.TESTNET)
    const result = getUnusedPegInGraphs(bitvm)
    res.status(result.status === 'OK' ? 200 : 500).json(result)
  } else {
    res.status(validation.status).send(validation.error ?? 'Unknown error')
  }
}

function getUnusedPegInGraphs(client: BitvmService): BitvmResponse {
  try {
    return { status: BitvmReponseStatus.OK, data: client.getUnusedPegInGraphs() }
  } catch (err) {
    const error = getErrorOnly(err).message
    return { status: BitvmReponseStatus.NOK, error }
  }
}
