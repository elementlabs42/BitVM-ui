import { Children, ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import { Pager } from './Pager'
import { Panel } from '../layout/Panel'
import { PaginationProvider, usePagination } from '@/providers/Pagination'
import { Loading } from './common'

interface Props {
  children?: ReactNode
  className?: string
}
export function PaginationPanel({ children, className }: Props) {
  return (
    <PaginationProvider>
      <PaginationPanelInternal className={className}>{children}</PaginationPanelInternal>
    </PaginationProvider>
  )
}

function PaginationPanelInternal({ children, className }: Props) {
  const elements = Children.toArray(children)
  const { total, setTotal, perPage, current, setCurrent } = usePagination()

  useEffect(() => {
    if (elements.length > 1) {
      setTotal(elements.length)
    }
  }, [elements, setTotal])

  return (
    <Container className={className}>
      {children ? (
        elements.length > 1 ? (
          <>{elements.slice(current * perPage, (current + 1) * perPage)}</>
        ) : (
          elements
        )
      ) : (
        <Loading />
      )}
      {total > perPage && (
        <PagerWrapper>
          <Pager
            total={Math.ceil(total / perPage)}
            current={current}
            onPageClick={(pageIndex) => {
              setCurrent(pageIndex)
            }}
          />
        </PagerWrapper>
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

const PagerWrapper = styled.div`
  margin: 1em 3em 0 0;
  display: flex;
  justify-content: right;
`
