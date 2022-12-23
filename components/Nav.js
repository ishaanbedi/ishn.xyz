import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <nav>
        <ul>
          <li>
            <Link href="/">
              <samp>ishn.xyz</samp>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <a style={{ cursor: "pointer" }} onClick={() => signIn()}>
              Login
            </a>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul>
          <li>
            <Link href="/">
              <samp>ishn.xyz</samp>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <span
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              My Account
            </span>
            <ul>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard/profile">Profile</Link>
              </li>
              <li>
                <a style={{ cursor: "pointer" }} onClick={() => signOut()}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Nav;
