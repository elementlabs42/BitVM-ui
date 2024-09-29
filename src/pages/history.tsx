import { Accordion, ContentWithIcon } from '@/components/controls'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Refresh } from '@/components/icons'
import { Active, Archived, PegIn, PegOut, Signed, TimedOut } from '@/components/icons/history'
import { Page } from '@/components/layout'
import { Borders } from '@/constants/themes'
import styled from 'styled-components'

export default function History() {
  return (
    <Page>
      <main>
        <Title>History</Title>
        <Panel>
          <Accordion>
            <Graph icon={<PegOut />}>
              <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
              <span>Pending</span>
            </Graph>
            <Transaction icon={<Signed />}>
              <span>Ethereum transaction: 0x8d62bf13ccfc8b7e66abb94d44ac53977c890395bc6d9621674a64e91a2934a5</span>
              <span>Signed</span>
            </Transaction>
            <Transaction icon={<Active />}>
              <span>Peg-out transaction: eda524639b7c7b920291ecf1b9c1084d8b538a8984918f4624922f503897bf0b</span>
              <span>Waiting for operators. Time remained: 2 Weeks 5 Days 10 Hours 38 Minutes 24 Seconds</span>
            </Transaction>
          </Accordion>
          <Accordion>
            <Graph icon={<Active />}>
              <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
              <span>Pending</span>
            </Graph>
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
          </Accordion>
          <Accordion>
            <Graph icon={<ChevronUp />}>
              <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
              <span>Pending</span>
            </Graph>
          </Accordion>
          <Accordion>
            <Graph icon={<ChevronRight />}>
              <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
              <span>Pending</span>
            </Graph>
          </Accordion>
          <Accordion>
            <Graph icon={<ChevronDown />}>
              <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
              <span>Pending</span>
            </Graph>
          </Accordion>
          <Accordion>
            <Graph icon={<ChevronLeft />}>
              <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
              <span>Pending</span>
            </Graph>
          </Accordion>
          <Accordion>
            <Graph icon={<Refresh />}>
              <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
              <span>Pending</span>
            </Graph>
          </Accordion>
        </Panel>
      </main>
    </Page>
  )
}

const Title = styled.h1`
  margin: 0;
  padding: 0 1vw;
`

const Panel = styled.div`
  margin: 3vh 0;
  padding: 1vh 2vw 1.6vw 2vw;
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  background-color: ${({ theme }) => theme.Background};
  border-radius: ${Borders.PanelRadius};
  box-shadow:
    0px 20px 24px -4px ${({ theme }) => theme.ShadowInner},
    0px 8px 8px -4px ${({ theme }) => theme.ShadowOuter};
`

const Graph = styled(ContentWithIcon)``

const Transaction = styled(ContentWithIcon)``

const GraphSized = styled(Graph)`
  font-size: 30px;
`
