import styled from 'styled-components'
import { Pulse } from './Animation'
import { ReactNode } from 'react'

export function Loading({ children }: { children?: ReactNode }) {
  return <Container>{children ? children : 'Loading ...'}</Container>
}

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${Pulse}
`
