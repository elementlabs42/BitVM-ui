import styled from 'styled-components'
import { ReactElement, ReactNode, useRef } from 'react'
import { IconProps } from '../icons/_base'
import { RoundedElement } from './Rounded'
import { InputBoxStyle, InputContainer, InputIcon, InputStyle, withLabel } from './common'

interface Props {
  label: ReactNode
  validate?: (content: string) => boolean
  warning?: ReactNode
  value?: string
  disabled?: boolean
  placeHolder?: string
  inputIcon?: ReactElement<IconProps>
  action?: ReactNode
  className?: string
  inputRef?: React.RefObject<HTMLInputElement>
}

interface InfoProps extends Omit<Props, 'value'> {
  value: ReactElement
}

type Action = {
  name: string
  onAction: (ref: React.RefObject<HTMLInputElement>) => void
}
interface ActionProps extends Omit<Props, 'action'> {
  actions: Action[]
}

export function TextInputInfo({ label, warning, value, className }: InfoProps) {
  const input = (
    <InputContainer className={className}>
      <InputBox>{value}</InputBox>
    </InputContainer>
  )
  return withLabel({ label, warning, input, className })
}

export function TextInputWithAction({
  label,
  validate,
  warning,
  value,
  disabled,
  placeHolder = '',
  inputIcon,
  actions,
  className,
}: ActionProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const actionNode = (
    <InputAction>
      {actions.map(({ name: actionName, onAction }, i) => (
        <InputButton key={i} onClick={() => inputRef.current && onAction && onAction(inputRef)}>
          {actionName}
        </InputButton>
      ))}
    </InputAction>
  )
  return (
    <TextInput
      label={label}
      validate={validate}
      warning={warning}
      value={value}
      disabled={disabled}
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
  display: flex;
  flex-direction: row;
  align-items: center;
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
  value,
  disabled,
  placeHolder = '',
  inputIcon,
  action,
  className,
  inputRef,
}: Props) {
  const input = (
    <InputContainer className={className}>
      {inputIcon && <InputIcon>{inputIcon}</InputIcon>}
      <Input
        placeholder={placeHolder}
        onChange={(e) => validate && validate(e.target.value)}
        ref={inputRef}
        disabled={disabled}
        value={value}
      />
      {action && action}
    </InputContainer>
  )

  return withLabel({ label, warning, input, className })
}

const InputBox = styled.div`
  ${InputBoxStyle}
`

const Input = styled.input`
  ${InputStyle}
`
