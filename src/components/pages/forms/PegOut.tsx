import styled from 'styled-components'
import { ReactNode, useEffect, useState } from 'react'
import { Label, SelectInput, TextInput, TextInputInfo, Warning } from '@/components/controls'
import { Swap } from '@/components/icons'
import { BTCAddressType, empty, formatBtc, parseAddressType } from '@/utils'
import { FormPanel, Subtitle, Supplementaries, Supplementary, SwapIcon } from './styles'
import { useBitvmUnusedPegInGraphs } from '@/hooks/useBitvm'
import { useAccount } from 'wagmi'
import { useBalanceOf } from '@/hooks/ethereum'
import { EBTC_ADDRESSES } from '@/constants/addresses'

interface Props {
  setFormValid: (valid: boolean) => void
}

export function PegOut({ setFormValid }: Props) {
  const [refresh] = useState(0)
  const { response } = useBitvmUnusedPegInGraphs(refresh)
  const account = useAccount()
  const eBtcAddress = EBTC_ADDRESSES[account.chainId ?? 0]
  const [eBtcBalance] = useBalanceOf(eBtcAddress)

  const [amountValid, setAmountValid] = useState(false)
  const [addressValid, setAddressValid] = useState(false)
  const [selectValid, setSelectValid] = useState(false)

  const [amountField, setAmountField] = useState('0.0')
  const [amountWarning, setAmountWarning] = useState<ReactNode>()
  const [addressField, setAddressField] = useState('')
  const [addressWarning, setAddressWarning] = useState<ReactNode>()
  const [selectedKey, setSelectedKey] = useState<string>()
  const [received, setReceived] = useState<bigint>(0n)

  useEffect(() => {
    const valid = amountValid && addressValid && !!account.address && selectValid
    setFormValid(valid)
  }, [amountValid, addressValid, selectValid, account.address, setFormValid])

  const warningLabel = (text: string) => <Warning text={text} withHelp={true} />
  useEffect(() => {
    if (response && selectedKey) {
      const index = parseInt(selectedKey)
      const graph = response[index]
      setAmountField(formatBtc(graph.amount))
      setReceived((BigInt(graph.amount) * 99n) / 100n)
      if (graph.amount > eBtcBalance) {
        setAmountWarning(warningLabel('The amount is larger than account balance'))
        setAmountValid(false)
      } else {
        setAmountWarning(undefined)
        setAmountValid(true)
      }
    }
  }, [selectedKey, response, eBtcBalance, setAmountField, setAmountWarning])

  return (
    <FormPanel>
      <SwapIcon icon={<Swap />} size={1} />
      <Subtitle>Redeem</Subtitle>
      <Supplementary>Supply eBTC to send BTC to your Bitcoin wallet</Supplementary>
      <SelectInput
        label={<Label text={'Select Peg-in graph'} withHelp={true} />}
        validate={setSelectValid}
        select={setSelectedKey}
        placeHolder={response ? 'Select Peg-in Graph' : 'Loading ...'}
      >
        {response &&
          response.map((graph, i) => (
            <Graph key={i}>
              <GraphAmount>{formatBtc(graph.amount)} BTC</GraphAmount>
              <GraphId>{graph.graphId}</GraphId>
            </Graph>
          ))}
      </SelectInput>
      {account.address ? (
        <TextInputInfo
          label={<Label text={'You Supply'} withHelp={true} />}
          value={<>{amountField}</>}
          warning={amountWarning}
        />
      ) : (
        <Warning text={'Please connect a Ethereum wallet'} />
      )}
      <TextInput
        label={<Label text={'Recipient address'} />}
        warning={addressWarning}
        value={addressField}
        validate={(t) => {
          const valid = parseAddressType(t).address !== BTCAddressType.UNKNOWN
          setAddressField(t)
          setAddressValid(valid)
          setAddressWarning(!valid ? warningLabel('Incorrect Bitcoin address format') : undefined)
          return valid
        }}
      />
      <Supplementaries>
        <Supplementary>
          <span>Handling fee:</span>
          <span>1%</span>
        </Supplementary>
        <Supplementary>
          <span>You receive:</span>
          <span>{empty(amountField) ? '0' : formatBtc(received)} eBTC</span>
        </Supplementary>
      </Supplementaries>
    </FormPanel>
  )
}

const Graph = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 1em;
`

const GraphAmount = styled.div``
const GraphId = styled.div`
  color: ${({ theme }) => theme.FooterText};
`
