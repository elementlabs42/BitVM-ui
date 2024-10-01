import styled from 'styled-components'
import { ReactNode } from 'react'
import { Help } from '../icons'

interface Props {
  text: ReactNode
  className?: string
}

export function Label({ text, className }: Props) {
  return (
    <Container className={className}>
      {text}
      <Help />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.2em;
  font-size: 0.8em;
  color: ${({ theme }) => theme.Text};
`

export const Warning = styled(Label)`
  color: ${({ theme }) => theme.Warning};
`
