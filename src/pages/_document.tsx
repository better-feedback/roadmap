import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html data-theme="business">
      <Head>
      <script src="https://kit.fontawesome.com/52e42d35ff.js" crossOrigin="anonymous" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="/js/mobile.js" async></script>

      </body>
    </Html>
  )
}