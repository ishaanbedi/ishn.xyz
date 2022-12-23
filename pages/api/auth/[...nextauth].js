import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { XataAdapter } from "@next-auth/xata-adapter";
import { XataClient } from "../../../xata";
const client = new XataClient();
export default NextAuth({
  adapter: XataAdapter(client),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
});
