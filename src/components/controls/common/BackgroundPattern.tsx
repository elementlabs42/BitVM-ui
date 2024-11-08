import styled from 'styled-components'
import { Pattern } from '../../icons/Pattern'
import { IconProps } from '../../icons/_base'
import { ReactElement } from 'react'

interface Props {
  svg?: ReactElement<IconProps>
  className?: string
}

export function BackgroundPattern({ svg, className }: Props) {
  return svg ?? <PatternStyled className={className} />
}

const PatternStyled = styled(Pattern)`
  color: ${({ theme }) => theme.FooterText};
`
