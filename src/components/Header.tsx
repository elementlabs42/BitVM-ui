import styled from 'styled-components'
import { Logo } from './logo/Logo'
import { WalletIcon } from './wallet/Icon';

export function Header() {
  return (
    <Container>
      <Logo />
      <h1>Header</h1>
      <WalletIcon text="113u7...e3ejT" />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 20px;
  display: flex;
  height: 60px;
  width: 100%;
  justify-content: space-between;
  font-size: 12px;
  background-color: ${({ theme }) => theme.Background};
`