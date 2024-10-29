import styled from 'styled-components'
import { RoundedIcon } from '../../controls'
import { Panel } from '../../layout'

export const SwapIcon = styled(RoundedIcon)`
  border-radius: 40%;
  background-color: ${({ theme }) => theme.Background};
  box-shadow: 0px 2px 2px 2px ${({ theme }) => theme.ShadowInner};
`

export const Subtitle = styled.h3`
  margin: 0;
`

export const FormPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  min-height: 50vh;
  z-index: 1;
  background-color: ${({ theme }) => theme.BackgroundTransparent};
`

export const Supplementaries = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`

export const Supplementary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.8em;
  color: ${({ theme }) => theme.FooterText};
`
