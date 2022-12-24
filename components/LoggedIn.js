import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { signIn } from "next-auth/react";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
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
  var urlPlaceholderExamples = [
    {
      url: "https://amazingwebsite.com/this-is-a-great-website",
      slug: "grt_ws",
    },
    { url: "https://amazingvideo.com/this-is-a-great-video", slug: "video" },
    { url: "https://amazingblog.com/this-is-a-great-blog", slug: "blog" },
  ];
  const createInDB = async () => {
    setLoading(true);
    setLoading(true);
    if (!isValidURL(url)) {
      notifyForInvalidURL();
      setLoading(false);
      return;
    }
    if (slug.length > 0 && !isValidSlug(slug)) {
      notifyForInvalidSlug();
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post("/api/new-link-signed-in", {
        email: user.email,
        url: url,
        slug: slug,
      });
      if (res.data.success) {
        document.getElementById("myModal").showModal();
        setSlug(res.data.slug);
      }
    } catch (e) {
      alert(e.response.data.error);
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
  const notifyForInvalidSlug = () =>
    toast.warn("Please enter a valid slug.", {
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
  const [urlPlaceholder, setUrlPlaceholder] = useState(
    Math.floor(Math.random() * urlPlaceholderExamples.length)
  );
  var allowedInSlug =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
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
                    setSlug("");
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
              placeholder={urlPlaceholderExamples[urlPlaceholder].url}
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
              placeholder={urlPlaceholderExamples[urlPlaceholder].slug}
              onKeyPress={(e) => {
                if (!allowedInSlug.includes(e.key)) {
                  e.preventDefault();
                }
              }}
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
              }}
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
      <ToastContainer />
    </>
  );
};

export default LoggedIn;
