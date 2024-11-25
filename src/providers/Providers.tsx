import React, { ReactNode } from 'react'
import { SettingsProvider } from './settings/provider'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { BtcConnectorProvider } from './BtcConnector'
import { BridgeDirectionProvider } from './BridgeDirection'
import { getWagmiChainsConfig } from '@/constants/config'
interface Props {
  children: ReactNode
}

const config = getDefaultConfig({
  appName: 'BitVm',
  projectId: 'e355babd1f0eb181905a298f13d990fd',
  chains: getWagmiChainsConfig(),
  ssr: true,
})
const queryClient = new QueryClient()

export function Providers(props: Props) {
  return (
    <SettingsProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <BtcConnectorProvider>
            <BridgeDirectionProvider>{props.children}</BridgeDirectionProvider>
          </BtcConnectorProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SettingsProvider>
  )
}
