import { ReactNode } from 'react'
import styled from 'styled-components'
import { Header } from './Header';
import { Footer } from './Footer';

interface Props {
  children: ReactNode
}

export function Page({ children }: Props) {
  return (
    <>
      <Container>
        <Header />
        <PageContent>
          {children}
        </PageContent>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  margin: 0 auto;
  padding: 0 0 60px 0;
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.Background};
`

const PageContent = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
`