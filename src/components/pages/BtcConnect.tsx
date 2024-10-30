import styled from 'styled-components'
import { LedgerModal } from '../modals/LedgerModal'
import { useState } from 'react'
import { useBtcConnector } from '@/providers/BtcConnector'
import { BTCConnectorType } from '@/constants/connector'
import { Circle, FilledCircle } from '../icons'
import { RoundedElement } from '../controls'
import { HomeRoutes } from './useHomeRoutes'

interface Props {
  route: (page: HomeRoutes) => void
}

export function BtcConnect({ route }: Props) {
  const [isLedgerModalVisible, setIsLedgerModalVisible] = useState(false)
  const { selectedProvider, connectUnisat, connectLedger, connectTrezor } = useBtcConnector()

  return (
    <Container>
      <Spacer />
      <ConnectContainer>
        <LedgerModal
          isVisible={isLedgerModalVisible}
          onClose={() => setIsLedgerModalVisible(false)}
          onConfirm={connectLedger}
        ></LedgerModal>
        <Header>Select your Bitcoin Wallet</Header>
        <SubTitle>
          If you are using a hardware wallet like Ledger, please connect it to your computer and select the
          corresponding device.
        </SubTitle>
        <Connectors>
          <BTCConnector onClick={() => setIsLedgerModalVisible(true)}>
            {selectedProvider === BTCConnectorType.LEDGER ? <FilledCircle /> : <Circle />}
            <WalletType>Ledger</WalletType>
          </BTCConnector>
          <BTCConnector onClick={connectTrezor}>
            {selectedProvider === BTCConnectorType.TREZOR ? <FilledCircle /> : <Circle />}
            <WalletType>Trezor</WalletType>
          </BTCConnector>
          <BTCConnector style={{ borderRight: 'none' }} onClick={connectUnisat}>
            {selectedProvider === BTCConnectorType.UNISAT ? <FilledCircle /> : <Circle />}
            <WalletType>Unisat</WalletType>
          </BTCConnector>
          <BTCConnector>
            <Circle />
            <WalletType>Satoshi</WalletType>
          </BTCConnector>
        </Connectors>
      </ConnectContainer>
      <Buttons>
        <Button onClick={() => route('Home')}>Back</Button>
        <Button
          onClick={() => {
            if (selectedProvider !== BTCConnectorType.NONE) {
              route('Bridge')
            }
          }}
          active={selectedProvider !== BTCConnectorType.NONE}
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

const BTCConnector = styled.div`
  display: flex;
  min-height: 2.5rem;
  padding: 0.5rem 1rem 0.5rem 0.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-right: 1px solid ${({ theme }) => theme.ButtonBorderColor};
  cursor: pointer;
`

const WalletType = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.SecondaryText};
`
