import '@rainbow-me/rainbowkit/styles.css';

import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import { Circle } from '@/components/icons/Circle';
import { Page } from '@/components/layout'
import { useState } from 'react';
import styled from 'styled-components';
import { useBTCConnector } from '@/hooks/useBTCConnector';
import { FilledCircle } from '@/components/icons/FilledCircle';
import { LedgerModal } from '@/components/modals/LedgerModal';


export default function Home() {
  const [connectorType, setConnectorType] = useState<"BTC" | "EVM" | null>(null);
  const [isLedgerModalVisible, setIsLedgerModalVisible] = useState(false);
  const { selectUnisat, isUnisatConnected, isLedgerConnected, isTrezorConnected, selectLedger, selectTrezor} = useBTCConnector();
  const { openConnectModal } = useConnectModal();

  return (
      <Page>
        { connectorType === "BTC" ?  <Container>
          <LedgerModal isVisible={isLedgerModalVisible} onClose={() => setIsLedgerModalVisible(false)} onConfirm={selectLedger}>
            </ LedgerModal>
          <Header>Select your Bitcoin Wallet</Header>
          <SubTitle>If you're using a hardware wallet like Ledger, please connect it to your computer and select the corresponding device.</SubTitle>
          <Connectors>
            <BTCConnector onClick={() => setIsLedgerModalVisible(true)}>
              {isLedgerConnected() ? <FilledCircle /> : <Circle />}
              <WalletType>Ledger</WalletType>
            </BTCConnector>
            <BTCConnector onClick={selectTrezor}>
              {isTrezorConnected() ? <FilledCircle /> : <Circle />}
              <WalletType>Trezor</WalletType>
            </BTCConnector>
            <BTCConnector style={{borderRight: "none"}} onClick={selectUnisat}>
              {isUnisatConnected() ? <FilledCircle /> : <Circle />}
              <WalletType>
                Unisat
                </WalletType>
            </BTCConnector>
            <BTCConnector>
              <Circle />
              <WalletType>Satoshi</WalletType>
            </BTCConnector>
          </Connectors>
      </Container> :
      <Container>
        <Header>A 2-way peg bridging BTC to Ethereum</Header>
        <SubTitle>
          Once bridged, your BTC becomes eBTC, an ERC20 token backed 1:1 by Bitcoin. Your deposit is secured by
          immutable code, not centralized custodians, and can be redeemed anytime.
        </SubTitle>
        <ButtonContainer>
          <BTC2eBTCButton onClick={() => setConnectorType("BTC")}>BTC to eBTC</BTC2eBTCButton>
          <EBTC2BTCButton onClick={openConnectModal}>eBTC to BTC</EBTC2BTCButton>
        </ButtonContainer>
      </Container>
     }
    </Page>
  )
}

const Container = styled.main`
  margin-top: 9rem;
`

const Disconnect = styled.div`
  cursor: pointer;
`

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
  border: 1px solid #D0D5DD;
  cursor: pointer;
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