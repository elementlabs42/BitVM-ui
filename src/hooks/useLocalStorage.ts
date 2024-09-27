import { Settings } from '@/providers/settings/context'
import { useEffect, useRef, useState } from 'react'

function getItem(key: string, init: Settings) {
  try {
    const item = window.localStorage.getItem(key)
    let result
    if (item !== null) {
      try {
        result = JSON.parse(item)
      } catch {
        // do nothing
      }
    }
    return result
  } catch {
    return init
  }
}

function setItem(key: string, value: Settings) {
  if (value === undefined) {
    window.localStorage.removeItem(key)
  } else {
    const toStore = JSON.stringify(value)
    window.localStorage.setItem(key, toStore)
    return JSON.parse(toStore)
  }
}

export function useLocalStorage(key: string, inititalValue: Settings) {
  const isMounted = useRef(false)
  const [value, setValue] = useState(() => getItem(key, inititalValue))

  useEffect(() => {
    setValue(getItem(key, inititalValue))
    return () => {
      isMounted.current = false
    }
  }, [inititalValue, key])

  useEffect(() => {
    if (isMounted.current) {
      setItem(key, value)
    } else {
      isMounted.current = true
    }
  }, [value, key])

  return [value, setValue] as const
}
