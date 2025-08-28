import AppProviders from "./providers";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/widgets/header/ui/Header";
import Footer from "@/widgets/footer/ui/Footer";
import SideMenu from "@/widgets/side-menu/ui/SideMenu";
import "normalize.css";
import "./globals.scss";
const roboto = Roboto({
    subsets: ["cyrillic", "latin"],
    weight: ["300", "400", "600"],
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
                <AppProviders>
                    <Header />
                    <main>{children}</main>
                    <SideMenu />
                    <Footer />
                </AppProviders>
            </body>
        </html>
    );
}
