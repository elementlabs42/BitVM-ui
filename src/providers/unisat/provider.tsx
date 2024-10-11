import React, { ReactNode } from 'react'
import { UnisatContext } from './context'
import { useUnisatConnection } from '@/hooks/useUnisatConnection'

interface Props {
  children: ReactNode
}

export function UnisatProvider({ children }: Props) {
  const connection = useUnisatConnection()

  return <UnisatContext.Provider value={connection}>{children}</UnisatContext.Provider>
}
