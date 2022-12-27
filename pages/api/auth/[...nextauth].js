import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { XataAdapter } from "@next-auth/xata-adapter";
import { XataClient } from "../../../xata";
const client = new XataClient();
export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  // },
  secret: process.env.JWT_SECRET,
  adapter: XataAdapter(client),
});
