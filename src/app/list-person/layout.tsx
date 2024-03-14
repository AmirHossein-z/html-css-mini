import type { Metadata } from "next";
import "./../globals.css";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "list person",
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
    <html lang="en">
      <body
        className={`bg-cover bg-no-repeat h-screen bg-sky-cloudy ${roboto.className}`}
      >
        {children}
      </body>
    </html>
  );
}
