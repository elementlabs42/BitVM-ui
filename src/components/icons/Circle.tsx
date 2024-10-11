import { IconProps, SvgIcon } from './_base'

export function Circle({ className }: IconProps) {
  return (
    <SvgIcon className={className} viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#clip0_841_2958)">
        <path
          d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_841_2958">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  )
}
