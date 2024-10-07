import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const robotoMono = localFont({
  src: "./fonts/RobotoMonoVF.ttf",
  variable: "--font-roboto-mono",
  weight: "400 500 600 700",
});

const sourceSerif = localFont({
  src: "./fonts/SourceSerif4VF.ttf",
  variable: "--font-source-serif",
  weight: "400 500 600 700",
});

export const metadata: Metadata = {
  title: "Bryan's Archive",
  description: "Bryan's home for music related stuff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} ${sourceSerif.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
