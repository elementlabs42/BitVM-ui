import { Label, RoundedElement, TextInput, TextInputWithAction, Warning } from '@/components/controls'
import { Bitcoin } from '@/components/icons'
import { Page } from '@/components/layout'
import { Panel } from '@/components/layout/Panel'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Bridge() {
  const [formValid, setFormValid] = useState(true)
  const [amountValid, setAmountValid] = useState(true)
  const [addressValid, setAddressValid] = useState(true)

  useEffect(() => {
    setFormValid(amountValid && addressValid)
  }, [amountValid, addressValid])

  const selectLabel = <Label text={'You Supply'} withHelp={true} />
  const warningLabel = <Warning text={'The satoshi equivalent of the number is a power of 2'} withHelp={true} />
  return (
    <Page>
      <Title>Bridge</Title>
      <FormPanelWithButton>
        <FormPanel>
          <TextInputWithAction
            label={selectLabel}
            validate={(t) => {
              const result = t === 'aaa'
              setAmountValid(result)
              return result
            }}
            warning={warningLabel}
            inputIcon={<Bitcoin />}
            action="MAX"
            onAction={(input) => input.current && (input.current.value = 'suggested value')}
          />
          <TextInput
            label={<Label text={'Recipient address'} />}
            validate={(t) => {
              const result = t === 'aaa'
              setAddressValid(result)
              return result
            }}
            warning={<Warning text={'Incorrect Ethereum address format'} />}
          />
        </FormPanel>
        <Buttons>
          <Button onClick={() => {}}>Back</Button>
          <Button onClick={() => {}} active={formValid}>
            Next
          </Button>
        </Buttons>
      </FormPanelWithButton>
    </Page>
  )
}

const Title = styled.h1`
  margin: 0;
  padding: 0 1vw;
`

const FormPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  min-height: 50vh;
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
