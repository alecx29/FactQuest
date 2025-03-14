import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./app/i18n/config";

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // The default locale to be used when visiting a non-locale prefixed path
  defaultLocale,
  // This is the strategy used for providing a locale when one is missing
  localePrefix: "as-needed",
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
