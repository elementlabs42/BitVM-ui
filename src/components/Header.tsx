import styled from 'styled-components'
import { Navigation } from './header/Navigation'
import { WalletButton } from './header/WalletButton'

export function Header() {
  return (
    <Container>
      <Navigation />
      <Wallet text="113u7...e3ejT | 199 BTC" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 15vh;
  width: 100%;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.Background};
`

const Wallet = styled(WalletButton)`
  margin-right: 2vw;
`
