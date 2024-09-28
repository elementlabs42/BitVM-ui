import styled from 'styled-components'
import { IconProps, SvgIcon } from './_base'

function Chevron({ className }: IconProps) {
  return (
    <SvgIcon className={className} viewBox="0 0 14 8" fill="none">
      <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  )
}

export const ChevronUp = styled(Chevron)`
  transform: rotate(180deg);
`
export const ChevronDown = styled(Chevron)``
export const ChevronLeft = styled(Chevron)`
  transform: rotate(90deg);
`
export const ChevronRight = styled(Chevron)`
  transform: rotate(270deg);
`
