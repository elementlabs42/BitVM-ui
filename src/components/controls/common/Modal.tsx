import { ReactNode } from 'react'
import styled from 'styled-components'
import { Hidden, HIDDEN_Z_INDEX } from './Hidden'
import { Borders } from '@/constants/themes'

interface Props {
  children: ReactNode
  close?: () => void
  className?: string
}

export function Modal({ children, close, className }: Props) {
  return (
    <Container>
      <Hidden onClick={close} />
      <Content className={className}>{children}</Content>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.ModalBackgroundTransparent};
  z-index: 2;
`

// Position Modal using top and left properties
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 368px;
  border: 1px solid ${({ theme }) => theme.ModalBorder};
  overflow: hidden;
  background-color: ${({ theme }) => theme.Background};
  border-radius: ${Borders.ModalRadius};
  box-shadow: 0px 8px 32px ${({ theme }) => theme.ModalShadow};
  z-index: ${HIDDEN_Z_INDEX + 1};
`
