import { BTCConnectorType } from '@/constants/connector'
import { useUnisatConnection } from './useUnisatConnection'
import { useTrezorConnection } from './useTrezorConnection'
import { useLedgerConnection } from './useLedgerConnection'
import { useLocalStorage } from './useLocalStorage'
import { createPsbt, finalizePsbtAndGetTxId } from './utils'

export function useBTCConnector() {
  const unisatConnection = useUnisatConnection()
  const trezorConnection = useTrezorConnection()
  const ledgerConnection = useLedgerConnection()
  const [selectedProvider, setSelectedProvider] = useLocalStorage<BTCConnectorType>(
    'selectedProvider',
    BTCConnectorType.NONE,
  )

  const selectUnisat = async () => {
    setSelectedProvider(BTCConnectorType.UNISAT)
    try {
      await unisatConnection.connect()
    } catch (error) {
      console.error('Failed to connect with Unisat:', error)
    }
  }

  const selectTrezor = async () => {
    setSelectedProvider(BTCConnectorType.TREZOR)
    try {
      await trezorConnection.connect()
    } catch (error) {
      console.error('Failed to connect with Trezor:', error)
    }
  }

  const selectLedger = async () => {
    setSelectedProvider(BTCConnectorType.LEDGER)
    try {
      await ledgerConnection.connectLedger()
    } catch (error) {
      console.error('Failed to connect with Ledger:', error)
    }
  }

  const getBalance = async () => {
    if (selectedProvider === BTCConnectorType.UNISAT) {
      return unisatConnection.balance.total
    } else if (selectedProvider === BTCConnectorType.TREZOR) {
      return trezorConnection.balance
    } else if (selectedProvider === BTCConnectorType.LEDGER) {
      return ledgerConnection.balance
    }
  }

  const getAddress = async () => {
    if (selectedProvider === BTCConnectorType.UNISAT) {
      return unisatConnection.address
    } else if (selectedProvider === BTCConnectorType.TREZOR) {
      return trezorConnection.address
    } else if (selectedProvider === BTCConnectorType.LEDGER) {
      return ledgerConnection.address
    }
  }

  const isConnected = () => {
    if (selectedProvider === BTCConnectorType.UNISAT) {
      return unisatConnection.connected
    } else if (selectedProvider === BTCConnectorType.TREZOR) {
      return trezorConnection.trezorConnected
    } else if (selectedProvider === BTCConnectorType.LEDGER) {
      return ledgerConnection.ledgerConnected
    }
  }

  const signPsbt = async (psbtHex: string, signInputs: { index: number; address: string }[]) => {
    if (selectedProvider === BTCConnectorType.UNISAT) {
      const signedPsbt = await unisatConnection.signPsbt(psbtHex, signInputs)
      return finalizePsbtAndGetTxId(signedPsbt)
    }
  }

  const pushPsbt = async (psbtHex: string) => {
    if (selectedProvider === BTCConnectorType.UNISAT) {
      return unisatConnection.pushPsbt(psbtHex)
    }
  }

  const getAccounts = async () => {
    if (selectedProvider === BTCConnectorType.UNISAT) {
      return unisatConnection.accounts
    }
  }


  return {
    selectedProvider,
    isConnected,
    selectUnisat,
    selectTrezor,
    getBalance,
    getAddress,
    getAccounts,
    selectLedger,
    isLedgerConnected: () => ledgerConnection.ledgerConnected,
    isTrezorConnected: () => trezorConnection.trezorConnected,
    isUnisatConnected: () => unisatConnection.connected,
    signPsbt,
    pushPsbt,
  }
}
