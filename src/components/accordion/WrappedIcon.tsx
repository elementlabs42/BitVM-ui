import { Borders } from '@/constants/themes'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { IconProps } from '../icons/_base'

interface Props {
  icon: ReactElement<IconProps>
  size?: number
  className?: string
}

export default function WrappedIcon({ icon, size = 2, className }: Props) {
  return (
    <Container relativeSize={size} className={className}>
      <IconWrapper relativeSize={size}>{icon}</IconWrapper>
    </Container>
  )
}

const Container = styled.div.attrs<{ relativeSize: number }>((props) => ({
  relativeSize: props.relativeSize,
}))`
  border: 1px solid ${({ theme }) => theme.FooterText};
  height: ${(props) => props.relativeSize * 1.6}em;
  width: ${(props) => props.relativeSize * 1.6}em;
  border-radius: ${Borders.IconRadius};
  margin-right: 0.6em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.relativeSize! / 5}em 0 0 0;
`

const IconWrapper = styled.div.attrs<{ relativeSize: number }>((props) => ({
  relativeSize: props.relativeSize,
}))`
  font-size: ${(props) => props.relativeSize}em;
  fill: ${({ theme }) => theme.Background};
  stroke: ${({ theme }) => theme.Text};
`
