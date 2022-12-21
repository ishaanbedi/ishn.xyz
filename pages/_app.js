function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <link rel="stylesheet" href="https://unpkg.com/mvp.css@1.12/mvp.css" />
    </>
  );
}
export default MyApp;