import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  if (
    userId &&
    req.nextUrl.pathname === "/onboarding"
  ) {
    const redirectUrl = new URL("/organization", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (
    userId &&
    !orgId &&
    req.nextUrl.pathname !== "/organization" &&
    req.nextUrl.pathname !== "/"
  ) {
    const redirectUrl = new URL("/organization", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
