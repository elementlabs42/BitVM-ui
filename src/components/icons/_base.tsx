import { forwardRef, ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  className?: string
  viewBox?: string
  fill?: string
  stroke?: string
  strokeWidth?: string
  children?: ReactNode
}

export interface IconProps {
  className?: string
}

export const SvgIcon = forwardRef<SVGSVGElement, Props>(
  ({ className, viewBox, fill, stroke, strokeWidth, children }, ref) => {
    return (
      <Svg
        className={className}
        viewBox={viewBox}
        fill={fill ?? 'currentColor'}
        stroke={stroke ?? 'currentColor'}
        strokeWidth={strokeWidth ?? '0'}
        ref={ref}
      >
        {children}
      </Svg>
    )
  },
)

SvgIcon.displayName = 'SvgIcon'

const Svg = styled.svg`
  width: 1em;
  height: 1em;
`
