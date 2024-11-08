import styled from 'styled-components'
import { IconProps, SvgIcon } from './_base'

export function PatternCircle({ className }: IconProps) {
  return <SizedPattern className={className} />
}

const SizedPattern = styled(Pattern)`
  width: 216px;
  height: 216px;
`

function Pattern({ className }: IconProps) {
  return (
    <SvgIcon className={className} viewBox="0 0 216 216" fill="none">
      <mask
        id="mask0_430_2878"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="-120"
        y="-120"
        width="336"
        height="336"
      >
        <rect width="336" height="336" transform="translate(-120 -120)" fill="url(#paint0_radial_430_2878)" />
      </mask>
      <g mask="url(#mask0_430_2878)">
        <circle cx="48" cy="48" r="47.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="48" cy="48" r="71.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="48" cy="48" r="95.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="48" cy="48" r="119.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="48" cy="48" r="143.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="48" cy="48" r="167.5" width="335" height="335" stroke="currentColor" strokeWidth="1" />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_430_2878"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(168 168) rotate(90) scale(168 168)"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </radialGradient>
      </defs>
    </SvgIcon>
  )
}
