import styled from 'styled-components'
import { ReactNode, useEffect, useState } from 'react'
import { Label, SelectInput, TextInput, TextInputInfo, TextInputWithAction, Warning } from '@/components/controls'
import { Bitcoin, Swap } from '@/components/icons'
import { BTCConnectorType } from '@/constants/connector'
import { useBtcConnector } from '@/providers/BtcConnector'
import { empty, formatBtc, formatInput, isPow2, parseAddressType, parseBtc, prevPow2 } from '@/utils'
import { isAddress } from 'viem'
import { FormPanel, Subtitle, Supplementaries, Supplementary, SwapIcon } from './styles'

interface Props {
  setFormValid: (valid: boolean) => void
}

export function PegIn({ setFormValid }: Props) {
  const [amountValid, setAmountValid] = useState(false)
  const [addressValid, setAddressValid] = useState(false)
  const [selectValid, setSelectValid] = useState(false)
  const { selectedProvider, isConnected, btcAddress, btcBalance } = useBtcConnector()
  const [addressType, setAddressType] = useState('')

  const [amountField, setAmountField] = useState('')
  const [amountWarning, setAmountWarning] = useState<ReactNode>()
  const [addressField, setAddressField] = useState('')
  const [addressWarning, setAddressWarning] = useState<ReactNode>()

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
  }, [amountValid, addressValid, selectValid, isConnected, selectedProvider, setFormValid])

  useEffect(() => {
    setAddressType(parseAddressType(btcAddress).address)
  }, [btcAddress])

  const accountInfo = () => {
    if (isConnected) {
      switch (selectedProvider) {
        case BTCConnectorType.UNISAT:
          return (
            <TextInputInfo
              label={<Label text={'Bitcoin account'} />}
              value={
                <Account>
                  <AccountType>{addressType}</AccountType>
                  <AccountAmount>{`${btcBalance} sat`}</AccountAmount>
                  <AccountAddress>{btcAddress}</AccountAddress>
                </Account>
              }
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

  const inputLabel = <Label text={'You Supply'} withHelp={true} />
  const warningLabel = (text: string) => <Warning text={text} withHelp={true} />
  const validateBtcInput = (t: string): boolean => {
    const parsedBtc = parseBtc(t)
    const valid = ((parsedBtc) => {
      if (parsedBtc) {
        if (parsedBtc > btcBalance) {
          setAmountWarning(warningLabel('The satoshi equivalent of the number is larger than account balance'))
          return false
        } else if (!isPow2(parsedBtc)) {
          setAmountWarning(warningLabel('The satoshi equivalent of the number is a power of 2'))
          return false
        }
      }
      setAmountWarning(undefined)
      return true
    })(parsedBtc)
    setAmountValid(valid)

    const correction = empty(t) ? '' : formatInput(t)
    if (correction !== undefined) {
      setAmountField(correction)
    }
    return valid
  }

  return (
    <FormPanel>
      <SwapIcon icon={<Swap />} size={1} />
      <Subtitle>Bridge</Subtitle>
      <Supplementary>Supply BTC to send eBTC to your Ethereum wallet</Supplementary>
      {accountInfo()}
      <TextInputWithAction
        label={inputLabel}
        warning={amountWarning}
        value={amountField}
        placeHolder="0.0"
        validate={validateBtcInput}
        inputIcon={<Bitcoin />}
        actions={[
          {
            name: 'POW2',
            onAction: (input) => {
              if (input.current) {
                const parsedBtc = parseBtc(input.current.value)
                if (parsedBtc) {
                  const near = formatBtc(prevPow2(parsedBtc))
                  input.current.value = near
                  validateBtcInput(near)
                }
              }
            },
          },
          {
            name: 'MAX',
            onAction: (input) => {
              if (input.current) {
                const pow2 = formatBtc(prevPow2(btcBalance))
                input.current.value = pow2
                validateBtcInput(pow2)
              }
            },
          },
        ]}
      />
      <TextInput
        label={<Label text={'Recipient address'} />}
        warning={addressWarning}
        value={addressField}
        validate={(t) => {
          const valid = isAddress(t)
          setAddressField(t)
          setAddressValid(valid)
          setAddressWarning(!valid ? warningLabel('Incorrect Ethereum address format') : undefined)
          return valid
        }}
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
          <span>{empty(amountField) ? '0' : amountField} eBTC</span>
        </Supplementary>
        <Supplementary>
          <span>Refund address:</span>
          <span>{isConnected && btcAddress ? btcAddress : 'N/A'}</span>
        </Supplementary>
      </Supplementaries>
    </FormPanel>
  )
}

export const Account = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 1em;
`

export const AccountAddress = styled.div``
export const AccountType = styled.div``
export const AccountAmount = styled.div`
  color: ${({ theme }) => theme.FooterText};
`
