import styled from 'styled-components'
import { Borders } from '@/constants/themes'

export const Panel = styled.div`
  margin: 3vh 0;
  padding: 1vh 2vw 1.6vw 2vw;
  min-height: 60vh;
  background-color: ${({ theme }) => theme.Background};
  border-radius: ${Borders.PanelRadius};
  box-shadow:
    0px 20px 24px -4px ${({ theme }) => theme.ShadowInner},
    0px 8px 8px -4px ${({ theme }) => theme.ShadowOuter};
`
