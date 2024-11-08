import { css } from 'styled-components'

export const Pulse = css`
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`

export const Riseup = css`
  animation:
    riseup0 350ms cubic-bezier(0.15, 1.15, 0.6, 1),
    riseup1 150ms ease;
  @keyframes riseup0 {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes riseup1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

export const Spin = css`
  animation: spin 1s infinite linear;
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
