import { DarkTheme, LightTheme } from '@/constants/themes'
import { useSettings } from '@/providers/settings/context'
import { useIsClient } from './useIsClient'

export function useTheme() {
  const isClient = useIsClient()
  const { settings, setSettings } = useSettings()
  const theme = settings.useLightTheme ? LightTheme : DarkTheme

  function toggleTheme() {
    if (settings.useLightTheme) {
      setSettings({ ...settings, useLightTheme: false })
    } else {
      setSettings({ ...settings, useLightTheme: true })
    }
  }

  if (isClient) {
    return { theme, useLightTheme: settings.useLightTheme, toggleTheme }
  } else {
    return { theme: LightTheme, useLightTheme: true, toggleTheme }
  }
}
