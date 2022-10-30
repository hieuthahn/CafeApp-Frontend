import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "../../../config/axios"

export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials, req) {
                try {
                    const res = await axios.post(
                        "/api/v1/auth/signin",
                        credentials
                    )
                    const user = res.data
                    if (user) {
                        return user
                    }
                } catch (error) {
                    throw new Error(
                        error.response?.data?.message ||
                            error.response?.data ||
                            error.response
                    )
                }

                return null
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            return token
        },
    },
}

export default NextAuth(authOptions)
