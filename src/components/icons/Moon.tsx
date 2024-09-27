import { SvgIcon } from './_base'

interface Props {
  className?: string
}

export function Moon({ className }: Props) {
  return (
    <SvgIcon className={className} viewBox="0 0 24 24">
      <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z"></path>
    </SvgIcon>
  )
}
