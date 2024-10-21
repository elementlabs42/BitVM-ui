import React, { ReactNode } from 'react'
import { SettingsProvider } from './settings/provider'
import { mainnet } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { BtcConnectorProvider } from './BtcConnector'
interface Props {
  children: ReactNode
}

const config = getDefaultConfig({
  appName: 'BitVm',
  projectId: 'e355babd1f0eb181905a298f13d990fd',
  chains: [mainnet],
  ssr: true,
})
const queryClient = new QueryClient()

export function Providers(props: Props) {
  return (
    <SettingsProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <BtcConnectorProvider>{props.children}</BtcConnectorProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SettingsProvider>
  )
}
