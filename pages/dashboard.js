import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
const Dashboard = () => {
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUserLinks = async () => {
    const res = await axios.get("/api/get-content-signed-in", {
      params: {
        email: session.user.email,
      },
    });
    var temp = res.data;
    temp = temp.replace(/'/g, '"');
    temp = JSON.parse(temp);
    setUserLinks(temp);
    setLoading(false);
  };
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      getUserLinks();
    }
  }, [session]);
  return (
    <main>
      <Nav  />
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userLinks && userLinks.length > 0 ? (
            <>
              <p>Here are your links:</p>
              <ul>
                {userLinks.map((link) => (
                  <li key={link.slug}>
                    {link.slug} - {link.url}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>You have no links</p>
          )}
        </>
      )}
    </main>
  );
};

export default Dashboard;
