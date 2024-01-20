import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhispeWire",
  description: "Connecting whispers, creating conversations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={albertSans.className}>{children}</body>
    </html>
  );
}
