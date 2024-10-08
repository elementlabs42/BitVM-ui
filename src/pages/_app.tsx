import { Providers } from '@/providers/Providers'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </Providers>
  )
}
