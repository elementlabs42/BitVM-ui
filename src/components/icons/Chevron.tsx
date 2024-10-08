import { IconProps, SvgIcon } from './_base'
import { forwardRef, RefObject } from 'react'

interface BaseChevronProps extends IconProps {
  rotate: string
}

interface ChevronProps extends IconProps {
  iconRef?: RefObject<SVGSVGElement>
}

const Chevron = forwardRef<SVGSVGElement, BaseChevronProps>(({ className, rotate }, ref) => {
  return (
    <SvgIcon className={className} viewBox="0 0 14 8" fill="none" ref={ref}>
      <path
        d="M1 1L7 7L13 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={`rotate(${rotate} 7 4)`}
      />
    </SvgIcon>
  )
})

Chevron.displayName = 'Chevron'

export function ChevronUp({ className, iconRef }: ChevronProps) {
  return <Chevron className={className} ref={iconRef} rotate="180" />
}

export function ChevronRight({ className, iconRef }: ChevronProps) {
  return <Chevron className={className} ref={iconRef} rotate="270" />
}

export function ChevronDown({ className, iconRef }: ChevronProps) {
  return <Chevron className={className} ref={iconRef} rotate="0" />
}

export function ChevronLeft({ className, iconRef }: ChevronProps) {
  return <Chevron className={className} ref={iconRef} rotate="90" />
}
