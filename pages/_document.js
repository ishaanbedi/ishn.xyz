import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html color-mode="user">
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/mvp.css@1.12/mvp.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
