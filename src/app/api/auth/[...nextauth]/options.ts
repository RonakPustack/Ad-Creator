import { NextAuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'

// Production
// clientId: "645064660474863",
// clientSecret: "cdcb46d7a5014b2e9d6b9936c4156c0d",


// Dev
// clientId: "713068484341612",
// clientSecret: "e7afa5fce3a6e6c5f10fc530eeb0346f",

export const options: NextAuthOptions = {
    providers: [
        FacebookProvider({
            clientId: "713068484341612",
            clientSecret: "e7afa5fce3a6e6c5f10fc530eeb0346f",
            authorization: "https://www.facebook.com/v11.0/dialog/oauth",
            // idToken: true,
            profile(profile, token) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.id,
                    image: token.access_token,
                }
            },
            userinfo: {
                url: "https://graph.facebook.com/me",
                params: { fields: "id,name,email,picture" },
                async request({ tokens, client, provider }) {
                    const userInfo = await client.userinfo(tokens.access_token!, {
                        // @ts-expect-error
                        params: provider.userinfo?.params,
                    })
                    return userInfo;
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        },
    },
    secret: "7792719ba5b8a71bafd3ce3a85b41fb2"
}