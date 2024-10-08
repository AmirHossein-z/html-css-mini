import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "wave song",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black h-screen w-screen">{children}</body>
    </html>
  );
}
