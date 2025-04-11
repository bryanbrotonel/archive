import { Metadata } from "next";
import GlobalLayout from "./../globalLayout";

export const metadata: Metadata = {
  title: "Bryan's Archive",
  description: "Bryan's home for music related stuff.",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalLayout>
      {children}
    </GlobalLayout>
  );
}
