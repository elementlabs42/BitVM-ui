import styled from 'styled-components'
import { Borders } from '@/constants/themes'
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { IconProps } from '../icons/_base'
import { RoundedElement } from './Rounded'

interface Props {
  label: ReactNode
  validate?: (content: string) => boolean
  warning?: ReactNode
  placeHolder?: string
  inputIcon?: ReactElement<IconProps>
  action?: ReactNode
  className?: string
  inputRef?: React.RefObject<HTMLInputElement>
}

interface ActionProps extends Omit<Props, 'action'> {
  action: string
  onAction?: (ref: React.RefObject<HTMLInputElement>) => void
}

export function TextInputWithAction({
  label,
  validate,
  warning,
  placeHolder = '',
  inputIcon,
  action,
  onAction,
  className,
}: ActionProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const onClick = () => {
    if (inputRef.current && onAction) {
      onAction(inputRef)
    }
  }
  const actionNode = (
    <InputAction>
      <InputButton onClick={onAction && onClick}>{action}</InputButton>
    </InputAction>
  )
  return (
    <TextInput
      label={label}
      validate={validate}
      warning={warning}
      placeHolder={placeHolder}
      inputIcon={inputIcon}
      action={actionNode}
      className={className}
      inputRef={inputRef}
    />
  )
}

const InputAction = styled.div`
  margin-left: auto;
`

const InputButton = styled(RoundedElement)`
  margin-right: 1em;
  font-size: 0.6em;
  padding: 1em 1.6em;
  background-color: ${({ theme }) => theme.HoverArea};
`

export function TextInput({
  label,
  validate,
  warning,
  placeHolder = '',
  inputIcon,
  action,
  className,
  inputRef,
}: Props) {
  const [valid, setValid] = useState(true)
  const [text, setText] = useState('')
  const debouncedText = useDebounce(text, 500)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  useEffect(() => {
    if (validate && debouncedText !== '') {
      setValid(validate(debouncedText))
    } else {
      setValid(true)
    }
  }, [debouncedText, validate])

  return (
    <Container className={className}>
      <Wrapper>{label}</Wrapper>
      <InputContainer>
        {inputIcon && <InputIcon>{inputIcon}</InputIcon>}
        <Input placeholder={placeHolder} onChange={onChange} ref={inputRef} />
        {action && action}
      </InputContainer>
      {warning && !valid && <Wrapper>{warning}</Wrapper>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.3em;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.FooterText};
  border-radius: ${Borders.ButtonRadius};
`

const InputIcon = styled.div`
  margin-left: 0.5em;
  display: flex;
  align-content: center;
`

const Input = styled.input`
  flex-grow: 1;
  font-size: 1.2em;
  padding: 0.5em;
  border: 0;
  &:focus-visible {
    outline: 0;
  }
  color: ${({ theme }) => theme.Text};
  background-color: ${({ theme }) => theme.Background};
`

const Wrapper = styled.div``
