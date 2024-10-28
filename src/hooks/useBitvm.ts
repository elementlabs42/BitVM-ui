import { API_URL } from '@/constants/urls'
import { BitvmReponseStatus, Graph, PegInPsbt, Signatures } from '@/types'
import { useEffect, useState } from 'react'

export function useBitvmQuery() {
  const [publicKey] = useState<string>('02edf074e2780407ed6ff9e291b8617ee4b4b8d7623e85b58318666f33a422301b')
  const [address] = useState<string>('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')
  const [response, setResponse] = useState<Graph[]>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    ;(async () => {
      const response = await fetch(`${API_URL}/history?pubkey=${publicKey}&address=${address}`)
      const data = await response.json()
      if (data.status === BitvmReponseStatus.OK) {
        setResponse(data.data)
      } else {
        setError(data.error)
      }
    })()
  }, [publicKey, address])
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
      const response = await fetch(
        `${API_URL}/transactions?pubkey=${publicKey}&address=${address}&outpoint=${outpoint}&sat=${sat}`,
      )
      const data = await response.json()
      if (data.status === BitvmReponseStatus.OK) {
        setResponse(data)
      } else {
        setError(data.error)
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
      const response = await fetch(
        `${API_URL}/signatures?pubkey=${publicKey}&address=${address}&outpoint=${outpoint}&sat=${sat}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signatures),
        },
      )
      const data = await response.json()
      if (data.status === BitvmReponseStatus.OK) {
        setSuccess(true)
      } else {
        setError(data.error)
      }
    })()
  }, [publicKey, address, outpoint, sat, signatures])
  return {
    success,
    error,
  }
}
