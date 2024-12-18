import { BTCConnectorType } from '@/constants/connector'
import { useIsClient } from '@/hooks/useIsClient'
import { useLedgerConnection, useTrezorConnection, useUnisatConnection } from '@/hooks/bitcoin'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type BtcConnectorData = {
  selectedProvider: BTCConnectorType
  isConnected: boolean
  btcAddress: string
  pubkey: string
  btcBalance: bigint
  signPsbt: (psbt: string, signInputs: { index: number; address: string }[]) => Promise<string>
  connectLedger: () => void
  connectTrezor: () => void
  connectUnisat: () => void
}

const DEFAULT: BtcConnectorData = {
  selectedProvider: BTCConnectorType.NONE,
  isConnected: false,
  btcAddress: '',
  pubkey: '',
  btcBalance: 0n,
  signPsbt: async () => '',
  connectLedger: () => { },
  connectTrezor: () => { },
  connectUnisat: () => { },
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
  const [btcBalance, setBTCBalance] = useState<bigint>(0n)
  const [pubkey, setPubkey] = useState<string>('')
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

  const signPsbt = useCallback(
    async (psbt: string, signInputs: { index: number; address: string }[]) => {
      if (selectedProvider === BTCConnectorType.UNISAT) {
        return unisatConnection.signPsbt(psbt, signInputs)
      }
    },
    [unisatConnection],
  )

  const getBalance = useCallback(async () => {
    if (selectedProvider === BTCConnectorType.UNISAT) {
      return BigInt(unisatConnection.balance.total)
    } else if (selectedProvider === BTCConnectorType.TREZOR) {
      return BigInt(trezorConnection.balance)
    } else if (selectedProvider === BTCConnectorType.LEDGER) {
      return BigInt(ledgerConnection.balance)
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

  const getPubkey = useCallback(async () => {
    if (selectedProvider === BTCConnectorType.UNISAT) {
      return unisatConnection.publicKey
    }
  }, [selectedProvider, unisatConnection])

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
    ; (async () => {
      if (isConnected) {
        setBTCAddress((await getAddress()) ?? '')
        setBTCBalance((await getBalance()) ?? 0n)
        setPubkey((await getPubkey()) ?? '')
      }
    })()
  }, [isConnected, getAddress, getBalance, getPubkey])

  return (
    <BtcConnectorContext.Provider
      value={{
        selectedProvider,
        btcAddress,
        pubkey,
        btcBalance,
        isConnected,
        signPsbt,
        connectUnisat,
        connectTrezor,
        connectLedger,
      }}
    >
      {children}
    </BtcConnectorContext.Provider>
  )
}

export function useBtcConnector() {
  return useContext(BtcConnectorContext)
}
