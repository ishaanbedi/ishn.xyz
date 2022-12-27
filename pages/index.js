import { useSession } from "next-auth/react";
import NotLoggedIn from "../components/NotLoggedIn";
import LoggedIn from "../components/LoggedIn";
import LoadingHero from "../components/LoadingHero";
const Home = () => {
  const { status } = useSession();
  return (
    <>
      {status === "loading" && <LoadingHero />}
      {status === "unauthenticated" && <NotLoggedIn />}
      {status === "authenticated" && <LoggedIn />}
    </>
  );
};
export default Home;