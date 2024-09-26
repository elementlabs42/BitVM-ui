import styled from "styled-components"
import { useTheme } from "@/hooks/useTheme"
import { TbMoonFilled, TbSunFilled } from "react-icons/tb"

export default function ThemeButton() {
  const { useLightTheme, toggleTheme } = useTheme()

  return (
    <Container onClick={toggleTheme}>
      {useLightTheme ? <MoonIcon color="black" /> : <SunIcon color="gray" />}
    </Container>
  )
}

const Container = styled.div`
  height: 20px;
  width: 20px;
  font-size: 12px;
`

const SunIcon = styled(TbSunFilled)`
`

const MoonIcon = styled(TbMoonFilled)`
`