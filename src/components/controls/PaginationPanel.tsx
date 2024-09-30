import { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { Borders } from '@/constants/themes'
import { Pagination } from './Pagination'

interface Props {
  children: ReactElement[]
  perPage?: number
  className?: string
}

export function PaginationPanel({ children, perPage = 6, className }: Props) {
  const [current, setCurrent] = useState(0)
  return (
    <Container className={className}>
      <Content>{children.slice(current * perPage, (current + 1) * perPage)}</Content>
      {children.length > perPage && (
        <PaginationWrapper>
          <Pagination
            total={Math.ceil(children.length / perPage)}
            current={current}
            onPageClick={(pageIndex) => {
              setCurrent(pageIndex)
            }}
          />
        </PaginationWrapper>
      )}
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.Background};
  border-radius: ${Borders.PanelRadius};
  box-shadow:
    0px 20px 24px -4px ${({ theme }) => theme.ShadowInner},
    0px 8px 8px -4px ${({ theme }) => theme.ShadowOuter};
`

const Content = styled.div``

const PaginationWrapper = styled.div`
  margin: 1em 3em 0 0;
  display: flex;
  justify-content: right;
`
