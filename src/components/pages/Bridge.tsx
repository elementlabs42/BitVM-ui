import styled from 'styled-components'
import { useState } from 'react'
import { RoundedElement } from '@/components/controls'
import { BackgroundPattern } from '@/components/controls/common'
import { PegIn, PegOut } from '@/components/pages/forms'
import { HomeRoutes } from './useHomeRoutes'
import { BridgeDirection, useBridgeDirection } from '@/providers/BridgeDirection'

interface Props {
  route?: (page: HomeRoutes) => void
}

export function Bridge({ route }: Props) {
  const [formValid, setFormValid] = useState(false)
  const { direction } = useBridgeDirection()
  const [submit, setSubmit] = useState<(valid?: boolean) => void>()

  return (
    <>
      <Title>Confirm amount</Title>
      <FormPanelWithButton>
        <BackgroundPatternStyled />
        {direction === BridgeDirection.PEG_IN ? (
          <PegIn setFormValid={setFormValid} />
        ) : (
          <PegOut onFormValidate={setFormValid} setSubmit={setSubmit} />
        )}
        <Buttons>
          {route && <Button onClick={() => route?.('Home')}>Back</Button>}
          <Button onClick={submit} active={formValid}>
            Next
          </Button>
        </Buttons>
      </FormPanelWithButton>
    </>
  )
}

const BackgroundPatternStyled = styled(BackgroundPattern)`
  width: 208px;
  height: 208px;
  position: absolute;
  margin: 0;
  z-index: 0;
  pointer-events: none;
`

const Title = styled.h1`
  margin: 0;
  padding: 0 1vw;
`

const FormPanelWithButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Buttons = styled.div`
  margin: 1em 0;
  display: flex;
  flex-direction: row;
  column-gap: 0.5em;
  justify-content: right;
`

const Button = styled(RoundedElement)`
  padding: 1.2em 2em;
`
