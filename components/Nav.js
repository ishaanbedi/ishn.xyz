import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link href="https://www.ishn.xyz/github" target={"_blank"}>
                GitHub
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
      </div>
    );
  } else {
    return (
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
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
