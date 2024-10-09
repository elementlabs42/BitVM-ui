import { useState, useEffect } from 'react';
import { AppBtc, connect, getWalletAddress } from '../utils/ledger';
import axios from 'axios';
import { message } from 'antd';

export const useLedgerConnection = () => {
  const [ledgerConnected, setLedgerConnected] = useState(false);
  const [appBtc, setAppBtc] = useState<AppBtc | null>(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const connectLedger = async () => {
    try {
      const app = await connect();
      setAppBtc(app);

      // Retrieve the wallet address
      const btcAddress = await getWalletAddress(app, 0); // Using index 0 as an example
      setAddress(btcAddress);
      setLedgerConnected(true);
      message.success('Connected to Ledger successfully.');

      // Fetch balance for the address
      await fetchBalance(btcAddress);
    } catch (err: any) {
      setError(err as Error);
      message.error(`Failed to connect to Ledger: ${err.message}`);
    }
  };

  const fetchBalance = async (btcAddress: string) => {
    try {
      // Use a blockchain explorer API to get the balance
      const response = await axios.get(`https://blockchain.info/q/addressbalance/${btcAddress}`);
      setBalance(response.data / 100000000); // Convert satoshi to BTC
    } catch (err: any) {
      setError(err as Error);
      message.error("Failed to fetch balance.");
    }
  };

  const disconnectLedger = () => {
    setAppBtc(null);
    setAddress('');
    setBalance(0);
    setLedgerConnected(false);
    message.info('Disconnected from Ledger.');
  };

  return {
    ledgerConnected,
    connectLedger,
    disconnectLedger,
    address,
    balance,
    error,
  };
};
