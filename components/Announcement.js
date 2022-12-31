import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight as Arrow } from "react-icons/ai";
const Announcement = () => {
  const [show, setShow] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("announcement") === "false") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } relative bg-primary px-4 py-3 pr-14 text-primary-content`}
    >
      <p className="text-left text-sm font-medium sm:text-center">
        We just released a new API to make it easier to generate short URLs.{" "}
        <Link
          className="underline-offset-4 link"
          target="_blank"
          href="https://api.ishn.xyz"
          rel="noreferrer"
        >
          Check it out
          <Arrow className="inline-block ml-1" />
        </Link>
      </p>

      <button
        aria-label="Close"
        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
        onClick={() => {
          setShow(false);
          localStorage.setItem("announcement", "false");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Announcement;
