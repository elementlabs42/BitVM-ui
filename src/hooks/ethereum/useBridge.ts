import { useEffect, useState } from 'react'
import { UseAccountReturnType } from 'wagmi'
import { getPegOutLogs } from './transactions'
import { PegOutInitiated } from '@/types'

export function useBridgePegOuts(account: UseAccountReturnType) {
  const [pegOutLogs, setPegOutLogs] = useState<PegOutInitiated[]>()

  useEffect(() => {
    ;(async () => {
      if (account.chain) {
        const logs = await getPegOutLogs(account.chain)
        setPegOutLogs(
          logs.map((log) => ({
            withdrawer: log.args.withdrawer || '0x',
            destinationAddress: log.args.destinationAddress || '',
            sourceOutpoint: {
              txid: (log.args.sourceOutpoint && log.args.sourceOutpoint.txId) || '0x',
              vout: log.args.sourceOutpoint ? Number(log.args.sourceOutpoint.vOut) : 0,
            },
            amount: log.args.amount || 0n,
            operatorPubkey: log.args.operatorPubkey || '0x',
            block: log.blockNumber,
          })),
        )
      }
    })()
  }, [account.chain])

  return pegOutLogs
}
