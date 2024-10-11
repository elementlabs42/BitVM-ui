import { IconProps, SvgIcon } from './_base'

export function Warning({ className }: IconProps) {
  return (
    <SvgIcon className={className} viewBox="0 0 16 16" fill="none">
      <g clipPath="url(#clip0_948_623)">
        <path
          d="M8.00065 5.3335V8.00016M8.00065 10.6668H8.00732M14.6673 8.00016C14.6673 11.6821 11.6826 14.6668 8.00065 14.6668C4.31875 14.6668 1.33398 11.6821 1.33398 8.00016C1.33398 4.31826 4.31875 1.3335 8.00065 1.3335C11.6826 1.3335 14.6673 4.31826 14.6673 8.00016Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_948_623">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  )
}
