import React from 'react';
import { Inter } from 'next/font/google';
import { Link } from '../i18n/navigation';
import { notFound } from 'next/navigation';
import { locales } from '../i18n/config';
import { NextIntlClientProvider } from 'next-intl';
import '../globals.scss';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

// Folosim tipul corect pentru parametrii de layout
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  
  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale)) notFound();


  let messages;

  // load messages for the requested locale with the selected locale
  try {
    messages = (await import(`../../messages/${locale}/home.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound(); 
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header>
            <nav className="navbar">
              <div className="logo">
                <Link href="/">FactQuest</Link>
              </div>
              <div className="nav-links">
                <Link href="/quiz">Quiz</Link>
                <Link href="/leaderboard">Leaderboard</Link>
                <div className="language-switcher">
                  <Link href="/" locale="en">EN</Link>
                  <Link href="/" locale="ro">RO</Link>
                </div>
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            <p>© {new Date().getFullYear()} FactQuest</p>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 