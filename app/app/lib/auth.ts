import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "./db";

declare module "next-auth" {
    interface Session {
      user: {
        id: string; // Add id to the user object in the session
        name?: string | null;
        email?: string | null;
        image?: string | null;
      };
    }
  }

export const NEXT_AUTH_CONFIG = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? ""
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }:any) {
            try {
              console.log(user)
              // Log the user ID during login
              console.log('User ID during login:', user.id);
      
              // Check if the user already exists in the database
              if(!user.email){
                return false;
              }
              const existingUser = await prismaClient.user.findUnique({
                where: { email: user.email },
              });
      
              if (!existingUser) {
                // If user does not exist, create a new user
                await prismaClient.user.create({
                  data: {
                    id: user.id,
                    email: user.email,
                  },
                });
              }
              console.log("YAAA")
      
              // Return true to allow the sign-in, or false to deny it
              return true;
            } catch (error) {
              console.error('Error storing user in the database:', error);
              return false; // Deny sign-in on error
            }
          },
        jwt: async ({ user, token }: any) => {
        if (user) {
            token.uid = user.id;
        }
        return token;
        },
      session: ({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.uid
          }
          return session
      }
    },
    pages: {
        signIn: '/signin',
    }
  }