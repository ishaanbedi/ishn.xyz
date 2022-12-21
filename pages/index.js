import Link from "next/link";

const Home = () => {
  return (
    <main>
      <h1>
        mvp link shortener. <code>ishn.xyz</code>
      </h1>
      <h3>
        ishn.xyz is a minimal link shortener service that&apos;s easy and free
        to use.
        <br /> Remember, you don&apos;t need to create an account to use this
        tool, as a result of which, you cannot delete/update links you create.
        <br />
        Just go to <Link href="/create">/create</Link> to get started.
      </h3>
    </main>
  );
};

export default Home;
