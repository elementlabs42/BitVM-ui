import { API_URL } from '@/constants/urls'
import { BitvmReponseStatus, Graph, PegInGraph, PegInPsbt, Signatures } from '@/types'
import { bitvmGet, bitvmPost } from '@/utils'
import { useEffect, useState } from 'react'
import { UseAccountReturnType } from 'wagmi'

//TODO: add real parameters for following hooks

export function useBitvmHistory(account: UseAccountReturnType) {
  const [publicKey] = useState<string>('02edf074e2780407ed6ff9e291b8617ee4b4b8d7623e85b58318666f33a422301b')
  const [response, setResponse] = useState<Graph[]>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    ;(async () => {
      if (account.address) {
        const { bitvmResponse, httpError } = await bitvmGet(
          `${API_URL}/history?pubkey=${publicKey}&address=${account.address}`,
        )
        if (httpError) {
          // ignore http error
        } else {
          if (bitvmResponse.status === BitvmReponseStatus.OK) {
            setResponse(bitvmResponse.data)
          } else {
            setError(bitvmResponse.error)
          }
        }
      }
    })()
  }, [publicKey, account.address])

  return { response, error }
}

export function useBitvmUnusedPegInGraphs(refresh: number) {
  const [response, setResponse] = useState<PegInGraph[]>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    ;(async () => {
      const { bitvmResponse, httpError } = await bitvmGet(`${API_URL}/pegins?t=${refresh}`)
      if (httpError) {
        setError('Server error')
        console.error(httpError)
      } else {
        if (bitvmResponse.status === BitvmReponseStatus.OK) {
          setResponse(bitvmResponse.data)
        } else {
          setError(bitvmResponse.error)
        }
      }
    })()
  }, [refresh])

  return {
    response,
    error,
  }
}

export function useBitvmTransactions() {
  const [publicKey] = useState<string>('02edf074e2780407ed6ff9e291b8617ee4b4b8d7623e85b58318666f33a422301b')
  const [address] = useState<string>('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')
  const [outpoint] = useState<string>('0bf8c51c895065effa706d3124b1546a90783818cf8f942418319adac99f9b53:0')
  const [sat] = useState<bigint>(132072n)
  const [response, setResponse] = useState<PegInPsbt>()
  const [error, setError] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      const { bitvmResponse, httpError } = await bitvmGet(
        `${API_URL}/transactions?pubkey=${publicKey}&address=${address}&outpoint=${outpoint}&sat=${sat}`,
      )
      if (httpError) {
        // ignore http error
      } else {
        if (bitvmResponse.status === BitvmReponseStatus.OK) {
          setResponse(bitvmResponse.data)
        } else {
          setError(bitvmResponse.error)
        }
      }
    })()
  }, [publicKey, address, outpoint, sat])
  return {
    response,
    error,
  }
}

export function useBitvmSignatures(signatures: Signatures) {
  const [publicKey] = useState<string>('02edf074e2780407ed6ff9e291b8617ee4b4b8d7623e85b58318666f33a422301b')
  const [address] = useState<string>('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')
  const [outpoint] = useState<string>('0bf8c51c895065effa706d3124b1546a90783818cf8f942418319adac99f9b53:0')
  const [sat] = useState<bigint>(132072n)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      const { bitvmResponse, httpError } = await bitvmPost(
        `${API_URL}/signatures?pubkey=${publicKey}&address=${address}&outpoint=${outpoint}&sat=${sat}`,
        signatures,
      )
      if (httpError) {
        // ignore http error
      } else {
        if (bitvmResponse.status === BitvmReponseStatus.OK) {
          setSuccess(true)
        } else {
          setError(bitvmResponse.error)
        }
      }
    })()
  }, [publicKey, address, outpoint, sat, signatures])
  return {
    success,
    error,
  }
}
