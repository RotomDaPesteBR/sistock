/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWT } from 'next-auth/jwt';
import { NextAuthMiddlewareOptions } from 'next-auth/middleware';
import { getSession } from 'next-auth/react';
import {
  NextMiddleware,
  NextFetchEvent,
  NextRequest,
  NextResponse
} from 'next/server';

import parseUrl from './parseUrl';

type NextMiddlewareResult = ReturnType<NextMiddleware> | void; // eslint-disable-line @typescript-eslint/no-invalid-void-type

async function handleMiddleware(
  req: NextRequest,
  options: NextAuthMiddlewareOptions | undefined,
  onSuccess?: (token: JWT | null) => Promise<NextMiddlewareResult>
) {
  const { pathname, search, origin } = req.nextUrl;

  const signInPage = options?.pages?.signIn ?? '/api/auth/signin';
  const errorPage = options?.pages?.error ?? '/api/auth/error';
  const basePath = parseUrl(process.env.NEXTAUTH_URL).path;
  const publicPaths = ['/_next', '/favicon.ico'];

  // Avoid infinite redirects/invalid response
  // on paths that never require authentication
  if (
    pathname.startsWith(basePath) ||
    [signInPage, errorPage].includes(pathname) ||
    publicPaths.some(p => pathname.startsWith(p))
  ) {
    return;
  }

  const secret = options?.secret ?? process.env.NEXTAUTH_SECRET;
  if (!secret) {
    console.error(
      `[next-auth][error][NO_SECRET]`,
      `\nhttps://next-auth.js.org/errors#no_secret`
    );

    const errorUrl = new URL(errorPage, origin);
    errorUrl.searchParams.append('error', 'Configuration');

    return NextResponse.redirect(errorUrl);
  }

  const requestForNextAuth: any = {
    headers: {
      cookie: req.headers.get('cookie')
    }
  };

  const session = await getSession({ req: requestForNextAuth });

  if (session) {
    return NextResponse.next();
  }
  // the user is not logged in, redirect to the sign-in page
  const signInUrl = new URL(signInPage, origin);
  signInUrl.searchParams.append('callbackUrl', `${pathname}${search}`);
  return NextResponse.redirect(signInUrl);
}

export interface NextRequestWithAuth extends NextRequest {
  nextauth: { token: JWT | null };
}

export type NextMiddlewareWithAuth = (
  request: NextRequestWithAuth,
  event: NextFetchEvent
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type WithAuthArgs =
  | [NextRequestWithAuth]
  | [NextRequestWithAuth, NextFetchEvent]
  | [NextRequestWithAuth, NextAuthMiddlewareOptions]
  | [NextMiddlewareWithAuth]
  | [NextMiddlewareWithAuth, NextAuthMiddlewareOptions]
  | [NextAuthMiddlewareOptions]
  | [];

/**
 * Middleware that checks if the user is authenticated/authorized.
 * If if they aren't, they will be redirected to the login page.
 * Otherwise, continue.
 *
 * @example
 *
 * ```js
 * // `middleware.js`
 * export { default } from "next-auth/middleware"
 * ```
 *
 * ---
 * [Documentation](https://next-auth.js.org/configuration/nextjs#middleware)
 */
export function withAuth(...args: WithAuthArgs) {
  if (!args.length || args[0] instanceof NextRequest) {
    // @ts-expect-error
    return handleMiddleware(...args);
  }

  if (typeof args[0] === 'function') {
    const middleware = args[0];
    const options = args[1] as NextAuthMiddlewareOptions | undefined;
    return async (...args: Parameters<NextMiddlewareWithAuth>) =>
      handleMiddleware(args[0], options, async token => {
        args[0].nextauth = { token };
        return middleware(...args);
      });
  }

  const options = args[0];
  return async (...args: Parameters<NextMiddleware>) =>
    handleMiddleware(args[0], options);
}

export default withAuth;
