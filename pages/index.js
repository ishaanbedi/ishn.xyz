import { useSession } from "next-auth/react";
import NotLoggedIn from "../components/NotLoggedIn";
import LoggedIn from "../components/LoggedIn";
const Home = () => {
  const { data: session } = useSession();
  while (session === undefined) {
    return <div>Loading...</div>;
  }
  if (session !== null && session !== undefined) {
    return <LoggedIn user={session.user} />;
  }
  return <NotLoggedIn />;
};
export default Home;