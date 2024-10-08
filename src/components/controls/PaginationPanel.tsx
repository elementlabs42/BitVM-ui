import { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { Pagination } from './Pagination'
import { Panel } from '../layout/Panel'

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

const Container = styled(Panel)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Content = styled.div``

const PaginationWrapper = styled.div`
  margin: 1em 3em 0 0;
  display: flex;
  justify-content: right;
`
