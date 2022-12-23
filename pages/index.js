import { useSession } from "next-auth/react";
import NotLoggedIn from "../components/NotLoggedIn";
import LoggedIn from "../components/LoggedIn";
const Home = () => {
  const { data: session } = useSession();
  while (session === undefined) {
    return (
      <header>
        <main>
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
