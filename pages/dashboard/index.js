import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { AiOutlineCopy, AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import Head from "next/head";
const Dashboard = () => {
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUserLinks = async () => {
    const res = await axios.get("/api/get-content-signed-in", {
      params: {
        email: session.user.email,
      },
    });
    setUserLinks(res.data);
    setLoading(false);
  };
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      getUserLinks();
    }
  }, [session]);
  if (!session) {
    return (
      <header>
        <main>
          <h1>You are not signed in</h1>
          <Link href={"/"}>Home</Link>{" "}
        </main>
      </header>
    );
  }

  return (
    <header>
      <main>
        <Head>
          <title>Dashboard | {process.env.NEXT_PUBLIC_SITE_URL}</title>
        </Head>
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
                      <th>Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userLinks.map((link, index) => (
                      <tr key={index}>
                        <td>
                          <Link
                            target={"_blank"}
                            href={
                              link.url.startsWith("http")
                                ? link.url
                                : `http://${link.url}`
                            }
                          >
                            {link.url.length > 20
                              ? link.url.substring(0, 30) + "..."
                              : link.url}
                          </Link>
                        </td>
                        <td>
                          <Link target={"_blank"} href={`/${link.slug}`}>
                            {process.env.NEXT_PUBLIC_SITE_URL}/
                            {link.slug.length > 20
                              ? link.slug.substring(0, 10) + "..."
                              : link.slug}
                          </Link>
                        </td>
                        <td>
                          <h4>
                            <AiOutlineCopy
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `${process.env.NEXT_PUBLIC_SITE_URL}/${link.slug}`
                                );
                              }}
                            />
                            <AiOutlineDelete
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                axios
                                  .post("/api/delete-record", {
                                    body: {
                                      slug: link.slug,
                                    },
                                  })
                                  .then((e) => {
                                    getUserLinks();
                                  });
                              }}
                            />
                          </h4>
                        </td>
                        <td>{link.views ?? 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <p>You have no links yet.</p>
                <Link href={"/"}>Create one now</Link>
              </>
            )}
          </>
        )}
      </main>
    </header>
  );
};

export default Dashboard;
