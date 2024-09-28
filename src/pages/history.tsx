import Summary from '@/components/accordion/Summary'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Refresh } from '@/components/icons'
import { Active, Archived, Checked, PegIn, PegOut, Signed, TimedOut } from '@/components/icons/history'
import { Page } from '@/components/Page'
import { Borders } from '@/constants/themes'
import styled from 'styled-components'

export default function History() {
  return (
    <Page>
      <main>
        <Title>History</Title>
        <Panel>
          <Summary icon={<Checked />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>Pending</span>
          </Summary>
          <Summary icon={<PegIn />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>Pending</span>
            <span>I have 3 elements</span>
          </Summary>
          <SizedSummary icon={<PegOut />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>I get bigger with font-size</span>
          </SizedSummary>
          <Summary icon={<Active />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>Pending</span>
          </Summary>
          <Summary icon={<Archived />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>Pending</span>
          </Summary>
          <Summary icon={<Signed />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>Pending</span>
          </Summary>
          <Summary icon={<TimedOut />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>Pending</span>
          </Summary>
          <Summary icon={<ChevronUp />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>Pending</span>
          </Summary>
          <Summary icon={<ChevronRight />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>Pending</span>
          </Summary>
          <Summary icon={<ChevronDown />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>Pending</span>
          </Summary>
          <Summary icon={<ChevronLeft />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>Pending</span>
          </Summary>
          <Summary icon={<Refresh />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>Pending</span>
          </Summary>
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
  row-gap: 2vh;
  min-height: 60vh;
  background-color: ${({ theme }) => theme.Background};
  border-radius: ${Borders.PanelRadius};
  box-shadow:
    0px 20px 24px -4px ${({ theme }) => theme.ShadowInner},
    0px 8px 8px -4px ${({ theme }) => theme.ShadowOuter};
`

const SizedSummary = styled(Summary)`
  font-size: 30px;
`
