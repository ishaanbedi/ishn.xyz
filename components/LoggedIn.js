import Head from "next/head";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
const LoggedIn = ({ user }) => {
  const createInDB = async () => {
    setLoading(true);
    const res = await axios.post("/api/new-link-signed-in", {
      email: user.email,
      url: url,
      slug: slug,
    });
    if (res.data.success) {
      setUrl("");
      setSlug("");
      alert("Link created successfully!");
    }
    setLoading(false);
  };
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <section>
      <Head>
        <title>ishn.xyz | Link Shortener</title>
      </Head>
      <main>
        <Nav user={user} />
        <h1>
          <code>ishn.xyz</code>
        </h1>
        <h4>Generate, customize, track, and share your links. Blazing fast.</h4>
        <form>
          <label htmlFor="url">Enter the URL you want to shorten</label>
          <input
            placeholder="Eg. https://ishaanbedi.in"
            onKeyPress={(e) => {
              if (e.key === " ") {
                e.preventDefault();
              }
            }}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <label htmlFor="slug">A custom slug for your link</label>
          <input
            placeholder="Eg. ib_web"
            onKeyPress={(e) => {
              if (e.key === " ") {
                e.preventDefault();
              }
            }}
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <button disabled={loading} type="button" onClick={createInDB}>
            {loading ? "Loading" : "Shorten"}
          </button>
        </form>
      </main>
    </section>
  );
};

export default LoggedIn;
