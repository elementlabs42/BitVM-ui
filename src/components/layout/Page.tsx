import { ReactNode } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Header } from './Header'
import { Footer } from './Footer'
import { useTheme } from '@/hooks/useTheme'
import { GlobalStyle } from '@/providers/GlobalStyle'
import { darkTheme, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'

interface Props {
  children: ReactNode
  className?: string
}

export function Page({ children, className }: Props) {
  const { theme, useLightTheme } = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <RainbowKitProvider modalSize="compact" theme={useLightTheme ? lightTheme() : darkTheme()}>
        <GlobalStyle />
        <Container>
          <Header />
          <PageContent className={className}>{children}</PageContent>
          <Footer />
        </Container>
      </RainbowKitProvider>
    </ThemeProvider>
  )
}

const Container = styled.div`
  margin: 0 auto;
  padding: 0 10vw;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`

const PageContent = styled.div`
  flex-grow: 1;
`
