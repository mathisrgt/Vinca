import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import "./globals.css";

import Providers from "@/app/providers";

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
      <head>
        <link rel="icon" href="favicon.ico" sizes="any" />
      </head>
      <body className={quest.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
