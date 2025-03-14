import { createNavigation } from "next-intl/navigation";
import { locales, defaultLocale } from "./config";

// Create the navigation object, redirects users to the correct locale, gets the current pathname and router
export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});
