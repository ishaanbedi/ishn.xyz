import Head from "next/head";
import Nav from "../../components/Nav";

const RequestDeletion = () => {
  return (
    <header>
      <main>
        <Head>
          <title>Request Deletion</title>
        </Head>
        <Nav />
        <h1>Request Deletion</h1>
        <h4>
          Your data is completely yours, and is completely safe on the database
          with all the safety measures.
          <br />
          <br />
          We don&apos;t share your data with anyone.
          <br />
          <br />
          If you want to delete your account, you can do so by contacting me at{" "}
          <a href="mailto:hi@ishaanbedi.in">hi@ishaanbedi.in</a>
        </h4>
        <p>
          Please note that the email address you&apos;ll be requesting deletion
          for should be the same as the one you&apos;ll send me the email from,
          unless presented with a valid proof of ownership, to prevent any abuse
          or misuse of the data.
        </p>
      </main>
    </header>
  );
};

export default RequestDeletion;
