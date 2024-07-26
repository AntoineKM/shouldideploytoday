import { KitchnProvider } from 'kitchn'
import type { AppProps } from 'next/app'

import "kitchn/fonts.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <KitchnProvider>
      <Component {...pageProps} />
    </KitchnProvider>
  )
}
