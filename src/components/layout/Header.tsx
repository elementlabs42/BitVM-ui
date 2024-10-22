import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAccount as useEthereumAccount } from 'wagmi'
import { useConnectModal as useEthereumConnectModal } from '@rainbow-me/rainbowkit'
import { useQueryClient } from '@tanstack/react-query'

import { Navigation, WalletButton } from './headers'
import { WalletModalBtc } from '../controls'
import { formatAddress } from '@/utils'
import { useBtcConnector } from '@/providers/BtcConnector'
import { useClipboard } from '@/hooks/useClipboard'
import { useBalanceOf } from '@/hooks/ethereum'
import { EBTC_ADDRESSES } from '@/constants/addresses'

export function Header() {
  const [isBTCWalletModalOpen, setIsBTCWalletModalOpen] = useState(false)
  const { isConnected: isBTCConnected, btcAddress, btcBalance } = useBtcConnector()

  const { openConnectModal } = useEthereumConnectModal()
  const ethereumAccount = useEthereumAccount()
  const queryClient = useQueryClient()
  const eBtcAddress = EBTC_ADDRESSES[ethereumAccount.chainId ?? 0]
  const [eBtcBalance, balanceOfQueryKey] = useBalanceOf(eBtcAddress)

  const [copyAddress, contextHolder] = useClipboard('Address copied to clipboard')

  useEffect(() => {
    if (isBTCConnected) {
      setIsBTCWalletModalOpen(false)
    }
  }, [isBTCConnected])

  const btcWalletText = isBTCConnected ? `${formatAddress(btcAddress)} | ${btcBalance} sat` : 'Connect BTC Wallet'
  const btcWalletOnClick = () => {
    if (isBTCConnected) {
      copyAddress(btcAddress)
    } else {
      setIsBTCWalletModalOpen(true)
    }
  }

  const ethereumWalletText = ethereumAccount.address
    ? `${formatAddress(ethereumAccount.address)} | ${eBtcBalance} eBTC`
    : 'Connect Ethereum Wallet'
  const ethereumWalletOnClick = async () => {
    if (ethereumAccount.address) {
      copyAddress(ethereumAccount.address)
      await queryClient.invalidateQueries({ queryKey: balanceOfQueryKey })
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
