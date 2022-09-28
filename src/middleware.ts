import { withAuth } from './lib/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
    error: '/login'
  }
});

export const config = { matcher: ['/'] };
