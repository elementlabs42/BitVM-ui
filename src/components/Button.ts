import styled from 'styled-components'

export const Button = styled.div`
  color: ${({ theme }) => theme.ButtonText};
  background-color: ${({ theme }) => theme.ButtonBackground};
  border: none;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 5%;
`