import styled from 'styled-components'
import { Button } from '../Button';

interface Props {
  text: string
}

export function WalletIcon({ text }: Props) {
  return (
    <Container>
      <WalletButton>{text}</WalletButton>
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
`

const WalletButton = styled(Button)`
  height: 50px;
  background-color: ${({ theme }) => theme.ButtonBackground};
`