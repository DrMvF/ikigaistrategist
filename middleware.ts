import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: ['/', '/start', '/waitlist', '/sign-in', '/sign-up'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};
