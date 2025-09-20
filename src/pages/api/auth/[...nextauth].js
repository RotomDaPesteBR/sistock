import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../lib/prisma';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const res = await fetch(
          'http://localhost:3000/api/db/auth/login',
          // 'https://sistock.vercel.app/api/db/auth/login',
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' }
          }
        );
        // If no error and we have user data, return it
        if (!res.ok) {
          return null;
        }

        const user = await res.json();

        return user;

        // Return null if user data could not be retrieved
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid profile email'
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: ({ token, user }) => {
      const jwtToken = { ...token };
      if (user) {
        jwtToken.id = user.id;
      }
      return jwtToken;
    },
    session: ({ session, user, token }) => {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            username: token.name,
            email: token.email,
            image: token.picture
          }
        };
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          username: user.username,
          email: user.email
        }
      };
    }
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
    verifyRequest: '/login'
  }
};

export default NextAuth(authOptions);
