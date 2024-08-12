import type { Metadata } from "next";
import "../globals.css";
import { Vazirmatn } from "next/font/google";

export const metadata: Metadata = {
  title: "select courses uni",
};

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa-IR">
      <body className={`${vazir.className} bg-gray-950 w-screen h-screen`}>
        {children}
      </body>
    </html>
  );
}
