import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  className?: string
  viewBox?: string
  fill?: string
  stroke?: string
  strokeWidth?: string
  children?: ReactNode
}

export function SvgIcon({ className, viewBox, fill, stroke, strokeWidth, children }: Props) {
  return (
    <Svg
      className={className}
      viewBox={viewBox}
      fill={fill ?? 'currentColor'}
      stroke={stroke ?? 'currentColor'}
      strokeWidth={strokeWidth ?? '0'}
    >
      {children}
    </Svg>
  )
}

const Svg = styled.svg`
  width: 1em;
  height: 1em;
`
