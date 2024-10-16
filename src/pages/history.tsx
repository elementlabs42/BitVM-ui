import { Accordion, ContentWithIcon, ContentWithIconAndAction, Label, PaginationPanel } from '@/components/controls'
import { Refresh } from '@/components/icons'
import { CircledChecked, PegIn, PegOut } from '@/components/icons/history'
import { Page } from '@/components/layout'
import { useBitvm } from '@/hooks/useBitvm'
import { GraphType } from '@/types'
import styled from 'styled-components'

export default function History() {
  const { response, isLoading } = useBitvm()
  console.log('response in history', response)
  return (
    <Page>
      <main>
        <Title>History</Title>
        <PaginationPanel isLoading={isLoading}>
          {response.data
            ? response.data?.map((graph, i) => (
                <Accordion key={i}>
                  <Graph icon={graph.type === GraphType.PEG_IN ? <PegIn /> : <PegOut />}>
                    <span>
                      {graph.type === GraphType.PEG_IN ? `Bridge ${graph.amount} BTC` : `Redeem ${graph.amount} eBTC`}{' '}
                      to {'not implemented'}
                    </span>
                    <span>{graph.status}</span>
                  </Graph>
                  {graph.transactions.map((tx, j) => (
                    <Transaction key={j} icon={<CircledChecked />} actionIcon={<Refresh />} onAction={() => {}}>
                      <span>transaction: {tx.txId}</span>
                      <span>{tx.status.confirmed ? 'Confirmed' : 'Pending'}</span>
                    </Transaction>
                  ))}
                </Accordion>
              ))
            : [<Label key={0} text="No graphs found" />]}
          {/* <Accordion>
            <Graph icon={<PegOut />}>
              <span>Redeem 2 eBTC to tb1qd28npep0s8frcm3y7dxqajkcy2m40eysplyr9v</span>
              <span>Pending</span>
            </Graph>
            <Transaction icon={<Signed />} actionIcon={<Refresh />} onAction={() => {}}>
              <span>Ethereum transaction: 0x8d62bf13ccfc8b7e66abb94d44ac53977c890395bc6d9621674a64e91a2934a5</span>
              <span>Signed</span>
            </Transaction>
            <Transaction icon={<Active />}>
              <span>Peg-out transaction: eda524639b7c7b920291ecf1b9c1084d8b538a8984918f4624922f503897bf0b</span>
              <span>Waiting for operators. Time remained: 2 Weeks 5 Days 10 Hours 38 Minutes 24 Seconds</span>
            </Transaction>
          </Accordion>
          <Accordion>
            <Graph icon={<PegOut />}>
              <span>Redeem 2 eBTC to tb1qd28npep0s8frcm3y7dxqajkcy2m40eysplyr9v</span>
              <span>Pending</span>
            </Graph>
            <Transaction icon={<Checked />} actionIcon={<Refresh />} onAction={() => {}}>
              <span>Ethereum transaction: 0x8d62bf13ccfc8b7e66abb94d44ac53977c890395bc6d9621674a64e91a2934a5</span>
              <span>Mined</span>
            </Transaction>
            <Transaction icon={<Active />}>
              <span>Peg-out transaction: eda524639b7c7b920291ecf1b9c1084d8b538a8984918f4624922f503897bf0b</span>
              <span>Waiting for operators. Time remained: 2 Weeks 5 Days 10 Hours 38 Minutes 24 Seconds</span>
            </Transaction>
          </Accordion>
          <Accordion>
            <Graph icon={<PegIn />}>
              <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
              <span>Pending</span>
              <span>I have 3 elements</span>
            </Graph>
          </Accordion>
          <Accordion>
            <GraphSized icon={<PegOut />}>
              <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
              <span>I get bigger with font-size</span>
            </GraphSized>
          </Accordion>
          <Accordion>
            <Graph icon={<Archived />}>
              <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
              <span>Pending</span>
            </Graph>
          </Accordion>
          <Accordion>
            <Graph icon={<Signed />}>
              <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
              <span>Pending</span>
            </Graph>
          </Accordion>
          <Accordion>
            <Graph icon={<TimedOut />}>
              <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
              <span>Pending</span>
            </Graph>
          </Accordion> */}
        </PaginationPanel>
      </main>
    </Page>
  )
}

const Title = styled.h1`
  margin: 0;
  padding: 0 1vw;
`

const Graph = styled(ContentWithIcon)``

const Transaction = styled(ContentWithIconAndAction)``

// const GraphSized = styled(Graph)`
//   font-size: 30px;
// `
