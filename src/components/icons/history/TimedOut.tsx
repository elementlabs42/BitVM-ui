import { IconProps, SvgIcon } from '../_base'

export function TimedOut({ className }: IconProps) {
  return (
    <SvgIcon className={className} viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#clip0_801_7842)">
        <path
          d="M12.5 7.49984L7.49996 12.4998M7.49996 7.49984L12.5 12.4998M18.3333 9.99984C18.3333 14.6022 14.6023 18.3332 9.99996 18.3332C5.39759 18.3332 1.66663 14.6022 1.66663 9.99984C1.66663 5.39746 5.39759 1.6665 9.99996 1.6665C14.6023 1.6665 18.3333 5.39746 18.3333 9.99984Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_801_7842">
          <rect width="20" height="20" fill="currentColor" />
        </clipPath>
      </defs>
    </SvgIcon>
  )
}
