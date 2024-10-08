import { createContext, useContext } from 'react'

export const SETTINGS_VERSION = 'bifrost_settings_v20240924'

export interface Settings {
  useLightTheme: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  useLightTheme: true,
}

export const SettingsContext = createContext<{
  settings: Settings
  setSettings: (settings: Settings) => void
  restoreDefaults: () => void
}>({
  settings: DEFAULT_SETTINGS,
  setSettings: () => {},
  restoreDefaults: () => {},
})

export function useSettings() {
  return useContext(SettingsContext)
}
