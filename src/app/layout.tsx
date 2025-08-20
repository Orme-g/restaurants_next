import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/header/Header";
import "./globals.scss";
const roboto = Roboto({
    subsets: ["cyrillic", "latin"],
    weight: ["400", "600"],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "Weats",
    description: "Find exactly that restaurant",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={roboto.variable}>
                <Header />
                {children}
            </body>
        </html>
    );
}
