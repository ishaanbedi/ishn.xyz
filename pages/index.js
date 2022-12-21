import Head from "next/head";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <section>
        <Head>
          <title>ishn.xyz | Link Shortener</title>
        </Head>
        <main>
          <h1>
            <code>ishn.xyz</code>
            <br />
            minimal link shortener.
          </h1>
          <h4>
            ishn.xyz is a link shortener service that&apos;s easy,
            straight-forward and free to use.
            <br />
            <Link href="/create">Create a new link</Link>
          </h4>
          <details>
            <summary>About & Contact Information</summary>
            <ul>
              <li>
                Created by{" "}
                <Link
                  target={"_blank"}
                  href="https://www.github.com/ishaanbedi"
                >
                  @ishaanbedi
                </Link>
              </li>
              <li>
                Open sourced on{" "}
                <Link target={"_blank"} href="https://www.ishn.xyz/github">
                  GitHub
                </Link>
              </li>
              <li>
                You don&apos;t need to create an account to use this tool.
              </li>
              <li>Spam, scam, offensive and phishing links will be removed.</li>
              <li>You cannot delete/update links you create. Be careful.</li>
              <li>
                For removal requests, please contact me on{" "}
                <a
                  rel="noreferrer"
                  href="mailto:hi@ishaanbedi.in"
                  target="_blank"
                >
                  hi@ishaanbedi.in
                </a>
              </li>
            </ul>
          </details>
        </main>
      </section>
    </>
  );
};

export default Home;