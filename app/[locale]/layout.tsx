import React from 'react';
import { Inter } from 'next/font/google';
import { Link } from '../i18n/navigation';
import { notFound } from 'next/navigation';
import { locales } from '../i18n/config';
import { NextIntlClientProvider } from 'next-intl';
import { Metadata, Viewport } from 'next';
import '../globals.scss';

const inter = Inter({ subsets: ['latin'] });

// Define layout params type
interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

// Define viewport separately as recommended by Next.js
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Generate dynamic metadata based on locale
export async function generateMetadata(props: { 
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {

  const params = await Promise.resolve(props.params);
  const locale = params.locale;
  
  // Validate locale
  if (!locales.includes(locale)) return notFound();
  
  try {
    await import(`../../messages/${locale}/home.json`);
  } catch (error) {
    console.error(`Failed to load messages for metadata: ${locale}`, error);
    return {
      title: 'FactQuest - Learn Through Quizzes',
      description: 'Improve your knowledge with interactive quizzes on various topics',
    };
  }
 
  // Return localized metadata
  return {
    title: locale === 'ro' ? 'FactQuest - Învață prin Quiz-uri' : 'FactQuest - Learn Through Quizzes',
    description: locale === 'ro' 
      ? 'Îmbunătățește-ți cunoștințele cu quiz-uri interactive pe diverse teme' 
      : 'Improve your knowledge with interactive quizzes on various topics',
  };
}

export default async function RootLayout(props: RootLayoutProps) {
  const params = await Promise.resolve(props.params);
  const locale = params.locale;
  const { children } = props;
  
  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale)) notFound();

  let messages;

  // Load messages for the requested locale
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