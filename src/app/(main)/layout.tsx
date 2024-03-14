import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "html css mini app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
