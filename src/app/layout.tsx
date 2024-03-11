import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DBoard Upload",
  description: "SIMPLY UPLOAD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
