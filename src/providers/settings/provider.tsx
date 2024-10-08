import React, { ReactNode } from 'react'
import { DEFAULT_SETTINGS, SETTINGS_VERSION, Settings, SettingsContext } from './context'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface Props {
  children: ReactNode
}

export function SettingsProvider({ children }: Props) {
  const [savedSettings, setSettings] = useLocalStorage(SETTINGS_VERSION, DEFAULT_SETTINGS)

  const settings: Settings = {
    ...DEFAULT_SETTINGS,
    ...(savedSettings ?? {}),
  }

  const restoreDefaults = () => setSettings(DEFAULT_SETTINGS)

  return (
    <SettingsContext.Provider value={{ settings, setSettings, restoreDefaults }}>{children}</SettingsContext.Provider>
  )
}
