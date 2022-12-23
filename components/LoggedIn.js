import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";
const LoggedIn = ({ user }) => {
  var isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  };
  var isValidSlug = (str) => {
    if (str.length > 20) {
      return false;
    }
    for (var i = 0; i < str.length; i++) {
      if (!allowedInSlug.includes(str[i])) {
        return false;
      }
    }
    return true;
  };
  const createInDB = async () => {
    setLoading(true);
    setLoading(true);
    if (!isValidURL(url)) {
      alert("Please enter a valid URL");
      setLoading(false);
      return;
    }
    if (slug.length > 0 && !isValidSlug(slug)) {
      alert(
        "Please enter a valid slug. Slugs can only contain letters, numbers, dashes, and underscores and must be less than 20 characters long."
      );
      setLoading(false);
      return;
    }

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
  var allowedInSlug =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
  return (
    <>
      <section>
        <Head>
          <title>ishn.xyz | Link Shortener</title>
        </Head>
        <main>
          <Nav user={user} />
          <h1>
            <code>ishn.xyz</code>
          </h1>
          <h4>
            Generate, customize, track, and share your links. Blazing fast.
          </h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="url">Enter the URL you want to shorten</label>
            <input
              placeholder="https://amazingwebsite.com/very-long-url.html"
              onKeyPress={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <label htmlFor="slug">A custom slug for your link (optional)</label>
            <input
              placeholder="amweb"
              onKeyPress={(e) => {
                if (!allowedInSlug.includes(e.key)) {
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
      <section>
        <Footer />
      </section>
    </>
  );
};

export default LoggedIn;
