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

export const InputStyle = css`
  flex-grow: 1;
  font-size: 1.2em;
  padding: 0.5em;
  border: 0;
  &:focus-visible {
    outline: 0;
  }
  color: ${({ theme }) => theme.Text};
  background-color: ${({ theme }) => theme.Background};
`
