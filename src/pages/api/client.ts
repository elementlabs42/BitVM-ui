// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BitvmService, Env } from '@/services/bitvm'
import { getErrorOnly } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const result = getDepositorStatus(req.query.address as string)
  console.log(result)
  res.status(200).json({ name: 'John Doe' })
}

function getDepositorStatus(address: string) {
  try {
    const bitvm = new BitvmService(Env.TESTNET)
    return bitvm.getDepositorStatus(address)
  } catch (error) {
    console.log(error)
    console.log(getErrorOnly(error).message)
  }
}
