import { ReactElement, Suspense, useState } from 'react'
import styled from 'styled-components'
import { Pagination } from './Pagination'
import { Panel } from '../layout/Panel'
import { Pulse } from './common'

interface Props {
  isLoading: boolean
  children: ReactElement[]
  perPage?: number
  className?: string
}

export function PaginationPanel({ isLoading, children, perPage = 6, className }: Props) {
  const [current, setCurrent] = useState(0)
  // const loading = (<Loading>Loading...</Loading>)
  return (
    <Container className={className}>
      {/* <Suspense fallback={loading}> */}
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
      {/* </Suspense> */}
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

const Loading = styled.div`
  display: flex;
  justify-content: center;
  ${Pulse}
`
