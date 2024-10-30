import styled from 'styled-components'

interface Props {
  onClick?: () => void
  children?: React.ReactNode
}

export const HIDDEN_Z_INDEX = 50

export function Hidden({ onClick, children }: Props) {
  return <Container onClick={onClick}>{children}</Container>
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: transparent;
  z-index: ${HIDDEN_Z_INDEX};
`
