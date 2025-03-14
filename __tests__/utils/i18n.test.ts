import { locales, defaultLocale } from "../../app/i18n/config";

describe("i18n Configuration", () => {
  test("locales should be defined and contain expected languages", () => {
    expect(locales).toBeDefined();
    expect(Array.isArray(locales)).toBe(true);
    expect(locales.length).toBeGreaterThan(0);
    expect(locales).toContain("en");
    expect(locales).toContain("ro");
  });

  test("defaultLocale should be defined and be a valid locale", () => {
    expect(defaultLocale).toBeDefined();
    expect(typeof defaultLocale).toBe("string");
    expect(defaultLocale).toBe("en");
  });

  test("defaultLocale should be included in locales array", () => {
    expect(locales).toContain(defaultLocale);
  });
});
