import styled from 'styled-components'
import { Navigation } from './header/Navigation'
import { WalletButton } from './header/WalletButton'
import { useBTCConnector } from '@/hooks/useBTCConnector'
import { useState, useEffect } from 'react'
import { copyToClipboard, formatAddress } from '@/utils/address'
import useMessage from 'antd/es/message/useMessage'
import { useAccount as useEthereumAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { WalletModalBtc } from '../controls'

export function Header() {
  const [btcBalance, setBTCBalance] = useState<string | number>(0)
  const [btcAddress, setBTCAddress] = useState<string>('')
  const { isConnected: isBTCConnected, getAddress: getBTCAddress, getBalance: getBTCBalance } = useBTCConnector()
  const { address: ethereumAddress } = useEthereumAccount()
  const [messageApi, contextHolder] = useMessage()
  const { openConnectModal } = useConnectModal()
  const [isBTCWalletModalOpen, setIsBTCWalletModalOpen] = useState(false)
  const [btcWalletText, setBtcWalletText] = useState('Connect BTC Wallet')

  useEffect(() => {
    ;(async () => {
      if (isBTCConnected()) {
        const address = await getBTCAddress()
        setBTCAddress(address ?? '')

        const balance = await getBTCBalance()
        setBTCBalance(balance ?? 0)
      }
    })()
  }, [isBTCConnected, getBTCAddress, getBTCBalance])

  const copyAddress = (address: string) => {
    copyToClipboard(address)
    messageApi.success('Address copied to clipboard')
  }

  const ebtc = 0

  useEffect(() => {
    if (isBTCConnected()) {
      setBtcWalletText(`${formatAddress(btcAddress)} | ${btcBalance} sat`)
      setIsBTCWalletModalOpen(false)
    } else {
      setBtcWalletText('Connect BTC Wallet')
    }
  }, [isBTCConnected, btcAddress, btcBalance])

  const btcWalletOnClick = () => {
    if (isBTCConnected()) {
      copyAddress(btcAddress)
    } else {
      setIsBTCWalletModalOpen(true)
    }
  }
  const ethereumWalletText = ethereumAddress
    ? `${formatAddress(ethereumAddress)} | ${ebtc} eBTC`
    : 'Connect Ethereum Wallet'
  const ethereumWalletOnClick = () => {
    if (ethereumAddress) {
      copyAddress(ethereumAddress)
    } else {
      openConnectModal?.()
    }
  }

  const btcWalletModal = (
    <WalletModalBtc
      onClosed={() => {
        setIsBTCWalletModalOpen(false)
      }}
    />
  )

  return (
    <Container>
      <Navigation />
      {isBTCWalletModalOpen && btcWalletModal}
      {contextHolder}
      <WalletContainer>
        <Wallet text={btcWalletText} onClick={btcWalletOnClick} />
        <Wallet text={ethereumWalletText} onClick={ethereumWalletOnClick} />
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
