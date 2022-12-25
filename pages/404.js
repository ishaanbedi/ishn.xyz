import Link from "next/link";
const Custom404 = () => {
  return (
    <div className="grid h-screen px-4 place-content-center">
      <div className="text-center">
        <h1 className="font-black text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight  sm:text-4xl">Uh-oh!</p>

        <p className="mt-4 ">We can&apos;t find that page.</p>
        <div className="my-3">
          <Link href="/">
            <button className="btn btn-ghost">Go Back Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
