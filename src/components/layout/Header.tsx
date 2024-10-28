import styled from 'styled-components'
import { Navigation } from './header/Navigation'
import { WalletButton } from './header/WalletButton'
import { useBTCConnector } from '@/hooks/useBTCConnector'
import { useState, useEffect } from 'react'
import { copyToClipboard, formatAddress, formatBalance } from '@/utils/address'
import useMessage from 'antd/es/message/useMessage'
import { useAccount } from 'wagmi'

export function Header() {
  const [isClient, setIsClient] = useState(false)
  const [btcBalance, setBTCBalance] = useState<string | number>(0)
  const [btcAddress, setBTCAddress] = useState<string>('')
  const { isConnected: isBTCConnected, getAddress: getBTCAddress, getBalance: getBTCBalance } = useBTCConnector()
  const { address } = useAccount()
  const [messageApi, contextHolder] = useMessage()

  useEffect(() => {

  }, [isBTCConnected, getBTCAddress, getBTCBalance])

  const copyAddress = (address: string) => {
    copyToClipboard(address)
    messageApi.success('Address copied to clipboard')
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  const ebtc = 0

  return (
    <Container>
      <Navigation />
      {contextHolder}
      <WalletContainer>
        <div
          onClick={() => {
            copyAddress(btcAddress ?? '')
          }}
        >
          {isBTCConnected() && isClient && (
            <Wallet text={`${formatAddress(btcAddress)} | ${formatBalance(btcBalance.toString(), 8)} BTC`} />
          )}
        </div>
        <div
          onClick={() => {
            copyAddress(address ?? '')
          }}
        >
          {address && isClient && <Wallet text={`${formatAddress(address)} | ${formatBalance(ebtc.toString(), 18)} eBTC`} />}
        </div>
      </WalletContainer>
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

const WalletContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-right: 2vw;
`

const Wallet = styled(WalletButton)`
  margin-left: 20px;
`
