import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientsLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flex Living - Reviews Dashboard",
  description: "Property reviews management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
