import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    color: ${(props) => props.theme.Text};
    background-color: ${(props) => props.theme.Background};
  }

  button {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    background: none;
    border: 0;
    outline: 0;
    cursor: pointer;
  }
`
