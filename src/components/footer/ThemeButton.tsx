import styled from "styled-components"
import { useTheme } from "@/hooks/useTheme"
import { TbMoonFilled, TbSunFilled } from "react-icons/tb"

export default function ThemeButton() {
  const { useLightTheme, toggleTheme } = useTheme()

  return (
    <Container onClick={toggleTheme}>
      {useLightTheme ? <MoonIcon color="gray" size={12} /> : <SunIcon color="gray" size={12} />}
    </Container>
  )
}

const Container = styled.span`
  margin: 2px 0 0 10px;
  cursor: pointer;
`

const SunIcon = styled(TbSunFilled)`
`

const MoonIcon = styled(TbMoonFilled)`
`