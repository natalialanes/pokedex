import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    background: #F5F5F5;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font};
    transition: all 0.50s linear;
  }

    button {
    border: 0;
    display: inline-block;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    height:50px;
    text-align:center;
    background-color: #50C878;
    color: #FFFFFF;
    font-family: ${({ theme }) => theme.font};
  }
`
