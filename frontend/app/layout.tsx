import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Library Management",
  description: "Chào mừng các bạn đến với Thư viện của chúng tôi!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans antialiased flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300`}
      >
        <ThemeProvider>
          <AuthProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
