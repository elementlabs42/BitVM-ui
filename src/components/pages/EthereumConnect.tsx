import styled from 'styled-components'
import { Circle, FilledCircle } from '../icons'
import { RoundedElement } from '../controls'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { HomeRoutes } from './useHomeRoutes'

interface Props {
  route: (page: HomeRoutes) => void
}

export function EthereumConnect({ route }: Props) {
  const account = useAccount()
  const { openConnectModal } = useConnectModal()

  return (
    <Container>
      <Spacer />
      <ConnectContainer>
        <Header>Connect to Ethereum Wallet</Header>
        <SubTitle>Select a wallet to connect in the pop up modal.</SubTitle>
        <Connectors>
          <Connector onClick={() => openConnectModal?.()}>
            {account.address ? <FilledCircle /> : <Circle />}
            <WalletType>Connect</WalletType>
          </Connector>
        </Connectors>
      </ConnectContainer>
      <Buttons>
        <Button onClick={() => route('Home')}>Back</Button>
        <Button
          onClick={() => {
            if (!!account.address) {
              route('Bridge')
            }
          }}
          active={!!account.address}
        >
          Next
        </Button>
      </Buttons>
    </Container>
  )
}

const Container = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const ConnectContainer = styled.main``
const Spacer = styled.div``

const Header = styled.div`
  color: ${({ theme }) => theme.PrimaryText};
  font-size: 3rem;
  font-weight: 600;
`
const SubTitle = styled.div`
  color: ${({ theme }) => theme.SubTitle};
  font-size: 1.25rem;
  font-weight: 400;
  margin-top: 1.5rem;
`

const Buttons = styled.div`
  margin: 1em 0;
  display: flex;
  flex-direction: row;
  column-gap: 0.5em;
  justify-content: right;
`

const Button = styled(RoundedElement)`
  padding: 1.2em 2em;
`

const Connectors = styled.div`
  display: flex;
  margin-top: 3rem;
  border: 1px solid ${({ theme }) => theme.ButtonBorderColor};
  border-radius: 0.5rem;
  width: fit-content;
`

const Connector = styled.div`
  display: flex;
  min-height: 2.5rem;
  padding: 0.5rem 1rem 0.5rem 0.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`

const WalletType = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.SecondaryText};
`
