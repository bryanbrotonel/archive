import { Metadata } from "next";
import GlobalLayout from "../ui/globalLayout";

export const metadata: Metadata = {
  title: "Bryan's Archive | Dashboard",
  description: "Bryan's dashboard for music related stuff.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalLayout darkMode={true}>
      {children}
    </GlobalLayout>
  );
}
