import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "../components/Footer";
import { AiOutlineLoading } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";
import { IoBarcodeOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
const LoggedIn = () => {
  var { data: session, status } = useSession();
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
    if (str.length < 3) return false;
    var allowed = "abcdefghijklmnopqrstuvwxyz0123456789_-";
    for (var i = 0; i < str.length; i++) {
      if (!allowed.includes(str[i])) return false;
    }
    return true;
  };
  const createInDB = async () => {
    setLoading(true);
    if (url === "") {
      setLoading(false);
      document.getElementById("url-input").classList.add("border-error");
      document.querySelector(".btn-primary").innerHTML = "Please enter a URL";
      setTimeout(() => {
        document.getElementById("url-input").classList.remove("border-error");
        document.querySelector(".btn-primary").innerHTML = "Shorten";
      }, 2000);
      return;
    }
    if (!isValidURL(url)) {
      var button = document.querySelector(".btn-primary");
      button.disabled = true;
      button.innerHTML = "Please enter a valid URL";
      document.getElementById("url-input").classList.add("border-error");
      setTimeout(() => {
        button.disabled = false;
        button.innerHTML = "Shorten";
        document.getElementById("url-input").value = "";
        setUrl("");
        document.getElementById("url-input").classList.remove("border-error");
      }, 2000);
      setLoading(false);
      return;
    }
    if (slug !== "" && !isValidSlug(slug)) {
      var button = document.querySelector(".btn-primary");
      button.disabled = true;
      if (slug.length > 20) {
        button.innerHTML = "Slug must be less than 20 characters";
      }
      if (slug.length < 3) {
        button.innerHTML = "Slug must be more than 3 characters";
      }
      if (slug.length >= 3 && slug.length <= 20) {
        button.innerHTML = "Invalid characters in slug.";
      }
      document.getElementById("slug-input").classList.add("border-error");
      setTimeout(() => {
        button.disabled = false;
        button.innerHTML = "Shorten";
        document.getElementById("slug-input").classList.remove("border-error");
        document.getElementById("slug-input").value = "";
        setSlug("");
      }, 2000);
      setLoading(false);
      return;
    }
    const res = await axios.post("/api/new-link-signed-in", {
      url: url,
      slug: slug,
      email: session.user.email,
    });
    if (res.data.success) {
      var label = document.createElement("label");
      label.htmlFor = "my-modal-6";
      document.body.appendChild(label);
      label.classList.add("hidden");
      label.click();
      document.body.removeChild(label);
      document.getElementById("url-input").value = "";
      document.getElementById("slug-input").value = "";
      setSlug(res.data.slug);
    }
    setLoading(false);
  };
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");
  const handleKeyPress = (e) => {
    var button = document.querySelector(".btn-primary");
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
              <div className="text-center lg:text-left lg:md:pl-12">
                <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold">
                  <span>ishn.xyz</span>
                </h1>
                <p className="pt-6 lg:text-xl md:text-lg sm:text-base text-sm">
                  Generate, customize, track, and share your links. Blazing fast
                </p>
                <p className="pt-6 lg:text-xl md:text-lg sm:text-base text-sm">
                  View the links you&apos;ve created and their stats in your{" "}
                  <Link
                    className="underline underline-offset-2 font-bold"
                    href="/dashboard"
                  >
                    dashboard
                  </Link>
                  .
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
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      id="url-input"
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
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-md font-bold">
                        Your preferred slug (leave blank for random)
                      </span>
                    </label>
                    <input
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      id="slug-input"
                      placeholder="myslug"
                      onKeyPress={(e) => {
                        var allowedChars = /^[a-zA-Z0-9]+$/;
                        if (!allowedChars.test(e.key)) {
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
                      onChange={(e) => setSlug(e.target.value)}
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
    </>
  );
};
export default LoggedIn;
