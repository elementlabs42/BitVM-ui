import { Page } from '@/components/Page'
import styled from 'styled-components'

export default function History() {
  return (
    <Page>
      <main>
        <h1>History</h1>
        <Panel>
          <h3>This page is under construction</h3>
          <h3>This page is under construction</h3>
          <h3>This page is under construction</h3>
          <h3>This page is under construction</h3>
        </Panel>
      </main>
    </Page>
  )
}

const Panel = styled.div`
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  min-height: 65vh;
  width: 100%;
  background-color: ${({ theme }) => theme.Background};
`
