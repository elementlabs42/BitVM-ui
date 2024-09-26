import styled from 'styled-components'
import { Navigation } from './footer/Navigation';

export function Footer() {
  return (
    <>
      <Spliter />
      <Container>
        <Copy>© 2024 Built with 💙 from Bifrost</Copy>
        <Navigation />
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 0 20px;
  display: flex;
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  background-color: ${({ theme }) => theme.Background};
`

const Spliter = styled.hr`
  margin: 0 20px;
  height: 1px;
  background-color: ${({ theme }) => theme.FooterText};
  border-top: 1px solid ${({ theme }) => theme.FooterText};
`

const Copy = styled.span`
  color: ${({ theme }) => theme.FooterText};
`