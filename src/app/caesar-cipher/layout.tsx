import type { Metadata } from "next";
import "../globals.css";
// import localFont from "next/font/local";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "caesar cipher",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa-IR">
      <body className={`bg-[#252A34] ${roboto.className}`}>{children}</body>
    </html>
  );
}
