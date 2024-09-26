import styled from 'styled-components'
import { Navigation } from './header/Navigation';
import { WalletButton } from './header/WalletButton';

export function Header() {
  return (
    <Container>
      <Navigation />
      <WalletButton text="113u7...e3ejT | 199 BTC" />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 20px;
  display: flex;
  height: 120px;
  width: 100%;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.Background};
`
