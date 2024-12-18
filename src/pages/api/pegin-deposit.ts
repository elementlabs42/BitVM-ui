import { NextApiRequest, NextApiResponse } from 'next'
import { BitvmReponseStatus, BitvmResponse, Env } from '@/types'
import { validateBitcoinDepositAmount, validateBitcoinPublicKey, validateEthereumAddress } from '@/services/bitvm/validation'
import { BitvmService } from '@/services/bitvm/bitvm'

export default function handler(req: NextApiRequest, res: NextApiResponse<BitvmResponse | string>) {
  const pubkey = req.query.pubkey
  const amount = req.query.amount
  const recipient = validateEthereumAddress(req)
  if (!recipient) {
    res.status(400).json('Invalid ethereum address')
    return
  }
  const bitvm = new BitvmService(Env.TESTNET)
  const response = bitvm.getDepositPeginTx("02edf074e2780407ed6ff9e291b8617ee4b4b8d7623e85b58318666f33a422301b", 50000n, recipient as string)
  res.status(200).json({ status: BitvmReponseStatus.OK, data: response })
}
