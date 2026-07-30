import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim())

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    jwt({ token, profile }) {
      if (profile?.email && ADMIN_EMAILS.includes(profile.email)) {
        token.role = "admin"
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as string) ?? "user"
      }
      return session
    },
  },
})
