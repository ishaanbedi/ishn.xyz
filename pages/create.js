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
      alert("Link created successfully! Accessible at ishn.xyz/" + id);
      setUrl("");
      setId("");
    }
    setLoading(false);
  };
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const allowedCharacters = /^[a-zA-Z0-9]+$/;

  return (
    <main>
      <Link href="/">Back to home</Link>
      <header>
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
