import { ReactNode, useEffect, useState } from 'react'
import { Riseup, Spinner, TransactionModal } from './common'
import styled from 'styled-components'
import { RoundedElement } from './Rounded'
import { estimateGas, EthereumTransaction, getEbtcApprovalTransaction } from '@/hooks/ethereum'
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'

interface Props {
  onClosed: (success?: boolean) => void
  tx?: EthereumTransaction
  className?: string
  children?: ReactNode
}

export function EthTransactionModal({ onClosed, tx, className, children }: Props) {
  const [needApproval, setNeedApproval] = useState(false)
  const { callArgs: args, ...ethTx } = tx || {}
  const account = useAccount()
  const { data: txApprovalHash, sendTransaction: sendApproval } = useSendTransaction()
  const { isLoading: isApproving, isSuccess: isApproved } = useWaitForTransactionReceipt({ hash: txApprovalHash })
  const { data: txHash, sendTransaction } = useSendTransaction()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash: txHash })
  const estimate = async () => {
    if (args && account.address && account.chain) {
      try {
        const gas = await estimateGas(account.address, account.chain, args)
        return gas
      } catch (error) {
        if (String(error).includes('ERC20InsufficientAllowance')) {
          setNeedApproval(true)
        } else {
          return 30000n // TODO: determined later
        }
      }
    }
  }

  const send = async () => {
    const gas = await estimate()
    if (gas !== undefined) {
      sendTransaction({ ...ethTx, gas })
    }
  }

  const approve = async () => {
    if (account.chain) {
      const { to, data } = getEbtcApprovalTransaction(account.chain.id)
      sendApproval({ to, data })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      onClosed(true)
    }
  }, [isSuccess, onClosed])

  useEffect(() => {
    if (needApproval && isApproved) {
      setNeedApproval(false)
    }
  }, [isApproved, needApproval])

  return (
    <StyledModal close={onClosed} className={className}>
      <Title>Confirm and Send Transaction</Title>
      {children}
      <Spacer />
      {needApproval && (
        <Button onClick={approve} active={true}>
          {isApproving ? (
            <span>
              <span>APPROVING</span> <Spinner />
            </span>
          ) : (
            <span>APPROVE</span>
          )}
        </Button>
      )}
      <Button onClick={send} active={!!tx && !needApproval}>
        {isLoading ? (
          <span>
            <span>SENDING</span> <Spinner />
          </span>
        ) : (
          <span>SEND</span>
        )}
      </Button>
    </StyledModal>
  )
}

const Spacer = styled.div`
  margin: 1em;
`

const Title = styled.h4`
  margin: 0 0 0.5em 0;
  padding: 0;
`

const StyledModal = styled(TransactionModal)`
  ${Riseup}
`

const Button = styled(RoundedElement)`
  margin: 1em 0;
  width: 100%;
  padding: 1.2em 2em;
`
