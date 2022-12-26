import { useSession } from "next-auth/react";
import NotLoggedIn from "../components/NotLoggedIn";
import LoggedIn from "../components/LoggedIn";
import Head from "next/head";
const Home = () => {
  const { data: session } = useSession();

  if (session !== null && session !== undefined) {
    return <LoggedIn user={session.user} />;
  }
  return <NotLoggedIn />;
};
export default Home;
