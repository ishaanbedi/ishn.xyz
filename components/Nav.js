import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar pt-6 lg:md:px-24">
      <div className="navbar-start">
        <span className="btn btn-ghost normal-case text-xl">
          <Link href="/">
            <code>
              <samp>ishn.xyz</samp>
            </code>
          </Link>
        </span>
      </div>
      <div className="navbar-end">
        {session ? (
          <Link href="/dashboard">
            <span className="btn">Dashboard</span>
          </Link>
        ) : (
          <span className="btn" onClick={() => signIn()}>
            Sign In
          </span>
        )}
      </div>
    </div>
  );
};
export default Nav;
