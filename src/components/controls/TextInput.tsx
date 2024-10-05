import styled from 'styled-components'
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { IconProps } from '../icons/_base'
import { RoundedElement } from './Rounded'
import { InputContainer, InputIcon, InputStyle, withLabel } from './common'
import { empty } from '@/utils'

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

const VALIDATION_DELAY = 500

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
  const [onceChecked, setOnceChecked] = useState(false)
  const [text, setText] = useState('')
  const debouncedText = useDebounce(text, VALIDATION_DELAY)
  const debouncedOnceChecked = useDebounce(onceChecked, VALIDATION_DELAY)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    setOnceChecked(true)
  }

  useEffect(() => {
    if (validate && (debouncedOnceChecked || !empty(debouncedText))) {
      setValid(validate(debouncedText))
    } else {
      setValid(true)
    }
  }, [debouncedOnceChecked, debouncedText, validate])

  const input = (
    <InputContainer>
      {inputIcon && <InputIcon>{inputIcon}</InputIcon>}
      <Input placeholder={placeHolder} onChange={onChange} ref={inputRef} />
      {action && action}
    </InputContainer>
  )

  return withLabel({ label, valid, warning, input, className })
}

const Input = styled.input`
  ${InputStyle}
`
