import { useEffect, useRef, useState } from 'react'

export function useThrottle<T>(value: T, interval: number = 500): T {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastUpdated = useRef<number>()

  useEffect(() => {
    const now = Date.now()

    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      lastUpdated.current = now
      setThrottledValue(value)
    } else {
      const id = window.setTimeout(() => {
        lastUpdated.current = now
        setThrottledValue(value)
      }, interval)

      return () => window.clearTimeout(id)
    }
  }, [value, interval])

  return throttledValue
}
