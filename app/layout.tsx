import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@mantine/core/styles.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { mantineTheme } from "@/theme/mantine-theme";
import Header from "@/components/header/Header";
import { LayoutShell } from "@/components/ui/LayoutShell";
import { PageTransition } from "@/components/ui/PageTransition";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  title: "Vaskar - Portfolio",
  description:
    "Portfolio showcasing expertise in MERN stack development, MySQL databases, and creating innovative web solutions.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <style
          dangerouslySetInnerHTML={{
            __html: "html,body{background-color:#1c1c22!important}",
          }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} font-primary`}
        suppressHydrationWarning
        style={{ backgroundColor: "#1c1c22" }}
      >
        <MantineProvider theme={mantineTheme} defaultColorScheme="dark">
          <ToastContainer />
          <LayoutShell>
            <Header />
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
              <PageTransition>{children}</PageTransition>
            </main>
          </LayoutShell>
        </MantineProvider>
      </body>
    </html>
  );
}
