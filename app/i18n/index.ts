import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "./config";

export default getRequestConfig(async ({ locale }) => {
  // define the locale
  const resolvedLocale = locale || defaultLocale;

  // load the messages for the requested locale
  try {
    const messages = (
      await import(`../../messages/${resolvedLocale}/home.json`)
    ).default;
    return {
      messages,
      locale: resolvedLocale,
    };
  } catch (error) {
    console.error(
      `Failed to load messages for locale: ${resolvedLocale}`,
      error
    );
    // Fallback to default locale if the requested locale's messages can't be loaded
    if (resolvedLocale !== defaultLocale) {
      const defaultMessages = (
        await import(`../../messages/${defaultLocale}/home.json`)
      ).default;
      return {
        messages: defaultMessages,
        locale: defaultLocale,
      };
    }
    throw error;
  }
});
