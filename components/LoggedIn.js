import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "../components/Footer";
import { AiOutlineLoading, AiOutlineLink } from "react-icons/ai";
import { FaCopy, FaDownload } from "react-icons/fa";
import { IoBarcodeOutline } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import Link from "next/link";
import { useSession } from "next-auth/react";
const LoggedIn = () => {
  var { data: session } = useSession();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");

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
    if (url === "") {
      setLoading(false);
      document.getElementById("url-input").classList.add("border-warning");
      document.querySelector(".btn-primary").innerHTML = "Please enter a URL";
      document.querySelector(".btn-primary").classList.add("btn-warning");
      setTimeout(() => {
        document.getElementById("url-input").classList.remove("border-warning");
        document.querySelector(".btn-primary").innerHTML = "Shorten";
        document.querySelector(".btn-primary").classList.remove("btn-warning");
      }, 2000);
      return;
    }
    if (!isValidURL(url)) {
      var button = document.querySelector(".btn-primary");
      button.innerHTML = "Please enter a valid URL";
      document.getElementById("url-input").classList.add("border-warning");
      button.classList.add("btn-warning");
      setTimeout(() => {
        button.innerHTML = "Shorten";
        document.getElementById("url-input").classList.remove("border-warning");
        button.classList.remove("btn-warning");
      }, 2000);
      setLoading(false);
      return;
    }
    if (slug !== "") {
      var allowedChars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_`;
      for (var i = 0; i < slug.length; i++) {
        if (!allowedChars.includes(slug[i])) {
          var button = document.querySelector(".btn-primary");
          button.innerHTML = "Invalid characters in slug";
          document.getElementById("slug-input").classList.add("border-warning");
          button.classList.add("btn-warning");
          setTimeout(() => {
            button.innerHTML = "Shorten";
            button.classList.remove("btn-warning");
            document
              .getElementById("slug-input")
              .classList.remove("border-warning");
          }, 2000);
          setLoading(false);
          return;
        }
      }
      if (slug.length < 4) {
        var button = document.querySelector(".btn-primary");
        button.innerHTML = "Slug must be at least 4 characters";
        document.getElementById("slug-input").classList.add("border-warning");
        button.classList.add("btn-warning");
        setTimeout(() => {
          button.innerHTML = "Shorten";
          document
            .getElementById("slug-input")
            .classList.remove("border-warning");
          button.classList.remove("btn-warning");
        }, 2000);
        setLoading(false);
        return;
      }
      if (slug.length > 20) {
        var button = document.querySelector(".btn-primary");
        button.innerHTML = "Slug must be at most 20 characters";
        document.getElementById("slug-input").classList.add("border-warning");
        button.classList.add("btn-warning");
        setTimeout(() => {
          button.innerHTML = "Shorten";
          button.classList.remove("btn-warning");
          document
            .getElementById("slug-input")
            .classList.remove("border-warning");
        }, 2000);
        setLoading(false);
        return;
      }
    }
    try {
      const res = await axios.post("/api/new-link-signed-in", {
        url: url,
        slug: slug,
        email: session.user.email,
      });
      var label = document.createElement("label");
      if (res.data.success) {
        label.htmlFor = "my-modal-6";
        document.body.appendChild(label);
        label.classList.add("hidden");
        label.click();
        document.body.removeChild(label);
        document.getElementById("url-input").value = "";
        setSlug(res.data.slug);
      }
    } catch (e) {
      if (e.response.data.internalCode) {
        label.htmlFor = "my-modal-7";
        document.body.appendChild(label);
        label.classList.add("hidden");
        label.click();
        document.body.removeChild(label);
      }
    }

    setLoading(false);
  };
  return (
    <>
      <section>
        <Head>
          <title>ishn.xyz | Link Shortener</title>
        </Head>
        <main>
          <Nav />
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
              <h1 className="text-center text-2xl font-bold sm:text-3xl">
                ishn.xyz | Link Shortener
              </h1>

              <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                Generate, customize, track, and share your links. Blazing fast
              </p>
              <form
                action=""
                className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl"
              >
                <div>
                  <p className="text-sm font-medium">
                    Enter the URL you want to shorten
                  </p>
                  <div className="relative mt-1">
                    <input
                      autoComplete="off"
                      spellCheck="false"
                      id="url-input"
                      placeholder="Your URL goes here"
                      onKeyPress={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const text = e.clipboardData.getData("text/plain");
                        document.execCommand("insertText", false, text);
                      }}
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="input input-bordered w-full rounded-lg p-4 pr-12 text-sm shadow-sm"
                    />
                    <span className="absolute inset-y-0 right-4 inline-flex items-center">
                      <AiOutlineLink className="text-gray-400" />
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Your preferred slug</p>
                  <div className="relative mt-1">
                    <input
                      autoComplete="off"
                      spellCheck="false"
                      id="slug-input"
                      placeholder="Leave blank for a random one"
                      onKeyPress={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const text = e.clipboardData.getData("text/plain");
                        document.execCommand("insertText", false, text);
                      }}
                      type="text"
                      value={slug}
                      onChange={(e) => {
                        var allowedChars = /^[a-zA-Z0-9]+$/;
                        if (!allowedChars.test(e.target.value)) {
                          setSlug("");
                        }
                        setSlug(e.target.value);
                      }}
                      onBlur={(e) => {
                        var allowedChars = /^[a-zA-Z0-9]+$/;
                        if (!allowedChars.test(e.target.value)) {
                          setSlug("");
                        }
                        setSlug(e.target.value);
                      }}
                      className="input input-bordered w-full rounded-lg p-4 pr-12 text-sm shadow-sm"
                    />
                    <span className="absolute inset-y-0 right-4 inline-flex items-center">
                      <BsFillPencilFill className="text-gray-400" />
                    </span>
                  </div>
                </div>
                <button
                  disabled={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    createInDB();
                  }}
                  type="submit"
                  className="btn btn-primary w-full rounded-lg px-5 py-3 flex justify-center text-sm font-medium"
                >
                  {loading ? (
                    <>
                      <AiOutlineLoading className="animate-spin" />
                    </>
                  ) : (
                    "Shorten"
                  )}
                </button>
                <p className="pt-3 text-center text-sm">
                  <Link href="/dashboard">
                    <span className="font-bold cursor-pointer">
                      View the links you&apos;ve created and their stats in your
                      dashboard.
                    </span>
                  </Link>
                </p>
              </form>
            </div>
          </div>{" "}
          <Footer />
        </main>
      </section>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg">
            Amazing, the link has been shortened!
          </h3>
          <p className="py-4">
            Your link is accessible at{" "}
            <Link target={"_blank"} href={`https://www.ishn.xyz/${slug}`}>
              <span className="link font-medium">ishn.xyz/{slug}</span>
            </Link>
          </p>
          <div className="action-buttons flex justify-evenly">
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://www.ishn.xyz/${slug}`);
                var copyText = document.querySelector(".copy-button-text");
                copyText.innerHTML = "Copied!";
                setTimeout(() => {
                  copyText.innerHTML = "Copy";
                }, 2000);
              }}
              className="flex flex-row items-center copy-button"
            >
              <FaCopy className="text-2xl" />
              <span className="ml-2 copy-button-text">Copy</span>
            </button>
            <button className="flex flex-row items-center copy-button">
              <IoBarcodeOutline className="text-2xl" />
              <span
                className="ml-2 copy-button-text"
                onClick={() => {
                  var qrCodeContainer =
                    document.querySelector(".qr-code-container");
                  qrCodeContainer.classList.remove("hidden");
                }}
              >
                Generate QR Code
              </span>
            </button>
          </div>
          <div
            className="
          flex flex-col justify-center items-center
          qr-code-container hidden py-4"
          >
            <img
              className="shadow-2xl p-3"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              crossOrigin="anonymous"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.ishn.xyz/${slug}`}
            />
            <button
              className="flex flex-row items-center copy-button ml-4"
              onClick={() => {
                var qrCode = document.querySelector(".qr-code-container img");
                var canvas = document.createElement("canvas");
                canvas.width = qrCode.width;
                canvas.height = qrCode.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(qrCode, 0, 0);
                var a = document.createElement("a");
                a.href = canvas.toDataURL("image/png");
                a.download = `ishn_xyz_${slug}.png`;
                a.click();
              }}
            >
              <span className="mt-6 flex flex-row items-center">
                <FaDownload className="text-2xl" />
                <span className="ml-2 copy-button-text">Download</span>
              </span>
            </button>
          </div>
          <div className="modal-action">
            <label
              onClick={() => {
                var qrCodeContainer =
                  document.querySelector(".qr-code-container");
                qrCodeContainer.classList.add("hidden");
                setUrl("");
                setSlug("");
              }}
              htmlFor="my-modal-6"
              className="btn"
            >
              Close
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-7" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Oops!</h3>
          <p className="py-4">
            That slug is already taken, please try another one.
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal-7" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoggedIn;
