import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "فرم کوئرا",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa-IR">
      <body>{children}</body>
    </html>
  );
}
