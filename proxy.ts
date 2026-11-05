import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es", "pt"];
const defaultLocale = "es";

// export const config = {
//   matcher: ['/', '/(es|pt)/:path*']
// }

function getLocale(request: NextRequest) {
  const headers = Object.fromEntries(request.headers.entries());
  // Negotiator returns ["*"] when the request carries no Accept-Language header,
  // and match() throws on "*" because it is not a valid language tag.
  const languages = new Negotiator({ headers })
    .languages()
    .filter((language) => language !== "*");

  if (languages.length === 0) return defaultLocale;

  try {
    return match(languages, locales, defaultLocale);
  } catch {
    // A malformed Accept-Language must not take the page down.
    return defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    "/((?!_next|api|favicon.ico|.*\\.).*)",
  ],
};
