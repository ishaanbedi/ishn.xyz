import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl"></h1>

          <p className="mx-auto mt-4 max-w-md text-center text-base-content"></p>

          <form className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
            <p className="text-lg font-medium">Sign in to your account</p>

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <div className="relative mt-1">
                <input
                  autoComplete="off"
                  type="email"
                  id="email"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <hr />
            <h3 className="text-center">OR</h3>
            <>
              {Object.values(providers).map((provider) => (
                <div key={provider.name} className="flex justify-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
            </>
            <button
              type="submit"
              className="block w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-base-content">
              No account?
              <a className="underline" href="">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
