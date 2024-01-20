import type { Metadata } from "next";
import { Advent_Pro } from "next/font/google";
import "./globals.css";

const adventPro = Advent_Pro({ subsets: ["latin"] });

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
      <body className={adventPro.className}>{children}</body>
    </html>
  );
}
