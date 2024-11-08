import { ReactNode } from 'react'
import styled from 'styled-components'
import { X } from '@/components/icons/X'
import { RoundedIcon } from '../Rounded'
import { Modal } from './Modal'

interface Props {
  title: string
  children: ReactNode
  close?: () => void
  className?: string
}

export function WalletModal({ title, children, close, className }: Props) {
  return (
    <ModalStyled close={close} className={className}>
      <Header>
        <Spacer />
        <Title>{title}</Title>
        <CloseIcon icon={<X />} size={0.6} onClick={close} />
      </Header>
      {children}
    </ModalStyled>
  )
}

const ModalStyled = styled(Modal)`
  padding: 0.5em 1em;
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
