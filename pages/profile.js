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
        <main>
          <h1>You are not signed in</h1>
          <Link href={"/"}>Home</Link>{" "}
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

          <h3 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Welcome,{" "}
            {session?.user.name ? session?.user.name : session?.user.email}
          </h3>
          <details className="my-3">
            <summary>Account Details</summary>
            <p>
              <strong>Email:</strong> {session?.user.email}
            </p>
            <p>
              <strong>Username:</strong> {session?.user.name}
            </p>
            <p
              className="mt-4 tooltip tooltip-top underline underline-offset-4"
              data-tip="This information is provided by the authentication provider you signed in with. Other than these, we do not have any personal information about you."
            >
              About these details
            </p>
          </details>
          <details>
            <summary>Danger Zone</summary>
            <p className="py-4 text-warning">
              <Link href="/request-deletion">Request account deletion</Link>
            </p>
          </details>
          <p className="my-4 font-bold hover:underline underline-offset-2">
            <Link href="/report">Report offensive content</Link>
          </p>
          <button
            className="btn mt-12"
            onClick={() => {
              setLoading(true);
              signOut();
            }}
          >
            {loading ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </main>
    </header>
  );
};

export default Profile;
