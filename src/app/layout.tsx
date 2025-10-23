import "./globals.css";
import "./magic-bento.css";
import "./profile-card.css";
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

export const metadata: Metadata = {
  title: "Arjun Sridhar — Portfolio",
  description: "Full-stack developer portfolio.",
};

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <body className={`bg-[#0a0a0a] text-white`}>
        {children}
      </body>
    </html>
  );
}
