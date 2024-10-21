import { useEffect, useRef, useState } from 'react'

function getItem<T>(key: string, init: T) {
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

function setItem<T>(key: string, value: T) {
  if (value === undefined) {
    window.localStorage.removeItem(key)
  } else {
    const toStore = JSON.stringify(value)
    window.localStorage.setItem(key, toStore)
    return JSON.parse(toStore)
  }
}

export function useLocalStorage<T>(key: string, inititalValue: T) {
  const isMounted = useRef(false)
  const [value, setValue] = useState<T>(() => getItem<T>(key, inititalValue))

  useEffect(() => {
    setValue(getItem<T>(key, inititalValue))
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
