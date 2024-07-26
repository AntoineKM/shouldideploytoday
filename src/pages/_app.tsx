import { KitchnProvider } from 'kitchn'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <KitchnProvider>
      <Component {...pageProps} />
    </KitchnProvider>
  )
}
