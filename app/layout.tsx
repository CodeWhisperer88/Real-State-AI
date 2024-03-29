import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/toggle-theme";
import Logo from "@/components/ui/logo";
import { Analytics } from "@vercel/analytics/react"
import {
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';
import ClerkProviderWrapper from "@/components/ClerkProviderWrapper";
import { Button } from "@/components/ui/button";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real State AIpp",
  description: "Generated by GRK, this is a search engine for real state properties. It uses AI to search for properties with natural language.",
};



export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProviderWrapper>
            <div className="fixed z-50 pl-40 pt-5 hidden lg:block">
              <Logo />
            </div>

            <div className="fixed top-0 right-0 p-4 flex gap-1 z-50 items-center">
              {!userId &&
                <Button variant="outline">
                  <SignInButton />
                </Button>
              }
              {userId && (
                <UserButton afterSignOutUrl="/" />
              )}
              <div className="hidden lg:block">
                <ModeToggle />
              </div>
            </div>

            <main className="overflow-y-auto h-screen w-full pt-28 pb-32">
              {children}
              <Analytics />
            </main>

          </ClerkProviderWrapper>
        </ThemeProvider>

      </body>
    </html>
  );
}