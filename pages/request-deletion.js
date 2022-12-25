import Head from "next/head";
import Nav from "../components/Nav";
import Link from "next/link";

const RequestDeletion = () => {
  return (
    <header>
      <main>
        <Head>
          <title>Request Deletion</title>
        </Head>
        <Nav />
        <div className="text-center mt-12">
          <h1 className="text-3xl text-center py-2 font-bold tracking-tight  sm:text-4xl">
            Request Deletion
          </h1>
          <div className="mx-2">
            <h4>
              Your data is completely yours, and is completely safe on the
              database with all the safety measures.
            </h4>
            <h4>We don&apos;t share your data with anyone.</h4>
            <h4>
              If you want to delete your account, you can do so by contacting me
              at{" "}
              <a
                className="underline underline-offset-4 font-semibold"
                href="mailto:hi@ishaanbedi.in"
              >
                hi@ishaanbedi.in
              </a>
            </h4>
            <p
              className="mt-4 font-bold tooltip tooltip-bottom underline underline-offset-4"
              data-tip="Please note that the email address you'll be requesting
            deletion for should be the same as the one you'll send me the
            email from, unless presented with a valid proof of ownership, to
            prevent any abuse or misuse of the data."
            >
              Important Note
            </p>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link href="/">
            <span className="btn">Home</span>
          </Link>
        </div>
      </main>
    </header>
  );
};

export default RequestDeletion;
