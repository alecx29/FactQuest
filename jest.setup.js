import '@testing-library/jest-dom';

// Mock for next/router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock for next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key) => key,
  useLocale: () => 'en',
}));

// Mock for next-intl/navigation
jest.mock('../app/i18n/navigation', () => ({
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
  redirect: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
})); 