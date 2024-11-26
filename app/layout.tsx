import type { Metadata } from 'next';
// import localFont from "next/font/local";
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import 'swiper/css';
import Header from '@/components/header/Header';
import PageTransition from '@/components/transitions/PageTransition';
import StairTransition from '@/components/transitions/StairTransition';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jetbrainsMono',
});

export const metadata: Metadata = {
  title: 'Vaskar .',
  description:
    'Portfolio showcasing expertise in MERN stack development, MySQL databases, and creating innovative web solutions with React, Node.js, and MongoDB.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <Header />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
