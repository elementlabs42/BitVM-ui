import { createContext, useContext, useState } from 'react'

type PaginationData = {
  total: number
  setTotal: (total: number) => void
  perPage: number
  current: number
  setCurrent: (page: number) => void
}

const DEFAULT: PaginationData = {
  total: 0,
  setTotal: () => {},
  perPage: 6,
  current: 0,
  setCurrent: () => {},
}

const PaginationContext = createContext<PaginationData>(DEFAULT)

export function PaginationProvider({ children }: { children: React.ReactNode }) {
  const [totalInternal, setTotalInternal] = useState(0)
  const setTotal = (total: number) => {
    setTotalInternal(total)
  }

  const [currentInternal, setCurrentInternal] = useState(0)
  const setCurrent = (page: number) => {
    setCurrentInternal(page)
  }
  return (
    <PaginationContext.Provider
      value={{ total: totalInternal, setTotal, perPage: DEFAULT.perPage, current: currentInternal, setCurrent }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export function usePagination() {
  return useContext(PaginationContext)
}
