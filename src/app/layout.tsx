// app/layout.tsx
import "./globals.css";
import "./magic-bento.css";
import "./profile-card.css";
import "./PillNav.css";
import "./ScrollReveal.css";
import "./footer.css";

import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import FooterClient from "../../components/FooterClient"; // <-- client wrapper

export const metadata: Metadata = {
  title: "Arjun Sridhar — Portfolio",
  description: "Full-stack developer portfolio.",
};

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pressStart.variable}>
      <body className="bg-[#0a0a0a] text-white" suppressHydrationWarning>
          {children}
          <FooterClient /> {/* Footer renders client-only, no SSR mismatch */}
      
      </body>
    </html>
  );
}
