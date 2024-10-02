import styled from 'styled-components'
import { Borders } from '@/constants/themes'
import { RoundedElement, RoundedIcon } from './Rounded'
import { ChevronLeft, ChevronRight } from '../icons'

interface Props {
  total: number
  current: number
  onPageClick: (page: number) => void
  className?: string
}

export function Pagination({ total, current, onPageClick, className }: Props) {
  return (
    <Container className={className}>
      <RoundedIcon
        icon={<SmallChevronLeft />}
        size={1.4}
        onClick={() => onPageClick(current === 0 ? 0 : current - 1)}
      />
      {[...Array(total)].map((_, index) => (
        <RoundedElement key={index} active={index === current} onClick={() => onPageClick(index)}>
          {index + 1}
        </RoundedElement>
      ))}
      <RoundedIcon
        icon={<SmallChevronRight />}
        size={1.4}
        onClick={() => onPageClick(current === total - 1 ? total - 1 : current + 1)}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5em;
  background-color: ${({ theme }) => theme.Background};
  border-radius: ${Borders.PanelRadius};
`

const SmallChevronLeft = styled(ChevronLeft)`
  font-size: 0.5em;
`

const SmallChevronRight = styled(ChevronRight)`
  font-size: 0.5em;
`
