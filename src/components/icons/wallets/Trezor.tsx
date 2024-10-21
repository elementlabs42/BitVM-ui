import styled from 'styled-components'
import { IconProps, SvgIcon } from '../_base'

export const Trezor = styled(TrezorSvg)`
  width: 30px;
  height: 30px;
`
function TrezorSvg({ className }: IconProps) {
  return (
    <SvgIcon className={className} viewBox="-6 0 40 40" fill="none">
      <path
        fill="currentColor"
        d="M24.306 9.461C24.306 4.29 19.761 0 14.228 0 8.694 0 4.148 4.292 4.148 9.46v3.025H0v21.75l14.225 6.536 14.233-6.534V12.581H24.31l-.003-3.121Zm-15.02 0c0-2.438 2.175-4.389 4.942-4.389 2.767 0 4.94 1.951 4.94 4.389v3.024H9.287V9.461Zm13.44 21.264-8.502 3.904-8.499-3.901V17.655h17v13.07z"
      />
    </SvgIcon>
  )
}
