import { Modal, Riseup, Wallet } from './common'
import { Ledger, Satoshi, Trezor, Unisat } from '../icons/wallets'
import styled from 'styled-components'
import { useBTCConnector } from '@/hooks/useBTCConnector'

interface Props {
  onClosed: () => void
  className?: string
}

export function WalletModalBtc({ onClosed, className }: Props) {
  const { selectUnisat } = useBTCConnector()
  return (
    <StyledModal title="Connect Bitcoin Wallet" close={onClosed} className={className}>
      <Wallet icon={<Ledger />} name={'Ledger'} connect={() => {}} />
      <Wallet icon={<Unisat />} name={'Unisat'} connect={selectUnisat} />
      <Wallet icon={<Trezor />} name={'Trezor'} connect={() => {}} />
      <Wallet icon={<Satoshi />} name={'Satoshi'} connect={() => {}} />
      <Spacer />
    </StyledModal>
  )
}

const Spacer = styled.div`
  margin: 1em;
`

const StyledModal = styled(Modal)`
  ${Riseup}
`
