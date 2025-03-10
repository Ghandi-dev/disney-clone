import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import QueryProvider from "./query-provider";

export const metadata: Metadata = {
  title: "Dinesy+ Clone",
  description: "For Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-white dark:bg-[#1A1C29]`}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
