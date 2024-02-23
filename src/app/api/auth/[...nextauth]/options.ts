import { NextAuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// Production PuStack App
// clientId: "645064660474863",
// clientSecret: "cdcb46d7a5014b2e9d6b9936c4156c0d",

// Dev Arti AI App
// clientId: "2066246223759250",
// clientSecret: "d7213e6af43684e9c5fc23513571520c",

// Dev
// clientId: "713068484341612",
// clientSecret: "e7afa5fce3a6e6c5f10fc530eeb0346f",
interface FacebookAppConfig {
    clientId: string;
    clientSecret: string;
}

const getFacebookApp = (key: string): FacebookAppConfig | undefined => {
    const config: Record<string, FacebookAppConfig> = {
        "production_pustack": {
            clientId: "645064660474863",
            clientSecret: "cdcb46d7a5014b2e9d6b9936c4156c0d",
        },
        "production_artiai": {
            clientId: "2066246223759250",
            clientSecret: "d7213e6af43684e9c5fc23513571520c",
        },
        "dev_artiai_auth": {
            clientId: "713068484341612",
            clientSecret: "e7afa5fce3a6e6c5f10fc530eeb0346f",
        }
    }

    return config[key];
}
export const options: NextAuthOptions = {
    providers: [
        FacebookProvider({
            clientId: getFacebookApp("production_artiai")?.clientId!,
            clientSecret: getFacebookApp("production_artiai")?.clientSecret!,
            authorization: "https://www.facebook.com/v11.0/dialog/oauth?scope=ads_management",
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