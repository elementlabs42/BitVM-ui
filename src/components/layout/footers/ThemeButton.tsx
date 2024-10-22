import styled from 'styled-components'
import { useTheme } from '@/hooks/useTheme'
import { Sun, Moon } from '../../icons'

export default function ThemeButton() {
  const { useLightTheme, toggleTheme } = useTheme()

  return <Container onClick={toggleTheme}>{useLightTheme ? <MoonIcon /> : <SunIcon />}</Container>
}

const Container = styled.span`
  margin: 2px 0 0 10px;
  cursor: pointer;
`

const SunIcon = styled(Sun)`
  height: 12px;
  width: 12px;
  color: ${({ theme }) => theme.FooterText};
`
const MoonIcon = styled(Moon)`
  height: 12px;
  width: 12px;
  color: ${({ theme }) => theme.FooterText};
`
