import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { AiOutlineCopy, AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
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
    <header>
      <main>
        <Nav />
        <h1>Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {userLinks && userLinks.length > 0 ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Original URL</th>
                      <th>Shortened URL</th>
                      <th>Actions</th>
                      <th>Views</th>
                    </tr>
                  </thead>
                  {userLinks.map((link, index) => (
                    <tr key={index}>
                      <td>
                        <Link target={"_blank"} href={link.url}>
                          {link.url.length > 20
                            ? link.url.substring(0, 30) + "..."
                            : link.url}
                        </Link>
                      </td>
                      <td>
                        <Link
                          target={"_blank"}
                          href={`https://ishn.xyz/${link.slug}`}
                        >
                          ishn.xyz/
                          {link.slug.length > 20
                            ? link.slug.substring(0, 10) + "..."
                            : link.slug}
                        </Link>
                      </td>
                      <td>
                        <h4>
                          {
                            <AiOutlineCopy
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `https://ishn.xyz/${link.slug}`
                                );
                              }}
                            />
                          }{" "}
                          {<AiOutlineDelete />}
                        </h4>
                      </td>
                      <td>53</td>
                    </tr>
                  ))}
                </table>
              </>
            ) : (
              <p>You have no links</p>
            )}
          </>
        )}
      </main>
    </header>
  );
};

export default Dashboard;
