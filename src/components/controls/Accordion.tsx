import { Children, ReactNode, useRef, useState } from 'react'
import styled from 'styled-components'
import { ChevronRight } from '../icons'
import { Borders } from '@/constants/themes'
import { useAccordionContext } from './AccordionGroup'

interface Props {
  children: ReactNode
  className?: string
}

export type AccordionState = {
  collapsed: boolean
}

const DETAIL_VERTICAL_MARGIN = 1 //em

export function Accordion({ children, className }: Props) {
  const [collapsed, setCollapsed] = useState(true)
  const [summary, ...details] = Children.toArray(children)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const expanderIconRef = useRef<SVGSVGElement>(null)
  const { expand, collapse } = useAccordionContext()

  const getContentHeight = () => (contentRef.current ? contentRef.current['clientHeight'] : 0)

  const toggleDetail = () => {
    const node = wrapperRef.current
    const icon = expanderIconRef.current
    if (node && icon) {
      if (collapsed) {
        if (contentRef.current) {
          contentRef.current.style.position = 'absolute'
        }
        const contentHeight = getContentHeight()
        if (contentRef.current) {
          contentRef.current.style.position = ''
        }

        node.style['height'] = `calc(${contentHeight}px + ${DETAIL_VERTICAL_MARGIN * 2}em)`
        icon.style['transform'] = 'rotate(90deg)'
        setCollapsed(false)
        expand()
      } else {
        node.style['height'] = '0'
        icon.style['transform'] = 'rotate(0deg)'
        setCollapsed(true)
        collapse()
      }
    }
  }

  return (
    <Container className={className}>
      <Expander onClick={toggleDetail}>
        <SummaryContent>{summary}</SummaryContent>
        <ExpanderIcon iconRef={expanderIconRef} />
      </Expander>
      <Details ref={wrapperRef}>
        <DetailsContent ref={contentRef}>{details}</DetailsContent>
      </Details>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0.7em;
  border-radius: ${Borders.PanelRadius};

  &:hover {
    background-color: ${({ theme }) => theme.HoverArea};
  }
`

const Expander = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 1em;
  cursor: pointer;
`

const ExpanderIcon = styled(ChevronRight)`
  font-size: 1em;
  fill: ${({ theme }) => theme.Background};
  stroke: ${({ theme }) => theme.Text};
  transition: transform 0.2s ease-out;
`

const SummaryContent = styled.div``

const Details = styled.div`
  overflow: hidden;
  height: 0;
  transition: height 0.2s ease-out;
`

const DetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.6vh;
  justify-content: space-between;
  margin: ${DETAIL_VERTICAL_MARGIN}em 2em ${DETAIL_VERTICAL_MARGIN}em 1em;
  padding: 1em;
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: ${({ theme }) => theme.AccordionDetailBorder};
  background-color: ${({ theme }) => theme.AccordionDetailBackground};
`
