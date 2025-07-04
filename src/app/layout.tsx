import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./custom.scss";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/toaster";
import Logo from "@/components/logo";
import { appName, legalBusinessName, privacyPolicyUrl, termsOfServiceUrl } from "@/lib/const";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: appName,
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
                  
                </div>
                <div className="flex flex-1 items-center justify-center py-8">
                </div>
              </div>
              <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex-none mx-auto">
                  <Logo />
                </div>
                <div className="flex flex-auto items-center justify-center">
                  <div className="w-full max-w-xs">
                    {children}
                  </div>
                </div>
                <footer className="flex-none flex flex-row justify-center text-xs text-muted-foreground">
                  <div>
                    &copy; {new Date().getFullYear()} {legalBusinessName}
                  </div>
                  <div className="grow"></div>
                  <div className="flex gap-6">
                    <Link
                      href={privacyPolicyUrl}
                      className="text-muted-foreground hover:underline"
                    >
                      Privacy
                    </Link>
                    <Link
                      href={termsOfServiceUrl}
                      className="text-muted-foreground hover:underline"
                    >
                      Terms
                    </Link>
                  </div>
                </footer>
              </div>
            </div>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
