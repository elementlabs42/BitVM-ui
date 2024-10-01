import { ReactElement } from 'react'
import styled from 'styled-components'
import { IconProps } from '../icons/_base'
import { RoundedIcon } from './Rounded'

interface Props {
  children: ReactElement[]
  icon: ReactElement<IconProps>
  className?: string
}

interface ActionProps extends Props {
  actionIcon?: ReactElement<IconProps>
  onAction?: () => void
}

export function ContentWithIcon({ children, icon, className }: Props) {
  return (
    <Container className={className}>
      <RoundedIcon icon={icon} size={children.length} />
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

export function ContentWithIconAndAction({ children, icon, actionIcon, onAction, className }: ActionProps) {
  const actionIconComponent = actionIcon && (
    <RoundedIcon icon={actionIcon} noBorder={true} size={children.length} onClick={onAction} />
  )
  return (
    <ActionContainer className={className}>
      <Container>
        <RoundedIcon icon={icon} size={children.length} />
        <ContentWrapper>{children}</ContentWrapper>
      </Container>
      {actionIconComponent}
    </ActionContainer>
  )
}

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
