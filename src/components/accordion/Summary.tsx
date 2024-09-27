import { Borders } from '@/constants/themes'
import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { IconProps } from '../icons/_base'

interface Props {
  children: ReactNode
  icon: ReactElement<IconProps>
  className?: string
}

export default function Summary({ children, icon, className }: Props) {
  return (
    <IconContainer className={className}>
      <StatusIcon>
        <IconWrapper>{icon}</IconWrapper>
      </StatusIcon>
      <Container>{children}</Container>
    </IconContainer>
  )
}

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.Background};
`

// setting height/width to 3.2em because line-height of right side container is 1.6em
const StatusIcon = styled.div`
  border: 1px solid ${({ theme }) => theme.FooterText};
  height: 3.2em;
  width: 3.2em;
  border-radius: ${Borders.IconRadius};
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0 0 0;
`

const IconWrapper = styled.div`
  font-size: 2em;
  fill: ${({ theme }) => theme.Background};
  stroke: ${({ theme }) => theme.Text};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  line-height: 1.6em;
`
