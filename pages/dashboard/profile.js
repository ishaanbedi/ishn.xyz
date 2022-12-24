import { useSession, signOut } from "next-auth/react";
import Nav from "../../components/Nav";
import Link from "next/link";
import Head from "next/head";

const Profile = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <header>
        <main>
          <h1>You are not signed in</h1>
          <Link href="/">Home</Link>{" "}
        </main>
      </header>
    );
  }
  return (
    <header>
      <main>
        <Head>
          <title>Profile</title>
        </Head>
        <Nav />
        <h1>Profile</h1>

        <div>
          <figure>
            <img
              style={({ width: "75px" }, { height: "75px" })}
              src={
                session?.user.image ||
                "https://i.picsum.photos/id/80/75/75.jpg?hmac=p1N_NT-q6bjkU5zp4EjxNy9m41vqasJDXSS_mBQ1bAA"
              }
              alt={session?.user.name || "User"}
            />
          </figure>

          <h3>
            Welcome,{" "}
            {session?.user.name ? session?.user.name : session?.user.email}
          </h3>
          <details>
            <summary>Account Details</summary>
            <p>
              <strong>Email:</strong> {session?.user.email}
            </p>
            <p>
              <strong>Username:</strong> {session?.user.name}
            </p>
          </details>
          <details>
            <summary>Danger Zone</summary>
            <p>
              <Link href="/dashboard/request-deletion">
                Request account deletion
              </Link>
            </p>
          </details>
          <p>
            <Link href="/dashboard/report">Report offensive content</Link>
          </p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </main>
    </header>
  );
};

export default Profile;
