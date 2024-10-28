import styled from 'styled-components'
import { ReactNode, useEffect, useState } from 'react'
import {
  Label,
  RoundedElement,
  RoundedIcon,
  SelectInput,
  TextInput,
  TextInputInfo,
  TextInputWithAction,
  Warning,
} from '@/components/controls'
import { BackgroundPattern } from '@/components/controls'
import { Bitcoin, Swap } from '@/components/icons'
import { Page, Panel } from '@/components/layout'
import { BTCConnectorType } from '@/constants/connector'
import { useBtcConnector } from '@/providers/BtcConnector'
import { empty, formatAddress, formatBalance, formatBtc, formatInput, isPow2, parseAddressType, parseBtc, prevPow2 } from '@/utils'
import { isAddress } from 'viem'
import { PeginSignPreviewModal } from '@/components/modals/PeginSignPreviewModal'
import { PeginFirstSign } from '@/components/modals/PeginFirstSign'
import { message } from 'antd'
import { useRouter } from 'next/router'

export default function Bridge() {
  const router = useRouter()
  const { isConnected: isBTCConnected, getAccounts: getBTCAccounts, getBalance: getBTCBalance, signPsbt: signBTCPSBT } = useBTCConnector()
  const [accounts, setAccounts] = useState<string[]>([])
  const [balance, setBalance] = useState<string[]>([])

  const [formValid, setFormValid] = useState(false)
  const [amountValid, setAmountValid] = useState(false)
  const [addressValid, setAddressValid] = useState(false)
  const [selectValid, setSelectValid] = useState(false)
  const { selectedProvider, isConnected, btcAddress, btcBalance } = useBtcConnector()
  const [addressType, setAddressType] = useState('')

  const [amountField, setAmountField] = useState('')
  const [amountWarning, setAmountWarning] = useState<ReactNode>()
  const [addressField, setAddressField] = useState('')
  const [addressWarning, setAddressWarning] = useState<ReactNode>()

  const [isSignModalPreview, setIsSignModalPreview] = useState(true)
  const [isFirstSign, setIsFirstSign] = useState(false)


  useEffect(() => {
    if (!isBTCConnected()) {
      message.error('Please connect your BTC wallet first')
    } else if (accounts.length === 0 || balance.length === 0) {
      getBTCAccounts().then((res: any) => {
        if (res && res.length > 0) {
          setAccounts(res || [])
        }
      })
      getBTCBalance().then((res: any) => {
        if (res && res.toString() !== '0') {
          setBalance(res ? [res.toString()] : [])
        }
      })
    }
  }, [isBTCConnected, accounts, balance])

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
          console.log('larger than balance', parsedBtc, btcBalance, t)
          setAmountWarning(warningLabel('The satoshi equivalent of the number is larger than account balance'))
          return false
        } else if (!isPow2(parsedBtc)) {
          console.log('is pow2', parsedBtc, t)
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
                    console.log('maxed', pow2)
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
          <PeginSignPreviewModal
            isVisible={isSignModalPreview}
            onBack={() => {
              setIsSignModalPreview(false)
            }}
            onConfirm={() => {
              setIsSignModalPreview(false)
              setIsFirstSign(true)
            }}
          />
          <PeginFirstSign
            isVisible={isFirstSign}
            amount={formatBalance(balance[0])}
            destination={formatAddress(accounts[0])}
            onBack={() => {
              setIsFirstSign(false)
              setIsSignModalPreview(true)
            }}
            onConfirm={() => {
              signBTCPSBT("70736274ff01005e02000000010ae306c82a878f789780b096421b1ee1c11bf57a3b014925a80e6ff1a32ab78a0000000000ffffffff013800000000000000225120963b0923fd7a825e0333c4bf71c218a86f85504576ddb777f65d9c5a1e4587c000000000000100ea020000000001016e66e2d2e2b3c1dfc86294adf307615d48fc3715905bae26c718c198fe45d0380100000000ffffffff021029000000000000220020a1102d8c68b52d16532fa42737ebae6db487b7abbbe84cccc0328c19345ad91e7a740700000000001600147dd9efafecff9f8675c4a5a3cceef5b816241c3a0247304402201c042daaa0f8a92ef5124996d374b68439e232abf8efcf287a8b93b03bffc3f4022042d9b5163e74916a8d846299b029801f1837b445ec364290140955d8950ad8a4012102edf074e2780407ed6ff9e291b8617ee4b4b8d7623e85b58318666f33a422301b000000000105232102edf074e2780407ed6ff9e291b8617ee4b4b8d7623e85b58318666f33a422301bac0000",
                [
                  {
                    index: 0,
                    address: "tb1q0hv7ltlvl70cvawy5k3uemh4hqtzg8p663sv5d",
                  },
                ]
              )
            }} />
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
        <Buttons>
          <Button onClick={() => {
            router.push('/')
          }}>Back</Button>
          <Button onClick={() => {
          }} active={formValid}>
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
