import styled from 'styled-components'
import { ReactNode } from 'react'

interface Props {
  label: ReactNode
  valid?: boolean
  warning?: ReactNode
  input: ReactNode
  className?: string
}

export function withLabel({ label, valid = true, warning, input, className }: Props) {
  return (
    <Container className={className}>
      <Wrapper>{label}</Wrapper>
      {input}
      {warning && !valid && <Wrapper>{warning}</Wrapper>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5em;
`

const Wrapper = styled.div``
