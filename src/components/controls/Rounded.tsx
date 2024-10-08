import { Borders } from '@/constants/themes'
import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { IconProps } from '../icons/_base'

interface Props {
  noBorder?: boolean
  onClick?: () => void
  size?: number
  active?: boolean
  className?: string
}

interface RoundedElementProps extends Props {
  children: ReactNode
}

export interface RoundedIconProps extends Props {
  icon: ReactElement<IconProps>
}

export function RoundedElement({
  children,
  noBorder = false,
  size = 1.4,
  active = false,
  onClick,
  className,
}: RoundedElementProps) {
  return (
    <Container $relativeSize={size} $noBorder={noBorder} $active={active} className={className} onClick={onClick}>
      {children}
    </Container>
  )
}

export function RoundedIcon({
  icon,
  noBorder = false,
  size = 2,
  active = false,
  onClick,
  className,
}: RoundedIconProps) {
  return (
    <Container $relativeSize={size} $active={active} $noBorder={noBorder} className={className} onClick={onClick}>
      <IconWrapper $relativeSize={size}>{icon}</IconWrapper>
    </Container>
  )
}

const Container = styled.div.attrs<{ $relativeSize: number; $noBorder: boolean; $active: boolean }>((props) => ({
  $active: props.$active,
  $relativeSize: props.$relativeSize,
  $noBorder: props.$noBorder,
}))`
  ${(props) => (props.$noBorder ? '' : `border: 1px solid ${props.theme.FooterText};`)}
  height: ${(props) => props.$relativeSize * 1.6}em;
  width: ${(props) => props.$relativeSize * 1.6}em;
  border-radius: ${Borders.IconRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.onClick
      ? `
          cursor: pointer;
          ${
            props.$active
              ? `
            color: ${props.theme.ButtonText};
            background-color: ${props.theme.ButtonBackground};
          `
              : ''
          }
          &:hover {
            color: ${props.theme.ButtonText};
            background-color: ${props.theme.ButtonBackground};
            > ${IconWrapper} {
              color: ${props.theme.ButtonText};
            }
          }
        `
      : ''}
`

const IconWrapper = styled.div.attrs<{ $relativeSize: number }>((props) => ({
  $relativeSize: props.$relativeSize,
}))`
  font-size: ${(props) => props.$relativeSize}em;
  color: ${({ theme }) => theme.Text};
  display: flex;
  align-items: center;
`
