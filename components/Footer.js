import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer>
        <center>
          <p>
            With ❤️ by{" "}
            <a rel="noreferrer" href="https://ishaanbedi.in" target="_blank">
              Ishaan Bedi
            </a>
          </p>
          <p>
            Built with{" "}
            <Link href="https://nextjs.org/" target="_blank" rel="noreferrer">
              Next.js
            </Link>
            &nbsp;and{" "}
            <Link href="https://xata.io/" target="_blank" rel="noreferrer">
              Xata
            </Link>
            . Shipped with{" "}
            <Link href="https://vercel.com/" target="_blank" rel="noreferrer">
              Vercel
            </Link>
          </p>
        </center>
      </footer>
    </div>
  );
};

export default Footer;
