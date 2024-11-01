import { Borders } from '@/constants/themes'
import { ReactNode, useRef } from 'react'
import styled from 'styled-components'

interface Props {
  content?: ReactNode
  children: ReactNode
  className?: string
}

export function Tooltip({ content, children, className }: Props) {
  const anchorRef = useRef<HTMLDivElement>(null)
  const popperRef = useRef<HTMLDivElement>(null)

  const open = (e: React.MouseEvent) => {
    const anchor = anchorRef.current
    const popper = popperRef.current
    if (anchor && popper) {
      popper.style['top'] = `${anchor.offsetTop + anchor.offsetHeight}px`
      popper.style['left'] = `${e.clientX}px`
      popper.style['opacity'] = '1'
      popper.style['transitionDelay'] = '0.8s'
    }
  }

  const close = () => {
    const anchor = anchorRef.current
    const popper = popperRef.current
    if (anchor && popper) {
      popper.style['opacity'] = '0'
      popper.style['transitionDelay'] = '0.2s'
    }
  }

  return content ? (
    <>
      <Anchor ref={anchorRef} onMouseOver={open} onMouseOut={close}>
        {children}
      </Anchor>
      <Popper ref={popperRef} className={className}>
        {content}
      </Popper>
    </>
  ) : (
    children
  )
}

const Anchor = styled.div``
const Popper = styled.div`
  margin: 0.5em 0;
  padding: 0.5em;
  font-size: 0.75em;
  position: absolute;
  color: white;
  border-radius: ${Borders.ButtonRadius};
  background-color: #727272eb;
  opacity: 0;
  transition: opacity 0.2s ease-out;
`
