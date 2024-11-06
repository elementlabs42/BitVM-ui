import { createContext, useContext, useState } from 'react'

export enum BridgeDirection {
  PEG_IN,
  PEG_OUT,
}

type BridgeDirectionData = {
  direction: BridgeDirection
  setDirection: (direction: BridgeDirection) => void
}

const DEFAULT: BridgeDirectionData = {
  direction: BridgeDirection.PEG_IN,
  setDirection: () => {},
}

const BridgeDirectionContext = createContext<BridgeDirectionData>(DEFAULT)

export function BridgeDirectionProvider({ children }: { children: React.ReactNode }) {
  const [directionInternal, setDirectionInternal] = useState(BridgeDirection.PEG_IN)
  const setDirection = (direction: BridgeDirection) => {
    setDirectionInternal(direction)
  }
  return (
    <BridgeDirectionContext.Provider value={{ direction: directionInternal, setDirection }}>
      {children}
    </BridgeDirectionContext.Provider>
  )
}

export function useBridgeDirection() {
  return useContext(BridgeDirectionContext)
}
