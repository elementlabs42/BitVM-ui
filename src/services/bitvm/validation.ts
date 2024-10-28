import { NextApiRequest } from 'next'
import { BitvmService } from './bitvm'
import { isAddress } from 'viem'
import { Signatures } from '@/types'

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

export function validateOutpoint(req: NextApiRequest): string | undefined {
  if (
    req.query.outpoint &&
    typeof req.query.outpoint === 'string' &&
    BitvmService.validateOutpoint(req.query.outpoint)
  ) {
    return req.query.outpoint
  }
}

export function validateSatoshis(req: NextApiRequest): bigint | undefined {
  if (req.query.sat && typeof req.query.sat === 'string') {
    try {
      return BigInt(req.query.sat)
    } catch {
      // do nothing
    }
  }
}

export function validateSignatures(req: NextApiRequest): Signatures | undefined {
  if (
    req.body.deposit &&
    typeof req.body.deposit === 'string' &&
    req.body.confirm &&
    typeof req.body.confirm === 'string' &&
    req.body.refund &&
    typeof req.body.refund === 'string'
  ) {
    return { deposit: req.body.deposit, confirm: req.body.confirm, refund: req.body.refund }
  }
}
