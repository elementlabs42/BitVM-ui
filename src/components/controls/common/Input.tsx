import { Borders } from '@/constants/themes'
import styled, { css } from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.FooterText};
  border-radius: ${Borders.ButtonRadius};
`

export const InputIcon = styled.div`
  margin-left: 0.5em;
  display: flex;
  align-content: center;
`

export const InputBoxStyle = css`
  font-size: 1.2em;
  padding: 0.5em;
`

export const InputStyle = css`
  ${InputBoxStyle}
  flex-grow: 1;
  border: 0;
  &:focus-visible {
    outline: 0;
  }
  color: ${({ theme }) => theme.Text};
  background-color: ${({ theme }) => theme.Background};
`
