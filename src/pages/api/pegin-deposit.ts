import { NextApiRequest, NextApiResponse } from 'next'
import { BitvmResponse } from '@/types'

export default function handler(req: NextApiRequest, res: NextApiResponse<BitvmResponse | string>) {
    return { status: 'OK' }
}
