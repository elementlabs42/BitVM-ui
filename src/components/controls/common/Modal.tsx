import { ReactNode } from 'react'
import styled from 'styled-components'
import { Hidden, HIDDEN_Z_INDEX } from './Hidden'
import { X } from '@/components/icons/X'
import { RoundedIcon } from '../Rounded'
import { Borders } from '@/constants/themes'

interface Props {
  title: string
  children: ReactNode
  close?: () => void
  className?: string
}

export function Modal({ title, children, close, className }: Props) {
  return (
    <Container>
      <Hidden onClick={close} />
      <Content className={className}>
        <Header>
          <Spacer />
          <Title>{title}</Title>
          <CloseIcon icon={<X />} size={0.6} onClick={close} />
        </Header>
        {children}
      </Content>
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
  padding: 0.5em 1em;
  border: 1px solid ${({ theme }) => theme.ModalBorder};
  overflow: hidden;
  background-color: ${({ theme }) => theme.Background};
  border-radius: ${Borders.ModalRadius};
  box-shadow: 0px 8px 32px ${({ theme }) => theme.ModalShadow};
  z-index: ${HIDDEN_Z_INDEX + 1};
`

const Header = styled.div`
  padding: 0.5em 0 0.5em 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.Background};
  color: ${({ theme }) => theme.Text};
`

const Title = styled.h4`
  margin: 0;
  padding: 0;
`

const CloseIcon = styled(RoundedIcon)`
  padding: 0.7em;
  margin: 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.HoverArea};
`

const Spacer = styled.div`
  padding: 0.5em;
  width: 1em;
`
