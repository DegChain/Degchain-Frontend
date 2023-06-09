import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import MoralisProvider from "@/components/MoralisProvider";
import NotificationProvider from "@/components/NotificationProvider";
export const metadata = {
    title: "DegChain",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <html lang="en">
                    <body className={inter.className}>{children}</body>
                </html>
            </NotificationProvider>
        </MoralisProvider>
    );
}
