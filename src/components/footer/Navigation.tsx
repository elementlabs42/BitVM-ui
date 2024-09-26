import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import ThemeButton from './ThemeButton'

export function Navigation() {
  return (
    <Container>
      <Menu>
        <Link href="/">Terms</Link>
        <Link href="/">Privacy</Link>
        <Link href="/">Support</Link>
        <ThemeButton />
      </Menu>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 0 0 20px;
  justify-content: right;
`

const Menu = styled.div`
  display: flex;
  justify-content: center;

  > a,
  > button {
    padding: 0 12px;
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.FooterText};
    font-size: 12px;
    text-decoration: none;

    &.active {
      color: ${({ theme }) => theme.Hover};
    }

    &:hover {
      color: ${({ theme }) => theme.Hover};

      &.active {
        color: ${({ theme }) => theme.Hover};
      }
    }
  }
`
