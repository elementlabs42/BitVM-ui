import { createContext, useContext } from 'react';
import { ChainType } from '@/constants/unisat';
interface UnisatConnection {
  unisatInstalled: boolean;
  connected: boolean;
  accounts: string[];
  publicKey: string;
  address: string;
  balance: {
    confirmed: number;
    unconfirmed: number;
    total: number;
  };
  network: string;
  version: string;
  chainType: ChainType;
  setNetwork: (network: string) => void;
  setChainType: (chainType: ChainType) => void;
}

const defaultConnection: UnisatConnection = {
  unisatInstalled: false,
  connected: false,
  accounts: [],
  publicKey: '',
  address: '',
  balance: {
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  },
  network: 'livenet',
  version: '',
  chainType: ChainType.BITCOIN_MAINNET,
  setNetwork: () => {},
  setChainType: () => {},
};

export const UnisatContext = createContext<UnisatConnection>(defaultConnection);

export function useUnisat() {
  return useContext(UnisatContext);
}
