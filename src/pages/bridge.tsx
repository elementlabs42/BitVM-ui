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
import { PeginFirstSign } from '@/components/modals/PeginFirstSign'
import { PeginSignPreviewModal } from '@/components/modals/PeginSignPreviewModal'
import { useBTCConnector } from '@/hooks/useBTCConnector'
import { closestSmallerPowerOfTwo, empty, formatAddress, formatBalance, getBTCAddressType, isPowerOfTwo } from '@/utils'
import message from 'antd/es/message'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Bridge() {
  const router = useRouter()
  const { isConnected: isBTCConnected, getAccounts: getBTCAccounts, getBalance: getBTCBalance, signPsbt: signBTCPSBT } = useBTCConnector()
  const [accounts, setAccounts] = useState<string[]>([])
  const [balance, setBalance] = useState<string[]>([])

  const [formValid, setFormValid] = useState(false)
  const [amountValid, setAmountValid] = useState(false)
  const [addressValid, setAddressValid] = useState(false)
  const [selectValid, setSelectValid] = useState(false)

  const [isSignModalPreview, setIsSignModalPreview] = useState(true)
  const [isFirstSign, setIsFirstSign] = useState(false)


  useEffect(() => {
    if (!isBTCConnected()) {
      message.error('Please connect your BTC wallet first')
    } else if (accounts.length === 0 || balance.length === 0) {
      getBTCAccounts().then((res) => {
        if (res && res.length > 0) {
          setAccounts(res || [])
        }
      })
      getBTCBalance().then((res) => {
        if (res && res.toString() !== '0') {
          setBalance(res ? [res.toString()] : [])
        }
      })
    }
  }, [isBTCConnected, accounts, balance])

  useEffect(() => {
    setFormValid(amountValid && addressValid && selectValid)
  }, [amountValid, addressValid, selectValid])

  const selectLabel = <Label text={'You Supply'} withHelp={true} />
  const warningLabel = <Warning text={'The satoshi equivalent of the number is a power of 2'} withHelp={true} />
  return (
    <Page>
      <Title>Confirm amount</Title>
      <FormPanelWithButton>
        <BackgroundPatternStyled />
        <FormPanel>
          <SwapIcon icon={<Swap />} size={1} />
          <Subtitle>Bridge</Subtitle>
          <Supplementary>Supply BTC to send eBTC to your Ethereum wallet</Supplementary>
          <SelectInput
            label={<Label text={'Select Bitcoin account to bridge'} withHelp={true} />}
            notifyValidation={setSelectValid}
            placeHolder="Select Bitcoin account"
          >
            {accounts.map((account, index) => (
              <Account key={index}>
                <AccountName>{getBTCAddressType(account)}</AccountName>
                <AccountAmount>{formatBalance(balance[index])} BTC</AccountAmount>
              </Account>
            ))}
          </SelectInput>
          <TextInputWithAction
            label={selectLabel}
            placeHolder="0.0"
            validate={(t) => {
              const result = !empty(t) ? isPowerOfTwo(parseFloat(t)) : false
              setAmountValid(result)
              return result
            }}
            warning={warningLabel}
            inputIcon={<Bitcoin />}
            action="MAX"
            onAction={(input) => {
              input.current && (input.current.value = formatBalance(closestSmallerPowerOfTwo(parseInt(balance[0])).toString()))
            }}
          />
          <TextInput
            label={<Label text={'Recipient address'} />}
            validate={(t) => {
              const result = !empty(t) ? ethers.isAddress(t) : false
              setAddressValid(result)
              return result
            }}
            warning={<Warning text={'Incorrect Ethereum address format'} />}
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
              <span>{formatBalance(balance[0])} eBTC</span>
            </Supplementary>
            <Supplementary>
              <span>Refund address:</span>
              <span>{accounts[0]}</span>
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

const AccountName = styled.div``
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
