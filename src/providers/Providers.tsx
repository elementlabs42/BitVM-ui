import React, { ReactNode } from 'react'
import { SettingsProvider } from './settings/provider'

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return (
    <SettingsProvider>
      {props.children}
    </SettingsProvider>
  )
}
