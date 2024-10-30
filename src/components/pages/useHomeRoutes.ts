import { useState } from 'react'

export type HomeRoutes = 'BtcConnect' | 'EthereumConnect' | 'Bridge' | 'Home'

export function useHomeRoutes(): [HomeRoutes, (page: HomeRoutes) => void] {
  const [page, setPage] = useState<HomeRoutes>('Home')
  return [page, setPage]
}
