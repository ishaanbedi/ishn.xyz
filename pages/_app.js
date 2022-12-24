import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import React from "react";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <React.Fragment>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
        <noscript>
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src="https://queue.simpleanalyticscdn.com/noscript.gif"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
      </SessionProvider>
    </React.Fragment>
  );
}
