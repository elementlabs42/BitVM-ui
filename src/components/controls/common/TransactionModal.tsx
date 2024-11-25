import { ReactNode } from 'react'
import styled from 'styled-components'
import { X } from '@/components/icons/X'
import { Modal } from './Modal'
import { RoundedIcon } from '../Rounded'
import { Wallet, PatternCircle } from '@/components/icons'
import { BackgroundPattern } from './BackgroundPattern'
import { Borders } from '@/constants/themes'

interface Props {
  children: ReactNode
  close?: () => void
  className?: string
}

export function TransactionModal({ children, close, className }: Props) {
  return (
    <ModalStyled close={close} className={className}>
      <BackgroundContainer>
        <BackgroundPosition>
          <BackgroundPattern svg={<ColoredPattern />} />
        </BackgroundPosition>
      </BackgroundContainer>
      <Header>
        <ModalIcon icon={<ColoredWallet />} size={1.5} noBorder={true} />
        <CloseIcon icon={<X />} size={0.6} onClick={close} noBorder={true} />
      </Header>
      <Content>{children}</Content>
    </ModalStyled>
  )
}

const ModalStyled = styled(Modal)`
  border-radius: ${Borders.PanelRadius};
`

const Header = styled.div`
  padding: 0.5em 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.Background};
  color: ${({ theme }) => theme.Text};
`

const ModalIcon = styled(RoundedIcon)`
  margin: 0.5em 0.5em 0.5em 0;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.HoverArea};
`

const ColoredWallet = styled(Wallet)`
  height: 0.8em;
  color: #079455;
`

const CloseIcon = styled(RoundedIcon)`
  padding: 0.7em;
  margin: 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.HoverArea};
`

const BackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const BackgroundPosition = styled.div`
  position: absolute;
  left: 0;
`

const ColoredPattern = styled(PatternCircle)`
  width: 158px;
  height: 158px;
  color: ${({ theme }) => theme.FooterText};
`

const Content = styled.div`
  width: 100%;
  padding: 0 1em;
  z-index: 1;
`
