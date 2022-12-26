import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { signIn } from "next-auth/react";
import Footer from "../components/Footer";
import { AiOutlineLoading, AiOutlineLink } from "react-icons/ai";
import { FaCopy, FaDownload } from "react-icons/fa";
import { IoBarcodeOutline } from "react-icons/io5";
import Link from "next/link";
const NotLoggedIn = () => {
  const isValidURL = (str) => {
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
      document.querySelector(".input").classList.add("border-warning");
      document.querySelector(".btn-primary").innerHTML = "Please enter a URL";
      document.querySelector(".btn-primary").classList.add("btn-warning");
      setTimeout(() => {
        document.querySelector(".input").classList.remove("border-warning");
        document.querySelector(".btn-primary").innerHTML = "Shorten";
        document.querySelector(".btn-primary").classList.remove("btn-warning");
      }, 2000);
      return;
    }
    if (!isValidURL(url)) {
      const button = document.querySelector(".btn-primary");
      button.innerHTML = "Please enter a valid URL";
      document.querySelector(".input").classList.add("border-warning");
      button.classList.add("btn-warning");
      setTimeout(() => {
        button.disabled = false;
        button.innerHTML = "Shorten";
        document.querySelector(".input").classList.remove("border-warning");
        button.classList.remove("btn-warning");
      }, 2000);
      setLoading(false);
      return;
    }
    const res = await axios.post("/api/new-link-signed-out", {
      url,
    });
    if (res.data.success) {
      const label = document.createElement("label");
      label.htmlFor = "my-modal-6";
      document.body.appendChild(label);
      label.classList.add("hidden");
      label.click();
      document.body.removeChild(label);
      document.querySelector(".input").value = "";
      setUrl("");
      setSlug(res.data.slug);
    }
    setLoading(false);
  };
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");
  const handleKeyPress = (e) => {
    const button = document.querySelector(".btn-primary");
    if (button.disabled) return;
    if (e.key === "Enter" && url !== "") {
      createInDB();
    }
  };
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [url]);
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
                <p className="text-lg font-medium">
                  Enter the URL you want to shorten
                </p>
                <div>
                  <div className="relative mt-1">
                    <input
                      placeholder="https://website.com/very-long-url.html"
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
                  <span
                    className="tooltip tooltip-bottom font-bold cursor-pointer"
                    onClick={() => signIn()}
                    data-tip="Create links with custom slugs, track clicks in your dashboard, and more!"
                  >
                    Login to get more features!
                  </span>
                </p>
              </form>
            </div>
          </div>

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
            <Link
              target="_blank"
              href={`https://www.ishn.xyz/${slug}`}
              rel="noreferrer"
            >
              <span className="link font-medium">ishn.xyz/{slug}</span>
            </Link>
          </p>
          <div className="action-buttons flex justify-evenly">
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://www.ishn.xyz/${slug}`);
                const copyText = document.querySelector(".copy-button-text");
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
                  const qrCodeContainer =
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
                const qrCode = document.querySelector(".qr-code-container img");
                const canvas = document.createElement("canvas");
                canvas.width = qrCode.width;
                canvas.height = qrCode.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(qrCode, 0, 0);
                const a = document.createElement("a");
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
                const qrCodeContainer =
                  document.querySelector(".qr-code-container");
                qrCodeContainer.classList.add("hidden");
                setUrl("");
              }}
              htmlFor="my-modal-6"
              className="btn"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default NotLoggedIn;
