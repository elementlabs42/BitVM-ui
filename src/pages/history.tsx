import {
  Accordion,
  AccordionGroup,
  ContentWithIcon,
  ContentWithIconAndAction,
  PaginationPanel,
} from '@/components/controls'
import { Refresh } from '@/components/icons'
import { Active, CircledChecked, PegIn, PegOut } from '@/components/icons/history'
import { Page } from '@/components/layout'
import { useBridgePegOuts } from '@/hooks/ethereum/useBridge'
import { useBitvmHistory } from '@/hooks/useBitvm'
import { Graph, GraphType, TxType } from '@/types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'

export default function History() {
  const account = useAccount()
  const { response } = useBitvmHistory()
  const pegOutInitiatedEvents = useBridgePegOuts(account)
  const [graphs, setGraphs] = useState<Graph[]>()

  useEffect(() => {
    //TODO: match logs with peg out graph in response
    if (response && pegOutInitiatedEvents) {
      const newPegOutGraphs = pegOutInitiatedEvents.map((log) => ({
        graphId: '',
        amount: log.amount,
        type: GraphType.PEG_OUT,
        status: 'Peg Out Logged, waiting for operator ...',
        transactions: [],
        receipient: log.destinationAddress,
      }))
      setGraphs([...newPegOutGraphs, ...response])
    }
  }, [response, pegOutInitiatedEvents])
  return (
    <Page>
      <main>
        <Title>History</Title>
        <PaginationPanel>
          <AccordionGroup>
            {graphs &&
              graphs.map((graph, i) => (
                <Accordion key={i}>
                  <GraphItem icon={graph.type === GraphType.PEG_IN ? <PegIn /> : <PegOut />}>
                    <span>
                      {graph.type === GraphType.PEG_IN
                        ? `Bridge ${graph.amount} BTC to [recipient]`
                        : `Redeem ${graph.amount} eBTC to ${graph.receipient}`}
                    </span>
                    <span>{graph.status}</span>
                  </GraphItem>
                  {graph.transactions.map((tx, j) => {
                    const icon = tx.status.confirmed ? <CircledChecked /> : <Active />
                    const txName =
                      (tx.type === TxType.PEG_IN_DEPOSIT && 'Deposit') ||
                      (tx.type === TxType.PEG_IN_CONFIRM && 'Confirm') ||
                      (tx.type === TxType.PEG_IN_REFUND && 'Refund') ||
                      (tx.type === TxType.PEG_OUT && 'Peg Out') ||
                      'Unknown'
                    return (
                      <Transaction
                        key={j}
                        icon={icon}
                        actionIcon={tx.status.confirmed ? undefined : <Refresh />}
                        onAction={() => {}}
                      >
                        <span>
                          {txName} Transaction: {tx.txId}
                        </span>
                        <span>{tx.status.confirmed ? 'Confirmed' : 'Pending'}</span>
                      </Transaction>
                    )
                  })}
                </Accordion>
              ))}
          </AccordionGroup>
        </PaginationPanel>
      </main>
    </Page>
  )
}

const Title = styled.h1`
  margin: 0;
  padding: 0 1vw;
`

const GraphItem = styled(ContentWithIcon)``

const Transaction = styled(ContentWithIconAndAction)``
