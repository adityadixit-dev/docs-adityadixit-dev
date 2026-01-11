import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import MainHeader from "@/components/ui/root-layout/MainHeader";
import MainFooter from "@/components/ui/root-layout/MainFooter";
import MaxWidthContainer from "@/components/helpers/MaxWidthContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Helpful documentation for projects and other things I have done",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <Providers>
            <div className="min-h-screen flex flex-col justify-between">
              <MainHeader />
              <MaxWidthContainer>
                <main className="w-full h-full prose max-w-none dark:prose-invert">
                  {children}
                </main>
              </MaxWidthContainer>
              <MainFooter />
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
