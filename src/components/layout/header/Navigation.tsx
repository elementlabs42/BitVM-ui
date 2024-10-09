import { FontWeights } from '@/constants/themes'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { LinkedLogo } from './LinkedLogo'

export function Navigation() {
  return (
    <Container>
      <LinkedLogo href="/" />
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
  display: flex;
  align-items: center;
  justify-content: left;
`

const Menu = styled.div`
  margin-left: 1.5rem;
  display: flex;
  justify-content: center;

  > a,
  > button {
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.NavigationText};
    font-size: 1rem;
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
