import { useSession } from "next-auth/react";
import NotLoggedIn from "../components/NotLoggedIn";
import LoggedIn from "../components/LoggedIn";
import Head from "next/head";
const Home = () => {
  const { data: session } = useSession();
  while (session === undefined) {
    return (
      <header>
        <main>
          <Head>
            <title>Loading...</title>
          </Head>
          <section>
            <h1>Loading...</h1>
          </section>
        </main>
      </header>
    );
  }
  if (session !== null && session !== undefined) {
    return <LoggedIn user={session.user} />;
  }
  return <NotLoggedIn />;
};
export default Home;
