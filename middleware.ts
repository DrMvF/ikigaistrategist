import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// Welche Routen sollen getrackt werden:
export const config = {
  matcher: [
    // alles außer:
    '/((?!.*\\..*|_next|start|waitlist|sign-in|sign-up).*)',
  ],
};
