import { dbConnect } from "@/utils/dbConnect";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../server/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // add other providers as needed
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === "google" && profile) {
        await dbConnect();
        const email = profile.email;
        let existingUser = await User.findOne({ email });

        if (!existingUser) {
          try {
            existingUser = await User.create({
              name: profile.name,
              email: profile.email,
              image: profile.image,
            });
          } catch (error) {
            console.error(error);
          }
        }

        user.id = existingUser!._id.toString();
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

export default NextAuth(authOptions);
