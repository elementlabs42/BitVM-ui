import { useBitvmSignatures, useBitvmTransactions } from '@/hooks/useBitvm'
import { Signatures } from '@/types'

//TODO delete me
export default function Debug() {
  const { response, error } = useBitvmTransactions()

  const signatures: Signatures = {
    deposit: 'deposit-signature',
    confirm: 'confirm-signature',
    refund: 'refund-signature',
  }

  const { success, error: signatureError } = useBitvmSignatures(signatures)
  return (
    <div>
      <h1>Debug</h1>
      <h3>Transactions</h3>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <pre>{error}</pre>
      <h3>Signatures</h3>
      <pre>{'post signatures: ' + success}</pre>
      <pre>{signatureError}</pre>
    </div>
  )
}
