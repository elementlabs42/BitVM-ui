import { Env } from '@/types'
import { NextApiRequest } from 'next'

export type ValidationResult<Args> = {
  status: number
  env: Env
  error?: string
  args?: Args
}

function validateMethods(req: NextApiRequest) {
  if (req.method !== 'GET') {
    if (!req.url?.startsWith('/api/signatures')) {
      return { status: 405, error: 'Method not allowed' }
    }
  }
}

export function validate<Args>(
  req: NextApiRequest,
  customValidate?: (req: NextApiRequest, result: ValidationResult<Args>) => ValidationResult<Args>,
): ValidationResult<Args> {
  const methodResult = validateMethods(req)
  if (methodResult) {
    return methodResult as ValidationResult<Args>
  }

  const env: Env = Env[process.env.BITVM_ENV as keyof typeof Env] ?? Env.LOCAL
  const result = { status: 200, env }
  if (customValidate) {
    return customValidate(req, result)
  }
  return result
}
