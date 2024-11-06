import '@rainbow-me/rainbowkit/styles.css'

import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Page } from '@/components/layout'
import styled from 'styled-components'
import { Bridge, BtcConnect, EthereumConnect } from '@/components/pages'
import { useAccount as useEthereumAccount } from 'wagmi'
import { useHomeRoutes } from '@/components/pages/useHomeRoutes'
import { useBtcConnector } from '@/providers/BtcConnector'
import { BTCConnectorType } from '@/constants/connector'
import { BridgeDirection, useBridgeDirection } from '@/providers/BridgeDirection'

export default function Home() {
  const [page, setPage] = useHomeRoutes()
  const { selectedProvider } = useBtcConnector()
  const { openConnectModal } = useConnectModal()

  const account = useEthereumAccount()
  const { setDirection } = useBridgeDirection()

  const content = () => {
    switch (page) {
      case 'BtcConnect':
        return <BtcConnect route={setPage} />
      case 'EthereumConnect':
        return <EthereumConnect route={setPage} />
      case 'Bridge':
        return <Bridge route={setPage} />
    }
  }

  return (
    <PageContent>
      {page !== 'Home' ? (
        content()
      ) : (
        <Container>
          <Header>A 2-way peg bridging BTC to Ethereum</Header>
          <SubTitle>
            Once bridged, your BTC becomes eBTC, an ERC20 token backed 1:1 by Bitcoin. Your deposit is secured by
            immutable code, not centralized custodians, and can be redeemed anytime.
          </SubTitle>
          <ButtonContainer>
            <BTC2eBTCButton
              onClick={() => {
                if (selectedProvider !== BTCConnectorType.NONE) {
                  setPage('Bridge')
                } else {
                  setPage('BtcConnect')
                }
                setDirection(BridgeDirection.PEG_IN)
              }}
            >
              BTC to eBTC
            </BTC2eBTCButton>
            <EBTC2BTCButton
              onClick={() => {
                if (account.address) {
                  setPage('Bridge')
                } else {
                  setPage('EthereumConnect')
                }
                setDirection(BridgeDirection.PEG_OUT)
                openConnectModal?.()
              }}
            >
              eBTC to BTC
            </EBTC2BTCButton>
          </ButtonContainer>
        </Container>
      )}
    </PageContent>
  )
}

const PageContent = styled(Page)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Container = styled.div``

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
`

const BTC2eBTCButton = styled.button`
  background-color: ${({ theme }) => theme.ButtonDarkBg};
  color: ${({ theme }) => theme.ButtonDarkText};
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
`

const EBTC2BTCButton = styled.button`
  background-color: ${({ theme }) => theme.ButtonLightBg};
  color: ${({ theme }) => theme.ButtonLightText};
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d0d5dd;
  cursor: pointer;
`
