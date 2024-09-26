import { FontWeights } from '@/constants/themes'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Logo } from './Logo'
import { useTheme } from '@/hooks/useTheme'

export function Navigation() {
  const { theme } = useTheme()
  return (
    <Container>
      <Logo textColor={theme.Text} />
      <Menu>
        <Link href="/bridge">Bridge</Link>
        <Link href="/history">History</Link>
        <Link href="/">Operator</Link>
        <Link href="/">Docs</Link>
      </Menu>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 20px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: left;
`

const Menu = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: center;

  > a,
  > button {
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.Text};
    font-size: 16px;
    font-weight: ${FontWeights.Semibold};
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
