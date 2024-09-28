import { ReactElement } from 'react'
import styled from 'styled-components'
import { IconProps } from '../icons/_base'
import { ChevronRight } from '../icons'
import ContentWithIcon from './ContentWithIcon'

interface Props {
  children: ReactElement[]
  icon: ReactElement<IconProps>
  className?: string
}

export default function Summary({ children, icon, className }: Props) {
  return (
    <Expander className={className}>
      <SummaryContent icon={icon}>{children}</SummaryContent>
      <ExpanderIcon />
    </Expander>
  )
}

const Expander = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  cursor: pointer;
`

const ExpanderIcon = styled(ChevronRight)`
  font-size: 1em;
  fill: ${({ theme }) => theme.Background};
  stroke: ${({ theme }) => theme.Text};
`

const SummaryContent = styled(ContentWithIcon)``
