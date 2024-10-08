import React from 'react'
import styled from 'styled-components'
import { Logo } from '../../icons/Logo'
import { useRouter } from 'next/router'

interface Props {
  href: string
  className?: string
}

export function LinkedLogo({ href, className }: Props) {
  const router = useRouter()

  return (
    <Router className={className} onClick={() => router.push(href)}>
      <Logo />
    </Router>
  )
}

const Router = styled.div`
  font-size: 0;
  cursor: pointer;
`
