import { NextApiRequest, NextApiResponse } from 'next'
import { BitvmReponseStatus, BitvmResponse, Env } from '@/types'
import { validateBitcoinDepositAmount, validateBitcoinPublicKey, validateEthereumAddress } from '@/services/bitvm/validation'
import { BitvmService } from '@/services/bitvm/bitvm'

export default function handler(req: NextApiRequest, res: NextApiResponse<BitvmResponse | string>) {
  const pubkey = req.query.pubkey
  /*  if (!pubkey) {
    res.status(400).json('Invalid bitcoin public key')
    return
  }*/
  const amount = validateBitcoinDepositAmount(req)
  if (!amount) {
    res.status(400).json('Invalid bitcoin deposit amount')
    return
  }
  const recipient = validateEthereumAddress(req)
  if (!recipient) {
    res.status(400).json('Invalid ethereum address')
    return
  }
  const bitvm = new BitvmService(Env.TESTNET)
  const response = bitvm.getDepositPeginTx(pubkey as string, amount, recipient as string)
  res.status(200).json({ status: BitvmReponseStatus.OK, data: response })
}
