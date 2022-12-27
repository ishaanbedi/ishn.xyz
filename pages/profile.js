import { useSession, signOut } from "next-auth/react";
import Nav from "../components/Nav";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return (
      <header>
        <main className="flex flex-col h-screen justify-center items-center">
          <h1 className="text-3xl text-center py-2 font-bold tracking-tight  sm:text-4xl">
            You are not signed in
          </h1>
          <Link href="/">
            <button className="btn btn-ghost">Go Home</button>
          </Link>{" "}
        </main>
      </header>
    );
  }
  return (
    <header>
      <Head>
        <title>Profile</title>
      </Head>
      <Nav />
      <main className="text-center">
        <div className="py-6">
          <h1 className="text-3xl text-center py-2 font-bold tracking-tight  sm:text-4xl">
            Profile
          </h1>
          <figure>
            <div className="avatar py-6">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  className="text-center"
                  src={
                    session?.user.image ||
                    "https://i.picsum.photos/id/80/75/75.jpg?hmac=p1N_NT-q6bjkU5zp4EjxNy9m41vqasJDXSS_mBQ1bAA"
                  }
                  alt={session?.user.name || "User"}
                />
              </div>
            </div>
          </figure>

          <h3 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome,{" "}
            {session?.user.name ? session?.user.name : session?.user.email}
          </h3>
          <details className="my-3">
            <summary>Account Details</summary>
            <p>
              <strong>Email:</strong> {session?.user.email}
            </p>
            {session?.user.name && (
              <p>
                <strong>Name:</strong> {session?.user.name}
              </p>
            )}

            <p
              className="mt-4 tooltip tooltip-top underline underline-offset-4"
              data-tip="This information is provided by the authentication provider you signed in with. Other than the above, we do not have any personal information about you."
            >
              About these details
            </p>
          </details>
          <details>
            <summary>Danger Zone</summary>
            <p className="py-4 text-error">
              <Link href="/request-deletion">Request account deletion</Link>
            </p>
          </details>
          <p className="my-4 font-bold hover:underline underline-offset-2">
            <Link href="/report">Report offensive content</Link>
          </p>
          <div>
            <Link
              target="_blank"
              href="https://www.github.com/ishaanbedi/ishn.xyz/"
              rel="noreferrer"
            >
              <button className="btn gap-2">
                Star us on GitHub
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </Link>
          </div>
          <button
            className={`mt-12 ${loading ? "btn loading" : "btn"}`}
            onClick={() => {
              setLoading(true);
              signOut();
            }}
          >
            Sign out
          </button>
        </div>
      </main>
    </header>
  );
};

export default Profile;
