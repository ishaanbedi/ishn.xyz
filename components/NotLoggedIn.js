import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { signIn } from "next-auth/react";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
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
      notifyForInvalidURL();
      setLoading(false);
      return;
    }
    const res = await axios.post("/api/new-link-signed-out", {
      url: url,
    });
    if (res.data.success) {
      document.getElementById("myModal").showModal();
      setSlug(res.data.slug);
    }
    setLoading(false);
  };
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");
  const notifyForInvalidURL = () =>
    toast.warn("Please enter a valid URL.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const updateCopyButtonText = () => {
    const copyButton = document.querySelector(".copy-button");
    copyButton.innerHTML = "Copied!";
    copyButton.disabled = true;
    setTimeout(() => {
      copyButton.innerHTML = `Copy Link`;
      copyButton.disabled = false;
    }, 2000);
  };
  return (
    <>
      <section>
        <Head>
          <title>ishn.xyz | Link Shortener</title>
        </Head>
        <main>
          <dialog className="modal" id="myModal">
            <center>
              <h1>Link created successfully!</h1>
              <h4>
                <br /> Accessible at{" "}
                <Link target={"_blank"} href={`https://ishn.xyz/${slug}`}>
                  ishn.xyz/{slug}
                </Link>
              </h4>
              <center>
                <button
                  onClick={() => {
                    setUrl("");
                    document.getElementById("myModal").close();
                  }}
                >
                  Create More
                </button>
                <span
                  style={{
                    display: "inline-block",
                    width: "1rem",
                  }}
                ></span>
                <button
                  className="copy-button"
                  onClick={() => {
                    updateCopyButtonText();
                    navigator.clipboard.writeText(`https://ishn.xyz/${slug}`);
                  }}
                >
                  Copy link
                </button>
              </center>
            </center>
          </dialog>
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
            <br />
            <Link href="/dashboard/report">Disclaimer</Link>
          </h5>
        </main>
      </section>
      <section>
        <Footer />
      </section>
      <ToastContainer />
    </>
  );
};
export default NotLoggedIn;
