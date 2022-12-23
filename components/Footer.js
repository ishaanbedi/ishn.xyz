import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer>
        <center>
          <p>
            Made with ❤️ by{" "}
            <a rel="noreferrer" href="https://ishaanbedi.in" target="_blank">
              Ishaan Bedi
            </a>
          </p>
          <p>
            Built with{" "}
            <Link href="https://nextjs.org/" target={"_blank"}>
              Next.js
            </Link>
            &nbsp;and{" "}
            <Link href="https://xata.io/" target={"_blank"}>
              Xata
            </Link>
            . Shipped with{" "}
            <Link href="https://vercel.com/" target={"_blank"}>
              Vercel
            </Link>
          </p>
        </center>
      </footer>
    </div>
  );
};

export default Footer;
