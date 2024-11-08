import styled from 'styled-components'
import { Spin } from './Animation'

export const Spinner = styled.span`
  position: relative;
  display: inline-block;
  bottom: -0.1em;
  height: 1em;
  width: 1em;
  border-radius: 50%;
  border: 0.15em solid;
  border-color: currentColor currentColor currentColor transparent;
  ${Spin}
`
