import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { signIn } from "next-auth/react";
import Footer from "../components/Footer";
import { AiOutlineLoading } from "react-icons/ai";
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
      document.querySelector(".input").classList.add("border-error");
      document.querySelector(".btn-primary").disabled = true;
      document.querySelector(".btn-primary").innerHTML = "Please enter a URL";
      setTimeout(() => {
        document.querySelector(".input").classList.remove("border-error");
        document.querySelector(".btn-primary").innerHTML = "Shorten";
        document.querySelector(".btn-primary").disabled = false;
      }, 2000);
      return;
    }
    if (!isValidURL(url)) {
      const button = document.querySelector(".btn-primary");
      button.disabled = true;
      button.innerHTML = "Please enter a valid URL";
      document.querySelector(".input").classList.add("border-error");
      setTimeout(() => {
        button.disabled = false;
        button.innerHTML = "Shorten";
        document.querySelector(".input").classList.remove("border-error");
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 hero lg:mt-32 md:mt-24 sm:mt-16 mt-12">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left ">
                <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold">
                  <span>ishn.xyz</span> | Link Shortener
                </h1>
                <p className="pt-6 lg:text-xl md:text-lg sm:text-base text-sm">
                  Generate, customize, track, and share your links. Blazing fast
                </p>
                <p className="pt-3 lg:text-xl md:text-lg sm:text-base text-sm">
                  <span className="link font-medium" onClick={() => signIn()}>
                    Login
                  </span>{" "}
                  to get more features like links with{" "}
                  <span
                    className="tooltip tooltip-bottom underline underline-offset-4"
                    data-tip="ishn.xyz/github"
                  >
                    custom slugs
                  </span>
                  , dashboard with{" "}
                  <span
                    className="tooltip tooltip-bottom underline underline-offset-4"
                    data-tip="Number of clicks, countries etc."
                  >
                    analytics
                  </span>
                  , and more, for{" "}
                  <span
                    className="tooltip tooltip-bottom underline underline-offset-4"
                    data-tip="Yes, it's completely free!"
                  >
                    free
                  </span>
                  !
                </p>
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-md font-bold">
                        Enter the URL you want to shorten
                      </span>
                    </label>
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
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button
                      disabled={loading}
                      onClick={createInDB}
                      className="btn btn-primary"
                    >
                      {loading ? (
                        <>
                          <AiOutlineLoading className="animate-spin" />
                        </>
                      ) : (
                        "Shorten"
                      )}
                    </button>
                  </div>
                </div>
              </div>
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
                  copyText.innerHTML = "Copy to clipboard";
                }, 2000);
              }}
              className="flex flex-row items-center copy-button"
            >
              <FaCopy className="text-2xl" />
              <span className="ml-2 copy-button-text">Copy to clipboard</span>
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
