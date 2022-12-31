import { useSession } from "next-auth/react";
import NotLoggedIn from "../components/NotLoggedIn";
import LoggedIn from "../components/LoggedIn";
import LoadingHero from "../components/LoadingHero";
import Announcement from "../components/Announcement";
const Home = () => {
  const { status } = useSession();
  return (
    <>
      <Announcement />
      {status === "loading" && <LoadingHero />}
      {status === "unauthenticated" && <NotLoggedIn />}
      {status === "authenticated" && <LoggedIn />}
    </>
  );
};
export default Home;
