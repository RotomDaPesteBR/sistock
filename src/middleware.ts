import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ token }) {
      if (token) return false; // If there is a token, the user is authenticated
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
});

export const config = { matcher: ['/'] };
