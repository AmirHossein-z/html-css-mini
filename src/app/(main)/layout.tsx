import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "html css mini app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
