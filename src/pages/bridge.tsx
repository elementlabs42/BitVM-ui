import { Label, RoundedElement, TextInput, Warning } from '@/components/controls'
import { Page } from '@/components/layout'
import { Panel } from '@/components/layout/Panel'
import styled from 'styled-components'

export default function Bridge() {
  const selectLabel = <Label text={'You Supply'} />
  const warningLabel = <Warning text={'The satoshi equivalent of the number is a power of 2'} />
  return (
    <Page>
      <Title>Bridge</Title>
      <FormPanelWithButton>
        <FormPanel>
          <TextInput label={selectLabel} validate={(t) => t === 'aaa'} warning={warningLabel} />
        </FormPanel>
        <Buttons>
          <Button onClick={() => {}}>Back</Button>
          <Button onClick={() => {}} active={true}>
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
  row-gap: 1em;
  justify-content: right;
`

const Button = styled(RoundedElement)`
  padding: 1.2em 2em;
`
