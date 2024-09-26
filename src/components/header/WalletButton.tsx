import { Borders, FontWeights } from '@/constants/themes'
import React from 'react'
import { PiDotFill } from 'react-icons/pi'
import styled from 'styled-components'

interface Props {
  text: string
}

export function WalletButton({ text }: Props) {
  return (
    <Button href="/">
      <DotIcon />
      {text}
    </Button>
  )
}

const Button = styled.a`
  margin: 40px 0;
  padding: 0 10px 0 5px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.ButtonText};
  text-decoration: none;
  font-size: 12px;
  font-weight: ${FontWeights.Semibold};
  background-color: ${({ theme }) => theme.ButtonBackground};
  border-radius: ${Borders.ButtonRadius};
`

const DotIcon = styled(PiDotFill)`
  margin-right: 6px;
  font-size: 20px;
`
