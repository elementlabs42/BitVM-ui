import styled from 'styled-components'
import { Pattern } from '../icons/Pattern'

interface Props {
  className?: string
}

export function BackgroundPattern({ className }: Props) {
  return <PatternStyled className={className} />
}

const PatternStyled = styled(Pattern)`
  color: ${({ theme }) => theme.FooterText};
`
