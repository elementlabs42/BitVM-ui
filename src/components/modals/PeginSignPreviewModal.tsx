import React from 'react'
import styled from 'styled-components'
import { UsbDrive, Warning as WarningLogo } from '../icons'
import { AlertIcon } from '../icons/Alert'
interface Props {
  isVisible: boolean
  onBack: () => void
  onConfirm: () => void
}

export const PeginSignPreviewModal = ({ isVisible, onBack, onConfirm }: Props) => {
  if (!isVisible) {
    return null
  }
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onBack()
    }
  }
  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <AlertIcon />
        <Header>Next step: signing transactions</Header>
        <SubTitle>
          <p>To proceed with bridging, you will need to sign 3 separate transactions. Please ensure that the amount, address, and transaction displayed on your wallet matches with the parameters shown on the screen.</p>
          <p>Please note that once you start signing, the process is <b>irreversible</b>. To get your deposit back, you must complete the entire bridging process and redeem your eBTC back to BTC.</p>
        </SubTitle>
        <ButtonContainer>
          <BackButton>
            <ButtonText onClick={onBack}>Back</ButtonText>
          </BackButton>
          <NextButton>
            <ButtonText onClick={onConfirm}>Next</ButtonText>
          </NextButton>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  display: flex;
  width: 25rem;
  height: 21.5rem;
  margin: auto;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.75rem; /* Replaced CSS variable with direct value */
  background: #fff; /* Replaced CSS variable with direct value */
  box-shadow:
    0px 20px 24px -4px rgba(16, 24, 40, 0.08),
    0px 8px 8px -4px rgba(16, 24, 40, 0.03); /* Replaced CSS variables with direct values */
  padding: 1.5rem;
`

const Header = styled.div`
  color: ${({ theme }) => theme.TextPrimary900};
  text-align: center;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const SubTitle = styled.div`
  color: ${({ theme }) => theme.TextTertiary};
  text-align: left;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
`

const Logo = styled(UsbDrive)`
  width: 3rem;
  height: 3rem;
`


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  gap: 1rem;
`

const ButtonBase = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 16px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  border: 1px solid;
  cursor: pointer;
`

const BackButton = styled(ButtonBase)`
  background: white;
  border-color: #d0d5dd;
  color: #344054;
`

const NextButton = styled(ButtonBase)`
  background: #0c368e;
  border-color: #0c368e;
  color: white;
`

const ButtonText = styled.div`
  padding: 0 2px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  word-wrap: break-word;
`
