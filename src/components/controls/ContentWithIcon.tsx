import { ReactElement } from 'react'
import styled from 'styled-components'
import { IconProps } from '../icons/_base'
import { WrappedIcon } from './WrappedIcon'

interface Props {
  children: ReactElement[]
  icon: ReactElement<IconProps>
  className?: string
}

export function ContentWithIcon({ children, icon, className }: Props) {
  return (
    <Container className={className}>
      <WrappedIcon icon={icon} size={children.length} />
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  line-height: 1.6em;
`
