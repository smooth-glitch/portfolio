"use client";
import { Press_Start_2P } from "next/font/google";
import TextType from "../../../components/reactbits/TextType";
import styles from "../../../components/reactbits/TextType.module.css";

const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function HeroTitleClient() {
  return (
    <section
      className={`${pressStart.className} mt-6 flex justify-center items-start text-[20px] md:text-[25px] tracking-wide`}
    >
      <div className="w-full max-w-[850px] text-left leading-relaxed md:leading-[1.5] space-y-2 px-3 md:px-0">
        <TextType
          as="h1"
          className={`${styles.pixelFont} ${styles.pixelOutline} whitespace-pre-line m-0`}
          text={[
            "• Hi, I’m Arjun — A Full-stack Software Developer.",
            
            "• I build fast, reliable web apps with TypeScript, React, and Next.js.",
            
            "• Backend: Node.js, Express, PostgreSQL / Prisma / Mongo, REST / GraphQL.",
            
            "• Frontend: Tailwind, Framer Motion, accessibility, performance tuning.",
            
            "• Obsessed with clean APIs, DX, and automation (Jest, CI/CD pipelines).",
            
            "• This Project Showcases Pixel-neon design with smooth motion — where code meets art.",
            
            "• Queen Mary university(London) graduate → Bengaluru-based engineer.",
            
            "• Cat person ☕ caffeine enjoyer ☁ documentation nerd.",
            
            "• Open to Backend / Full-stack roles — let’s chat.",
          ]}
          continuous
          separator={"\n\n"}        // ensures proper line breaks
          typingSpeed={30}        // normal readable speed
          variableSpeed={{ min: 20, max: 45 }}
          loop={false}
          showCursor={true}
          startOnVisible={true}
          cursorCharacter="_"
        />
      </div>
    </section>
  );
}
