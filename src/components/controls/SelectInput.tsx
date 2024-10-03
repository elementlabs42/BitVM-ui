import styled from 'styled-components'
import { ReactNode, useRef } from 'react'
import { InputContainer, InputStyle, withLabel } from './common'
import { RoundedIcon } from '.'
import { ChevronDown } from '../icons'

interface Props {
  label: ReactNode
  placeHolder?: ReactNode
  children: ReactNode
  className?: string
}

export function SelectInput({ label, placeHolder = '', children, className }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)

  const input = (
    <Container>
      <SelectContainer className={className}>
        <Select>{placeHolder != '' && <PlaceHolder>{placeHolder}</PlaceHolder>}</Select>
        <Icon icon={<ChevronDown iconRef={iconRef} />} noBorder={true} size={1} />
      </SelectContainer>
      <Items ref={wrapperRef}>
        <ItemContent ref={contentRef}>{children}</ItemContent>
      </Items>
    </Container>
  )
  return withLabel({ label, input, className })
}

const Container = styled.div``

const SelectContainer = styled(InputContainer)`
  cursor: pointer;
`

const Select = styled.div`
  ${InputStyle}
`

const Icon = styled(RoundedIcon)`
  margin-right: 1em;
`

const PlaceHolder = styled.span`
  color: ${({ theme }) => theme.FooterText};
`

const Items = styled.div``

const ItemContent = styled.div``
