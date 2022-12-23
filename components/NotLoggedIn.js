import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { signIn } from "next-auth/react";
import Footer from "../components/Footer";
const NotLoggedIn = () => {
  var isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  };
  const createInDB = async () => {
    setLoading(true);
    if (!isValidURL(url)) {
      alert("Please enter a valid URL");
      setLoading(false);
      return;
    }
    const res = await axios.post("/api/new-link-signed-out", {
      url: url,
    });
    if (res.data.success) {
      setUrl("");
      alert(
        `Link created successfully! Your link is https://ishn.xyz/${res.data.record.slug}`
      );
    }
    setLoading(false);
  };
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <section>
        <Head>
          <title>ishn.xyz | Link Shortener</title>
        </Head>
        <main>
          <Nav />
          <h1>
            <code>ishn.xyz</code>
          </h1>
          <h4>
            Generate, customize, track, and share your links. Blazing fast.
          </h4>
          <form onSubmit={(e) => e.preventDefault()}>
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
            <button disabled={loading} type="button" onClick={createInDB}>
              {loading ? "Loading" : "Shorten"}
            </button>
          </form>
          <h5>
            <a style={{ cursor: "pointer" }} onClick={() => signIn()}>
              Login
            </a>{" "}
            to get more features like links with custom slugs, dashboard with
            analytics, and more, for free!
          </h5>
        </main>
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};
export default NotLoggedIn;