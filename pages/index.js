import Link from "next/link";

const Home = () => {
  return (
    <main>
      <h1>
        mvp link shortener. <code>ishn.xyz</code>
      </h1>
      <h3>
        The purpose of this website and domain is to use a link shortener for{" "}
        <Link target="_blank" href="https://www.ishaanbedi.in">
          my own requirements.
        </Link>
        <br /> You can use this tool too to shorten your links using ishn.xyz as
        the domain with a custom slug of your choice.
        <br /> Remember, you don&apos;t need to create an account to use this
        tool, as a result of which, you cannot delete/update links you create.
        <br />
        Just go to <Link href="/create">/create</Link> to get started.
      </h3>
    </main>
  );
};

export default Home;
