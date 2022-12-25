import Link from "next/link";

const Footer = () => {
  return (
    <div className="hidden md:block">
      <footer className="py-3 absolute bottom-2 w-screen">
        <center>
          <p>
            With ❤️ by{" "}
            <Link
              className="text-secondary font-bold hover:underline underline-offset-2"
              href="https://www.ishn.xyz/ishn"
              target="_blank"
              rel="noreferrer"
            >
              Ishaan Bedi
            </Link>
          </p>
          <p>
            Built with{" "}
            <Link
              className="text-secondary font-bold hover:underline underline-offset-2"
              href="https://www.ishn.xyz/nextjs"
              target="_blank"
              rel="noreferrer"
            >
              Next.js
            </Link>
            &nbsp;and{" "}
            <Link
              className="text-secondary font-bold hover:underline underline-offset-2"
              href="https://www.ishn.xyz/xata"
              target="_blank"
              rel="noreferrer"
            >
              Xata
            </Link>
            . Shipped with{" "}
            <Link
              className="text-secondary font-bold hover:underline underline-offset-2"
              href="https://www.ishn.xyz/vercel"
              target="_blank"
              rel="noreferrer"
            >
              Vercel
            </Link>
            .
          </p>
          <p>
            <Link
              className="text-secondary font-bold hover:underline underline-offset-2"
              href="/policies/privacy-policy.html"
              target="_blank"
            >
              Privacy Policy
            </Link>
            &nbsp;|&nbsp;
            <Link
              className="text-secondary font-bold hover:underline underline-offset-2"
              href="/policies/tnc.html"
              target="_blank"
            >
              Terms of Service
            </Link>
          </p>
        </center>
      </footer>
    </div>
  );
};

export default Footer;
