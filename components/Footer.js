import Link from "next/link";

const Footer = () => {
  return (
    <div className="hidden md:block">
      <footer className="py-3 absolute bottom-2 w-screen">
        <center>
          <p>
            With ❤️ by{" "}
            <Link
              className="text-primary font-bold hover:underline underline-offset-2"
              href="https://www.ishn.xyz/ishn"
              target={"_blank"}
            >
              Ishaan Bedi
            </Link>
          </p>
          <p>
            Built with{" "}
            <Link
              className="text-primary font-bold hover:underline underline-offset-2"
              href="https://www.ishn.xyz/nextjs"
              target={"_blank"}
            >
              Next.js
            </Link>
            &nbsp;and{" "}
            <Link
              className="text-primary font-bold hover:underline underline-offset-2"
              href="https://www.ishn.xyz/xata"
              target={"_blank"}
            >
              Xata
            </Link>
            . Shipped with{" "}
            <Link
              className="text-primary font-bold hover:underline underline-offset-2"
              href="https://www.ishn.xyz/vercel"
              target={"_blank"}
            >
              Vercel
            </Link>
            .
          </p>
        </center>
      </footer>
    </div>
  );
};

export default Footer;
