import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/toaster";
import Logo from "@/components/logo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuthFire",
  description: "Next.js authentication boilerplate with Firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="grid min-h-svh lg:grid-cols-2">
              <div className="bg-primary text-primary-foreground hidden lg:block flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                  <Logo />
                </div>
                <div className="flex flex-1 items-center justify-center py-8">
                </div>
              </div>
              <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="mx-auto lg:hidden">
                  <Logo />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <div className="w-full max-w-xs">
                    {children}
                    <Toaster />
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
