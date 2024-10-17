import { NextApiRequest } from 'next'

export type ValidationResult<Args> = {
  status: number
  error?: string
  args?: Args
}

function getMethodOnly(req: NextApiRequest) {
  if (req.method !== 'GET') {
    return { status: 405, error: 'Method not allowed' }
  }
}

export function validate<Args>(req: NextApiRequest, customValidate?: (req: NextApiRequest) => ValidationResult<Args>) {
  const methodResult = getMethodOnly(req)
  if (methodResult) {
    return methodResult as ValidationResult<Args>
  }

  if (customValidate) {
    return customValidate(req)
  } else {
    return { status: 200 }
  }
}
