import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arjun Sridhar — Portfolio",
  description: "Full-stack developer portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}
