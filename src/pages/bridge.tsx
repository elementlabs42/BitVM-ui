import { Page } from '@/components/layout'
import { Panel } from '@/components/layout/Panel'
import styled from 'styled-components'

export default function Bridge() {
  return (
    <Page>
      <Title>Bridge</Title>
      <Panel></Panel>
    </Page>
  )
}

const Title = styled.h1`
  margin: 0;
  padding: 0 1vw;
`
