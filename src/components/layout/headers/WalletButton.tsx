import { Borders, Colors, FontWeights } from '@/constants/themes'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { Roboto_Mono } from 'next/font/google'
import { Dot } from '../../icons'
import { Tooltip } from '@/components/controls'

interface Props {
  text: string
  unsupported?: boolean
  tooltip?: ReactNode
  onClick?: () => void
  className?: string
}

const mono = Roboto_Mono({ subsets: ['latin'] })

export function WalletButton({ text, unsupported, tooltip, onClick, className }: Props) {
  return (
    <Container className={className}>
      <Tooltip content={tooltip}>
        <Button className={mono.className} $gray={unsupported} onClick={onClick}>
          <DotIcon />
          {text}
        </Button>
      </Tooltip>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const Button = styled.span.attrs<{ $gray?: boolean }>((props) => ({
  $gray: props.$gray,
}))`
  height: 30px;
  padding: 10px 10px 10px 5px;
  display: flex;
  align-self: center;
  align-items: center;
  color: ${({ theme }) => theme.ButtonText};
  text-decoration: none;
  font-size: 12px;
  font-weight: ${FontWeights.Semibold};
  background-color: ${({ theme, $gray }) => ($gray ? Colors.Gray : theme.ButtonBackground)};
  border-radius: ${Borders.ButtonRadius};
  cursor: pointer;
`

const DotIcon = styled(Dot)`
  margin-right: 6px;
  font-size: 20px;
`
