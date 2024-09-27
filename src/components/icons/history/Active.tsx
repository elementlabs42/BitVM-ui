import { IconProps, SvgIcon } from '../_base'

export function Active({ className }: IconProps) {
  return (
    <SvgIcon className={className} viewBox="0 0 20 20" fill="none">
      <path
        d="M18.3333 10H15L12.5 17.5L7.49996 2.5L4.99996 10H1.66663"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  )
}
