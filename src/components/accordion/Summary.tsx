import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode
  className?: string
}

export default function Summary({ children, className }: Props) {
  return (
    <IconContainer className={className}>
      <Icon />
      <Container>{children}</Container>
    </IconContainer>
  )
}

const IconContainer = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  min-height: 65vh;
  width: 100%;
  background-color: ${({ theme }) => theme.Background};
`

const Icon = styled.div`
  margin-right: 10px;
  font-size: 20px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`
