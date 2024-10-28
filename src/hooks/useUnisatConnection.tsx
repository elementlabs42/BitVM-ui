import { useCallback, useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import { ChainType } from '@/constants/unisat'
import { useLocalStorage } from './useLocalStorage'
import { getErrorOnly } from '@/utils'

export const useUnisatConnection = () => {
  const [unisatInstalled, setUnisatInstalled] = useState(false)
  const [connected, setConnected] = useLocalStorage<string>('unisatConnected', 'false')

  const [accounts, setAccounts] = useState<string[]>([])
  const [publicKey, setPublicKey] = useState('')
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  })
  const [network, setNetwork] = useState('livenet')
  const [version, setVersion] = useState('')
  const [chainType, setChainType] = useState<ChainType>(ChainType.BITCOIN_MAINNET)
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const [unisat, setUnisat] = useState<any>()

  const selfRef = useRef<{ accounts: string[] }>({
    accounts: [],
  })

  const signPsbt = async (psbtHex: string, signInputs: { index: number; address: string }[]) => {
    const psbtResult = await (window as any).unisat.signPsbt(psbtHex, {
      autoFinalized: true,
      toSignInputs: signInputs,
    });
    return psbtResult
  }

  const pushPsbt = async (psbtHex: string) => {
    const psbtResult = await (window as any).unisat.pushPsbt(psbtHex);
    return psbtResult
  }


  useEffect(() => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const instance = (window as any).unisat
    if (instance) {
      setUnisat(instance)
    }
  }, [])

  const getBasicInfo = useCallback(async () => {
    console.log('getBasicInfo')
    if (!unisat) return
    console.log('unisat', unisat)
    try {
      const accounts = await unisat.getAccounts()
      setAccounts(accounts)
    } catch (e) {
      console.log('getAccounts error', e)
    }

    try {
      const publicKey = await unisat.getPublicKey()
      setPublicKey(publicKey)
    } catch (e) {
      console.log('getPublicKey error', e)
    }

    try {
      const balance = await unisat.getBalance()
      setBalance(balance)
    } catch (e) {
      console.log('getBalance error', e)
    }

    try {
      const chain = await unisat.getChain()
      setChainType(chain.enum)
    } catch (e) {
      console.log('getChain error', e)
    }

    try {
      const network = await unisat.getNetwork()
      setNetwork(network)
    } catch (e) {
      console.log('getNetwork error', e)
    }

    try {
      const version = await unisat.getVersion()
      setVersion(version)
    } catch (e) {
      console.log('getVersion error ', e)
    }
  }, [unisat])

  const handleAccountsChanged = useCallback(
    (_accounts: string[]) => {
      console.log('accounts changed', _accounts)
      if (selfRef.current.accounts[0] === _accounts[0]) {
        return
      }
      selfRef.current.accounts = _accounts
      if (_accounts.length > 0) {
        setAccounts(_accounts)
        setConnected(true)
        setAddress(_accounts[0])
        getBasicInfo()
      } else {
        setConnected(false)
      }
    },
    [setConnected, getBasicInfo],
  )

  const handleNetworkChanged = useCallback(
    (network: string) => {
      console.log('network changed', network)
      setNetwork(network)
      getBasicInfo()
    },
    [getBasicInfo],
  )

  const handleChainChanged = useCallback(
    (chain: { enum: ChainType; name: string; network: string }) => {
      console.log('chain changed', chain)
      setChainType(chain.enum)
      getBasicInfo()
    },
    [getBasicInfo],
  )

  const connect = useCallback(async () => {
    const checkUnisat = async () => {
      let unisat = (window as any).unisat
      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i))
        unisat = (window as any).unisat
      }

      if (unisat) {
        setUnisatInstalled(true)
        try {
          const accounts = await unisat.requestAccounts()
          handleAccountsChanged(accounts)
        } catch (e) {
          const error = getErrorOnly(e)
          message.error(error.message)
        }

        unisat.on('accountsChanged', handleAccountsChanged)
        unisat.on('networkChanged', handleNetworkChanged)
        unisat.on('chainChanged', handleChainChanged)
      } else {
        setUnisatInstalled(false)
      }
    }

    await checkUnisat()
  }, [handleAccountsChanged, handleChainChanged, handleNetworkChanged, unisat])

  const disconnect = () => {
    if (unisat) {
      unisat.removeListener('accountsChanged', handleAccountsChanged)
      unisat.removeListener('networkChanged', handleNetworkChanged)
      unisat.removeListener('chainChanged', handleChainChanged)
    }
    setConnected(false)
    setAccounts([])
    setPublicKey('')
    setAddress('')
    setBalance({ confirmed: 0, unconfirmed: 0, total: 0 })
  }
  useEffect(() => {
    if (connected) {
      connect()
    }
  }, [connected, connect])

  return {
    unisatInstalled,
    connected,
    connect,
    disconnect,
    accounts,
    publicKey,
    address,
    balance,
    network,
    version,
    chainType,
    setNetwork,
    setChainType,
    signPsbt,
    pushPsbt,
  }
}
