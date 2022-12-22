import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
const Create = () => {
  const createInDB = async () => {
    const res = await fetch("/api/add-new-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        url: url,
      }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      document.getElementById("myModal").showModal();
    }
    setLoading(false);
  };
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const allowedCharacters = /^[a-zA-Z0-9_-]*$/;
  const updateCopyButtonText = () => {
    const copyButton = document.querySelector(".copy-button");
    copyButton.innerHTML = "Copied!";
    setTimeout(() => {
      copyButton.innerHTML = "Copy link";
    }, 2000);
  };
  return (
    <main>
      <Head>
        <title>Create a new link</title>
      </Head>
      <Link href="/">Back to home</Link>
      <header>
        <dialog className="modal" id="myModal">
          <p>
            Link created successfully!
            <br /> Accessible at{" "}
            <Link target={"_blank"} href={`https://ishn.xyz/${id}`}>
              ishn.xyz/{id}
            </Link>
          </p>

          <center>
            <button
              onClick={() => {
                setUrl("");
                setId("");
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
                navigator.clipboard.writeText(`https://ishn.xyz/${id}`);
              }}
            >
              Copy link
            </button>
          </center>
        </dialog>

        <h2>Create a new link</h2>
        <p>Enter the URL and slug for the new link:</p>
        <section>
          <form>
            <label htmlFor="url">URL</label>
            <input
              onKeyPress={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
              placeholder="https://www.amazingwebsite.com/very-interesting-page/interesting-user"
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              required={true}
            />
            <label htmlFor="id">Slug</label>
            <input
              onKeyPress={(e) => {
                if (!allowedCharacters.test(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder="john_doe"
              type="text"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              required={true}
            />
            <center>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  createInDB();
                }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Create"}
              </button>
            </center>
          </form>
        </section>
      </header>
    </main>
  );
};
export default Create;
