import styled from 'styled-components'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { Label, SelectInput, TextInput, TextInputInfo, Warning } from '@/components/controls'
import { Swap } from '@/components/icons'
import { BTCAddressType, empty, formatBtc, parseAddressType } from '@/utils'
import { FormPanel, Subtitle, Supplementaries, Supplementary, SwapIcon } from './styles'
import { useBitvmUnusedPegInGraphs } from '@/hooks/useBitvm'
import { useAccount } from 'wagmi'
import { useEBtcBalanceOf, EthereumTransaction, getPegOutTransaction } from '@/hooks/ethereum'
import { EthTransactionModal } from '@/components/controls/EthTransactionModal'
import { useRouter } from 'next/router'

interface Props {
  onFormValidate: (valid: boolean) => void
  setSubmit?: Dispatch<SetStateAction<((valid?: boolean) => void) | undefined>>
  // setSubmitting?: (submitting: boolean) => void
}

const OPERATOR_PUBLIC_KEYS = [
  {
    name: 'Operator A',
    publickKey: '03484db4a2950d63da8455a1b705b39715e4075dd33511d0c7e3ce308c93449deb',
  },
]

export function PegOut({ onFormValidate, setSubmit }: Props) {
  const router = useRouter()
  const [refresh] = useState(0)
  const { response, error } = useBitvmUnusedPegInGraphs(refresh)
  const account = useAccount()
  const [eBtcBalance] = useEBtcBalanceOf(account)
  const [pegOut, setPegOut] = useState<EthereumTransaction>()

  const [isModalOpen, setModalOpen] = useState(false)
  const [amountValid, setAmountValid] = useState(false)
  const [addressValid, setAddressValid] = useState(false)
  const [graphValid, setGraphValid] = useState(false)
  const [operatorValid, setOperatorValid] = useState(false)
  const [formValid, setFormValid] = useState(false)

  const [amountField, setAmountField] = useState('0.0')
  const [amountWarning, setAmountWarning] = useState<ReactNode>()
  const [addressField, setAddressField] = useState('')
  const [addressWarning, setAddressWarning] = useState<ReactNode>()
  const [selectedGraph, setSelectedGraph] = useState<string>()
  const [selectedOperator, setSelectedOperator] = useState<string>()
  const [received, setReceived] = useState<bigint>(0n)

  useEffect(() => {
    const valid = amountValid && addressValid && !!account.address && graphValid && operatorValid
    onFormValidate(valid)
    setFormValid(valid)
  }, [amountValid, addressValid, graphValid, account.address, operatorValid, onFormValidate])

  const warningLabel = (text: string) => <Warning text={text} withHelp={true} />
  useEffect(() => {
    if (response && selectedGraph) {
      const index = parseInt(selectedGraph)
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
  }, [selectedGraph, response, eBtcBalance, setAmountField, setAmountWarning])

  useEffect(() => {
    if (setSubmit && selectedOperator && response && selectedGraph && account.chainId) {
      const index = parseInt(selectedGraph)
      const graph = response[index]
      const chainId = account.chainId

      setSubmit(() => async () => {
        const operatorIndex = parseInt(selectedOperator)
        const operator = OPERATOR_PUBLIC_KEYS[operatorIndex]
        if (formValid) {
          const tx = getPegOutTransaction(chainId, {
            functionName: 'pegOut',
            args: [],
            destinationBitcoinAddress: addressField,
            amount: graph.amount,
            outpoint: { txid: graph.sourceOutpoint.txid, vout: graph.sourceOutpoint.vout },
            operatorPublicKey: operator.publickKey,
          })
          setPegOut(tx)
          setModalOpen(true)
        }
      })
    }
  }, [formValid, account.chainId, selectedGraph, selectedOperator, addressField, response, setSubmit, setModalOpen])

  const onModalClose = (success?: boolean) => {
    setModalOpen(false)
    if (success === true) {
      router.push('/history')
    }
  }

  return (
    <FormPanel>
      <SwapIcon icon={<Swap />} size={1} />
      <Subtitle>Redeem</Subtitle>
      <Supplementary>Supply eBTC to send BTC to your Bitcoin wallet</Supplementary>
      <SelectInput
        label={<Label text={'Select Peg-in graph'} withHelp={true} />}
        validate={setGraphValid}
        select={setSelectedGraph}
        placeHolder={response ? 'Select Peg-in Graph' : error ? error : 'Loading ...'}
      >
        {response &&
          response.map((graph, i) => (
            <Graph key={i}>
              <GraphAmount>{formatBtc(graph.amount)} BTC</GraphAmount>
              <GraphId>{graph.graphId}</GraphId>
            </Graph>
          ))}
      </SelectInput>
      <SelectInput
        label={<Label text={'Select Operator'} withHelp={true} />}
        validate={setOperatorValid}
        select={setSelectedOperator}
        placeHolder={'Select Operator'}
      >
        {OPERATOR_PUBLIC_KEYS.map((operator, i) => (
          <Operator key={i}>{operator.name}</Operator>
        ))}
      </SelectInput>
      {account.address ? (
        <TextInputInfo
          label={<Label text={'You Supply'} withHelp={true} />}
          value={<>{amountField}</>}
          warning={amountWarning}
        />
      ) : (
        <Warning text={'Please connect an Ethereum wallet'} />
      )}
      <TextInput
        label={<Label text={'Recipient bitcoin address'} />}
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
          <span>{empty(amountField) ? '0' : formatBtc(received)} BTC</span>
        </Supplementary>
      </Supplementaries>
      {isModalOpen && <EthTransactionModal tx={pegOut} onClosed={onModalClose} />}
    </FormPanel>
  )
}

const Operator = styled.div``

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
