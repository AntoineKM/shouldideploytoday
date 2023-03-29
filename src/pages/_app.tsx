import { KitchenProvider, themes } from '@tonightpass/kitchen'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <KitchenProvider>
      <Component {...pageProps} />
    </KitchenProvider>
  )
}
