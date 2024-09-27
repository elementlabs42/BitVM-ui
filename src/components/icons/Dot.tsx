import { SvgIcon } from './_base'

interface Props {
  className?: string
}

export function Dot({ className }: Props) {
  return (
    <SvgIcon className={className} viewBox="0 0 256 256">
      <path d="M128,80a48,48,0,1,0,48,48A48,48,0,0,0,128,80Zm0,60a12,12,0,1,1,12-12A12,12,0,0,1,128,140Z"></path>
    </SvgIcon>
  )
}
