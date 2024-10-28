import { IconProps } from '@/components/icons/_base'
import { Borders } from '@/constants/themes'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

type Props = {
  icon: ReactElement<IconProps>
  name: string
  connect: () => void
}

export function Wallet({ icon, name, connect }: Props) {
  return (
    <WalletButton onClick={connect}>
      <IconWrapper>{icon}</IconWrapper>
      <b>{name}</b>
    </WalletButton>
  )
}

const WalletButton = styled.button`
  padding: 0.5em 0.5em;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.Text};
  outline: 0;
  border: 0;
  background: none;
  cursor: pointer;

  &:hover {
    border-radius: ${Borders.ButtonRadius};
    background-color: ${({ theme }) => theme.HoverArea};
  }

  &:active {
    transform: scale(0.95);
  }
  transition: 0.125s ease;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.8em;
`
