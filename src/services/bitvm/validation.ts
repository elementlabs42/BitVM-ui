import { NextApiRequest } from 'next'
import { BitvmService } from './bitvm'
import { isAddress } from 'viem'

export function validateBitcoinPublicKey(req: NextApiRequest): string | undefined {
  if (
    req.query.pubkey &&
    typeof req.query.pubkey === 'string' &&
    BitvmService.validateBitcoinPublicKey(req.query.pubkey)
  ) {
    return req.query.pubkey
  }
}

export function validateEthereumAddress(req: NextApiRequest): string | undefined {
  if (req.query.address && typeof req.query.address === 'string' && isAddress(req.query.address)) {
    return req.query.address
  }
}
