import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import "./globals.css";

const quest = Questrial({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Vinca",
  description: "Lending protocol with automated LTV and APY using multi-chain data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quest.className}>{children}</body>
    </html>
  );
}
