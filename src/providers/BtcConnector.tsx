import { BTCConnectorType } from '@/constants/connector'
import { useIsClient } from '@/hooks/useIsClient'
import { useLedgerConnection } from '@/hooks/useLedgerConnection'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useTrezorConnection } from '@/hooks/useTrezorConnection'
import { useUnisatConnection } from '@/hooks/useUnisatConnection'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type BtcConnectorData = {
  selectedProvider: BTCConnectorType
  isConnected: boolean
  btcAddress: string
  btcBalance: string | number
  connectLedger: () => void
  connectTrezor: () => void
  connectUnisat: () => void
}

const DEFAULT: BtcConnectorData = {
  selectedProvider: BTCConnectorType.NONE,
  isConnected: false,
  btcAddress: '',
  btcBalance: 0,
  connectLedger: () => {},
  connectTrezor: () => {},
  connectUnisat: () => {},
}

const BtcConnectorContext = createContext<BtcConnectorData>(DEFAULT)

export function BtcConnectorProvider({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient()
  const unisatConnection = useUnisatConnection()
  const trezorConnection = useTrezorConnection()
  const ledgerConnection = useLedgerConnection()
  const [selectedProvider, setSelectedProvider] = useLocalStorage<BTCConnectorType>(
    'selectedProvider',
    BTCConnectorType.NONE,
  )

  const [btcAddress, setBTCAddress] = useState<string>('')
  const [btcBalance, setBTCBalance] = useState<string | number>(0)
  const isConnected = useMemo<boolean>(() => {
    if (isClient && selectedProvider === BTCConnectorType.UNISAT) {
      return unisatConnection.unisatConnected
    } else if (isClient && selectedProvider === BTCConnectorType.TREZOR) {
      return trezorConnection.trezorConnected
    } else if (isClient && selectedProvider === BTCConnectorType.LEDGER) {
      return ledgerConnection.ledgerConnected
    } else {
      return false
    }
  }, [
    isClient,
    selectedProvider,
    unisatConnection.unisatConnected,
    trezorConnection.trezorConnected,
    ledgerConnection.ledgerConnected,
  ])

  const connectUnisat = async () => {
    try {
      await unisatConnection.connect()
      setSelectedProvider(BTCConnectorType.UNISAT)
    } catch (error) {
      console.error('Failed to connect with Unisat:', error)
    }
  }

  const connectTrezor = async () => {
    try {
      await trezorConnection.connect()
      setSelectedProvider(BTCConnectorType.TREZOR)
    } catch (error) {
      console.error('Failed to connect with Trezor:', error)
    }
  }

  const connectLedger = async () => {
    try {
      await ledgerConnection.connectLedger()
      setSelectedProvider(BTCConnectorType.LEDGER)
    } catch (error) {
      console.error('Failed to connect with Ledger:', error)
    }
  }

  const getBalance = useCallback(async () => {
    if (selectedProvider === BTCConnectorType.UNISAT) {
      return unisatConnection.balance.total
    } else if (selectedProvider === BTCConnectorType.TREZOR) {
      return trezorConnection.balance
    } else if (selectedProvider === BTCConnectorType.LEDGER) {
      return ledgerConnection.balance
    }
  }, [selectedProvider, unisatConnection, trezorConnection, ledgerConnection])

  const getAddress = useCallback(async () => {
    if (selectedProvider === BTCConnectorType.UNISAT) {
      return unisatConnection.address
    } else if (selectedProvider === BTCConnectorType.TREZOR) {
      return trezorConnection.address
    } else if (selectedProvider === BTCConnectorType.LEDGER) {
      return ledgerConnection.address
    }
  }, [selectedProvider, unisatConnection, trezorConnection, ledgerConnection])

  useEffect(() => {
    if (isClient) {
      if (
        (!unisatConnection.unisatConnected && selectedProvider === BTCConnectorType.UNISAT) ||
        (!trezorConnection.trezorConnected && selectedProvider === BTCConnectorType.TREZOR) ||
        (!ledgerConnection.ledgerConnected && selectedProvider === BTCConnectorType.LEDGER)
      ) {
        setSelectedProvider(BTCConnectorType.NONE)
      }
    }
  }, [
    isClient,
    unisatConnection.unisatConnected,
    trezorConnection.trezorConnected,
    ledgerConnection.ledgerConnected,
    selectedProvider,
    setSelectedProvider,
  ])

  useEffect(() => {
    ;(async () => {
      if (isConnected) {
        setBTCAddress((await getAddress()) ?? '')
        setBTCBalance((await getBalance()) ?? 0)
      }
    })()
  }, [isConnected, getAddress, getBalance])

  return (
    <BtcConnectorContext.Provider
      value={{ selectedProvider, btcAddress, btcBalance, isConnected, connectUnisat, connectTrezor, connectLedger }}
    >
      {children}
    </BtcConnectorContext.Provider>
  )
}

export function useBtcConnector() {
  return useContext(BtcConnectorContext)
}
