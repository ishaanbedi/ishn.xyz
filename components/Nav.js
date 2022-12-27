import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { BiStats } from "react-icons/bi";
const Nav = () => {
  const { data: session } = useSession();
  return (
    <div className="navbar pt-6 lg:md:px-24">
      <div className="navbar-start">
        <Link href="/">
          <span className="btn btn-ghost normal-case text-xl">
            <code>
              <samp>ishn.xyz</samp>
            </code>
          </span>
        </Link>
      </div>
      <div className="navbar-end">
        {session ? (
          <>
            <span className="lg:md:flex hidden flex-row space-x-2">
              <Link href="/dashboard">
                <span className="btn">Dashboard</span>
              </Link>
              <Link href="/profile">
                <span className="btn btn-ghost">Profile</span>
              </Link>
            </span>

            <span className="lg:md:hidden flex flex-row space-x-1">
              <Link href="/dashboard">
                <span className="btn btn-ghost">
                  <BiStats className="text-xl" />
                </span>
              </Link>
              <Link href="/profile">
                <span className="btn btn-ghost">
                  <CgProfile className="text-xl" />
                </span>
              </Link>
            </span>
          </>
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
