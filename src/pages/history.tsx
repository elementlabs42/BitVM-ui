import Summary from '@/components/accordion/Summary'
import { Active, Archived, Checked, PegIn, PegOut, Signed, TimedOut } from '@/components/icons/history'
import { Page } from '@/components/Page'
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
          </Summary>
          <Summary icon={<PegOut />}>
            <span>Brdige 1 BTC to 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
            <span>Pending</span>
          </Summary>
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
  padding: 0 2vw;
  display: flex;
  flex-direction: column;
  row-gap: 2vh;
  min-height: 60vh;
  background-color: ${({ theme }) => theme.Background};
  box-shadow:
    0px 20px 24px -4px ${({ theme }) => theme.ShadowInner},
    0px 8px 8px -4px ${({ theme }) => theme.ShadowOuter};
`
