import { useState, useEffect } from 'react';
import { BTCConnectorType } from '@/constants/connector';
import { useUnisatConnection } from './useUnisatConnection';
import { useTrezorConnection } from './useTrezorConnection';
import { useLedgerConnection } from './useLedgerConnection';


export function useBTCConnector() {
  const [selectedProvider, setSelectedProvider] = useState<BTCConnectorType | null>(
    typeof window !== 'undefined' ? window.localStorage.getItem('selectedProvider') as BTCConnectorType | null : null
  );
  const unisatConnection = useUnisatConnection();
  const trezorConnection = useTrezorConnection();
  const ledgerConnection = useLedgerConnection();

  useEffect(() => {
    if (selectedProvider) {
      typeof window !== 'undefined' && window.localStorage.setItem('selectedProvider', selectedProvider);
    }
  }, [selectedProvider]);

  const selectUnisat = async () => {
    setSelectedProvider(BTCConnectorType.UNISAT);
    try {
        await unisatConnection.connect();
      } catch (error) {
        console.error('Failed to connect with Unisat:', error);
      }
  };

  const selectTrezor = async () => {
    setSelectedProvider(BTCConnectorType.TREZOR);
    try {
        await trezorConnection.connect();
      } catch (error) {
        console.error('Failed to connect with Trezor:', error);
      }
  };

  const selectLedger = async () => {
    setSelectedProvider(BTCConnectorType.LEDGER);
    try {
        await ledgerConnection.connectLedger();
      } catch (error) {
        console.error('Failed to connect with Ledger:', error);
      }
  };

  const getBalance = async () => {
     if (selectedProvider === BTCConnectorType.UNISAT) {
      return unisatConnection.balance.total;
     } else if (selectedProvider === BTCConnectorType.TREZOR) {
      return trezorConnection.balance;
     } else if (selectedProvider === BTCConnectorType.LEDGER) {
      return ledgerConnection.balance;
     }
  };

  const getAddress = async () => {
    if (selectedProvider === BTCConnectorType.UNISAT) {
      return unisatConnection.address;
    } else if (selectedProvider === BTCConnectorType.TREZOR) {
      return trezorConnection.address;
    } else if (selectedProvider === BTCConnectorType.LEDGER) {
      return ledgerConnection.address;
    }
  };

  const isConnected = () => {
    if (selectedProvider === BTCConnectorType.UNISAT) {
      return unisatConnection.connected;
    } else if (selectedProvider === BTCConnectorType.TREZOR) {
      return trezorConnection.trezorConnected;
    } else if (selectedProvider === BTCConnectorType.LEDGER) {
      return ledgerConnection.ledgerConnected;
    }
  };

  return {
    selectedProvider,
    isConnected,
    selectUnisat,
    selectTrezor,
    getBalance,
    getAddress,
    selectLedger,
    isLedgerConnected: () => ledgerConnection.ledgerConnected,
    isTrezorConnected: () => trezorConnection.trezorConnected,
    isUnisatConnected: () => unisatConnection.connected,
  };
}
