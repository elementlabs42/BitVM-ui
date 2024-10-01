import styled from 'styled-components'
import { Borders } from '@/constants/themes'
import { ReactNode, useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

interface Props {
  label: ReactNode
  validate?: (content: string) => boolean
  warning?: ReactNode
  placeHolder?: string
  className?: string
}

export function TextInput({ placeHolder = '', label, validate, warning, className }: Props) {
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
      <Input placeholder={placeHolder} onChange={onChange} />
      {warning && !valid && <Wrapper>{warning}</Wrapper>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.3em;
  background-color: ${({ theme }) => theme.Background};
  border-radius: ${Borders.PanelRadius};
`

const Input = styled.input`
  font-size: 1.2em;
  padding: 0.5em;
  border: 1px solid ${({ theme }) => theme.FooterText};
  border-radius: ${Borders.ButtonRadius};
  color: ${({ theme }) => theme.Text};
  background-color: ${({ theme }) => theme.Background};
`

const Wrapper = styled.div``
