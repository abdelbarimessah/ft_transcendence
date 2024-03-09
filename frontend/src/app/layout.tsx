import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "PONG GAME",
  description: "PONG GAME by abdelbari messah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-nico-moji">
      <link rel="icon" href="/assets/favicon.ico" sizes="any" />
      <head>
        <title>Pong Game</title>
      </head>
      <body className="no-scrollbar bg-color-18 ">
        <Providers>{children}</Providers>
        <Toaster closeButton />
      </body>
    </html>
  );
}
