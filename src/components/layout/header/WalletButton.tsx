import { Borders, FontWeights } from '@/constants/themes'
import React from 'react'
import styled from 'styled-components'
import { Roboto_Mono } from 'next/font/google'
import { Dot } from '../../icons'

interface Props {
  text: string
  className?: string
}

const mono = Roboto_Mono({ subsets: ['latin'] })

export function WalletButton({ text, className }: Props) {
  return (
    <Container className={className}>
      <Button className={mono.className}>
        <DotIcon />
        {text}
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const Button = styled.span`
  height: 30px;
  padding: 10px 10px 10px 5px;
  display: flex;
  align-self: center;
  align-items: center;
  color: ${({ theme }) => theme.ButtonText};
  text-decoration: none;
  font-size: 12px;
  font-weight: ${FontWeights.Semibold};
  background-color: ${({ theme }) => theme.ButtonBackground};
  border-radius: ${Borders.ButtonRadius};
  cursor: pointer;
`

const DotIcon = styled(Dot)`
  margin-right: 6px;
  font-size: 20px;
`
