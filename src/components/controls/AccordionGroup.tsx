import { createContext, useContext, useState, ReactElement, useEffect, ReactNode, useRef } from 'react'
import styled from 'styled-components'
import { Loading } from './common'
import { usePagination } from '@/providers/Pagination'

interface Props {
  children?: ReactElement[]
  className?: string
}

export function AccordionGroup({ children, className }: Props) {
  return (
    <AccordionContextProvider>
      <AccordionRoot className={className}>{children}</AccordionRoot>
    </AccordionContextProvider>
  )
}

function AccordionRoot({ children, className }: Props) {
  const { setTotal, perPage, current } = usePagination()
  const { expandedCount } = useAccordionContext()
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTotal(children ? children.length : 0)
  }, [children, setTotal])

  useEffect(() => {
    if (expandedCount === 0) {
      stretch()
    } else {
      shrink()
    }
  }, [expandedCount])

  const shrink = () => {
    if (root.current) {
      root.current.style['rowGap'] = '0em'
    }
  }

  const stretch = () => {
    if (root.current) {
      root.current.style['rowGap'] = '1.5em'
    }
  }

  return children ? (
    <Container ref={root} className={className}>
      {children.slice(current * perPage, (current + 1) * perPage)}
    </Container>
  ) : (
    <Loading />
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5em;
  transition: row-gap 0.2s ease-out;
`

type AccordionData = {
  expandedCount: number
  expand: () => void
  collapse: () => void
}

const DEFAULT: AccordionData = {
  expandedCount: 0,
  expand: () => {},
  collapse: () => {},
}

const AccordionContext = createContext<AccordionData>(DEFAULT)

function AccordionContextProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(0)
  const expand = () => {
    setExpanded(expanded + 1)
  }

  const collapse = () => {
    setExpanded(expanded < 1 ? 0 : expanded - 1)
  }
  return (
    <AccordionContext.Provider value={{ expandedCount: expanded, expand, collapse }}>
      {children}
    </AccordionContext.Provider>
  )
}

export function useAccordionContext() {
  return useContext(AccordionContext)
}
