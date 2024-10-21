import {
  Label,
  RoundedElement,
  RoundedIcon,
  SelectInput,
  TextInput,
  TextInputWithAction,
  Warning,
} from '@/components/controls'
import { BackgroundPattern } from '@/components/controls'
import { Bitcoin, Swap } from '@/components/icons'
import { Page, Panel } from '@/components/layout'
import { BTCConnectorType } from '@/constants/connector'
import { useBtcConnector } from '@/providers/BtcConnector'
import { empty, parseAddressType } from '@/utils'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Bridge() {
  const [formValid, setFormValid] = useState(false)
  const [amountValid, setAmountValid] = useState(false)
  const [addressValid, setAddressValid] = useState(false)
  const [selectValid, setSelectValid] = useState(false)
  const { selectedProvider, isConnected, btcAddress, btcBalance } = useBtcConnector()
  const [addressType, setAddressType] = useState('')

  useEffect(() => {
    let valid = amountValid && addressValid && isConnected
    switch (selectedProvider) {
      case BTCConnectorType.UNISAT:
        break
      case BTCConnectorType.LEDGER:
      case BTCConnectorType.TREZOR:
        valid = valid && selectValid
        break
      default:
        valid = false
        break
    }
    setFormValid(valid)
  }, [amountValid, addressValid, selectValid, isConnected, selectedProvider])

  useEffect(() => {
    setAddressType(parseAddressType(btcAddress).address)
  }, [btcAddress])

  const selectLabel = <Label text={'You Supply'} withHelp={true} />
  const warningLabel = <Warning text={'The satoshi equivalent of the number is a power of 2'} withHelp={true} />
  const accountInfo = () => {
    if (isConnected) {
      switch (selectedProvider) {
        case BTCConnectorType.UNISAT:
          return (
            <TextInput
              label={<Label text={'Bitcoin account'} />}
              value={
                <Account>
                  <AccountType>{addressType}</AccountType>
                  <AccountAmount>{`${btcBalance} sat`}</AccountAmount>
                  <AccountAddress>{btcAddress}</AccountAddress>
                </Account>
              }
              disabled={true}
            />
          )
        case BTCConnectorType.LEDGER:
        case BTCConnectorType.TREZOR:
          return (
            <SelectInput
              label={<Label text={'Select Bitcoin account to bridge'} withHelp={true} />}
              notifyValidation={setSelectValid}
              placeHolder="Select Bitcoin account"
            >
              <Account>
                <AccountType>Legacy</AccountType>
                <AccountAmount>1.19 BTC</AccountAmount>
              </Account>
              <Account>
                <AccountType>SegWit</AccountType>
                <AccountAmount>5.32 BTC</AccountAmount>
              </Account>
              <Account>
                <AccountType>Native SegWit</AccountType>
                <AccountAmount>5.32 BTC</AccountAmount>
              </Account>
            </SelectInput>
          )
      }
    }
    return <Warning text={'Please connect a BTC wallet'} />
  }
  return (
    <Page>
      <Title>Confirm amount</Title>
      <FormPanelWithButton>
        <BackgroundPatternStyled />
        <FormPanel>
          <SwapIcon icon={<Swap />} size={1} />
          <Subtitle>Bridge</Subtitle>
          <Supplementary>Supply BTC to send eBTC to your Ethereum wallet</Supplementary>
          {accountInfo()}
          <TextInputWithAction
            label={selectLabel}
            placeHolder="0.0"
            validate={(t) => {
              const result = !empty(t) ? t === 'aaa' : false
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
              const result = !empty(t) ? t === 'aaa' : false
              setAddressValid(result)
              return result
            }}
            warning={<Warning text={'Incorrect Ethereum address format'} />}
          />
          <Supplementaries>
            <Supplementary>
              <span>Destination chain:</span>
              <span>Ethereum</span>
            </Supplementary>
            <Supplementary>
              <span>Handling fee:</span>
              <span>0</span>
            </Supplementary>
            <Supplementary>
              <span>You receive:</span>
              <span>100 eBTC</span>
            </Supplementary>
            <Supplementary>
              <span>Refund address:</span>
              <span>tb1qd28npep0s8frcm3y7dxqajkcy2m40eysplyr9v</span>
            </Supplementary>
          </Supplementaries>
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

const BackgroundPatternStyled = styled(BackgroundPattern)`
  width: 208px;
  position: absolute;
  margin: 0;
  height: 208px;
  z-index: 0;
  pointer-events: none;
`

const Title = styled.h1`
  margin: 0;
  padding: 0 1vw;
`

const SwapIcon = styled(RoundedIcon)`
  border-radius: 40%;
  background-color: ${({ theme }) => theme.Background};
  box-shadow: 0px 2px 2px 2px ${({ theme }) => theme.ShadowInner};
`

const Subtitle = styled.h3`
  margin: 0;
`

const FormPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  min-height: 50vh;
  z-index: 1;
  background-color: ${({ theme }) => theme.BackgroundTransparent};
`

const FormPanelWithButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Account = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 1em;
`

const AccountAddress = styled.div``
const AccountType = styled.div``
const AccountAmount = styled.div`
  color: ${({ theme }) => theme.FooterText};
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

const Supplementaries = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`

const Supplementary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.8em;
  color: ${({ theme }) => theme.FooterText};
`
