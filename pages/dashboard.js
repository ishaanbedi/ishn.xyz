import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { AiFillEye as Eye } from "react-icons/ai";
import { AiOutlineLoading as Loading } from "react-icons/ai";
import Link from "next/link";
import Head from "next/head";
const Dashboard = () => {
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotStats, setHotStats] = useState({
    url: "",
    slug: "",
    views: 0,
  });
  const [deleteButton, setDeleteButton] = useState(false);
  const getUserLinks = async () => {
    setDeleteButton(false);
    const res = await axios.get("/api/get-content-signed-in", {
      params: {
        email: session.user.email,
      },
    });
    setUserLinks(res.data);
    setLoading(false);
  };
  const showStatsModal = (link) => {
    setHotStats(link);
    var label = document.createElement("label");
    label.htmlFor = "my-modal-6";
    document.body.appendChild(label);
    label.classList.add("hidden");
    label.click();
    document.body.removeChild(label);
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
        <main className="flex flex-col h-screen justify-center items-center">
          <h1 className="text-3xl text-center py-2 font-bold tracking-tight  sm:text-4xl">
            You are not signed in
          </h1>
          <Link href={"/"}>
            <button className="btn btn-ghost">Go Home</button>
          </Link>{" "}
        </main>
      </header>
    );
  }

  return (
    <header>
      <main>
        <Head>
          <title>Dashboard</title>
        </Head>
        <Nav />
        <h1 className="text-3xl text-center py-2 font-bold tracking-tight  sm:text-4xl">
          Dashboard
        </h1>

        {loading ? (
          <p className="text-2xl flex flex-row space-x-3 justify-center items-center">
            Loading
            <Loading className="animate-spin ml-3" />
          </p>
        ) : (
          <>
            {userLinks && userLinks.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <p className="py-2 text-center lg:md:sm:hidden text-sm text-gray-500">
                    (Drag across the table to see more)
                  </p>

                  <table className=" px-3 table table-zebra w-full">
                    <thead>
                      <tr className="text-center">
                        <th></th>
                        <th>ORIGINAL URL</th>
                        <th>SHORTENED URL</th>
                        <th>STATS</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {userLinks.map((link, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
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
                              ishn.xyz/
                              {link.slug.length > 20
                                ? link.slug.substring(0, 10) + "..."
                                : link.slug}
                            </Link>
                          </td>
                          <td className="flex justify-center items-center">
                            <Eye
                              onClick={() => {
                                showStatsModal(link);
                              }}
                              className="text-2xl cursor-pointer"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />

      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Stats for ishn.xyz/{hotStats.slug}
          </h3>
          <h5>
            This link redirects to{" "}
            <Link className="font-bold" target={"_blank"} href={hotStats.url}>
              {hotStats.url.startsWith("http") ? "" : "http://"}
              {hotStats.url.length > 20
                ? hotStats.url.substring(0, 30) + "..."
                : hotStats.url}
            </Link>
          </h5>
          <p className="py-4">
            Clicks on the link:{" "}
            <span className="font-bold">{hotStats.views}</span>
          </p>
          <div>
            <button
              onClick={() => {
                setDeleteButton(!deleteButton);
                axios
                  .post("/api/delete-record", {
                    body: {
                      slug: hotStats.slug,
                      email: session.user.email,
                    },
                  })
                  .then((e) => {
                    getUserLinks();
                    var close = document.getElementById("close-modal");
                    close.click();
                    setHotStats({
                      url: "",
                      slug: "",
                      views: 0,
                    });
                  });
              }}
              className="btn btn-warning"
            >
              {!deleteButton ? (
                "Delete This Link"
              ) : (
                <>
                  <Loading className="animate-spin mr-3" /> Deleting...
                </>
              )}
            </button>
          </div>
          <p className="py-3">
            We are constantly working on adding more tools to help you track
            your links.
            <br />
            Stay tuned!
          </p>
          <div className="modal-action">
            <label
              id="close-modal"
              onClick={() => {
                setHotStats({
                  url: "",
                  slug: "",
                  views: 0,
                });
              }}
              htmlFor="my-modal-6"
              className="btn"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Dashboard;
