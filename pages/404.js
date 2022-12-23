import Head from "next/head";
import Link from "next/link";
const Custom404 = () => {
  return (
    <header>
      <main>
        <Head>
          <title>404 - Page Not Found</title>
        </Head>
        <h1>404 - Page Not Found</h1>
        <h4>The page you are looking for does not exist.</h4>
        <p>
          Maybe that slug is available. Try creating a new link{" "}
          <Link
            href={{
              pathname: "/",
            }}
          >
            here
          </Link>
          .
        </p>
      </main>
    </header>
  );
};

export default Custom404;
