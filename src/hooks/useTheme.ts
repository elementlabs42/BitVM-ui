import { DarkTheme, LightTheme } from '@/constants/themes'
import { useSettings } from '@/providers/settings/context'
import { useEffect, useState } from 'react'

export function useTheme() {
  const [isClient, setIsClient] = useState(false)
  const { settings, setSettings } = useSettings()
  const theme = settings.useLightTheme ? LightTheme : DarkTheme

  useEffect(() => {
    setIsClient(true)
  }, [])

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
