import { API_URL } from '@/constants/urls'
import { BitvmReponseStatus, BitvmResponse } from '@/types'
import { useEffect, useState } from 'react'

export function useBitvm() {
  const [publicKey] = useState<string>('02edf074e2780407ed6ff9e291b8617ee4b4b8d7623e85b58318666f33a422301b')
  const [address] = useState<string>('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')
  const [response, setResponse] = useState<BitvmResponse>({ status: BitvmReponseStatus.NOK })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const response = await fetch(`${API_URL}/history?pubkey=${publicKey}&address=${address}`)
      const data = await response.json()
      setIsLoading(false)
      setResponse(data)
    })()
  }, [publicKey, address])
  return {
    response,
    isLoading,
  }
}
