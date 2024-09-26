import { ReactNode } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Header } from './Header';
import { Footer } from './Footer';
import { useTheme } from '@/hooks/useTheme';
import { GlobalStyle } from '@/providers/GlobalStyle';

interface Props {
  children: ReactNode
}

export function Page({ children }: Props) {
  const { theme } = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Header />
        <PageContent>
          {children}
        </PageContent>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  margin: 0 auto;
  padding: 0 5%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.Background};
`

const PageContent = styled.div`
  flex-grow: 1;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  padding: 0 20px;
`