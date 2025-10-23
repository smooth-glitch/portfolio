"use client";
import { Press_Start_2P } from "next/font/google";
import TextType from "../../../components/reactbits/TextType";
import styles from "../../../components/reactbits/TextType.module.css";
const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function HeroTitleClient() {
  return (
    <div className={`${pressStart.className} mt-6 text-2xl md:text-{20px}`}>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[92vw]">
      <TextType
        as="h1"
        className={`${styles.pixelFont} ${styles.pixelOutline} ${styles.noWrap}`} // optional outline
        text={[
          "Hi, I’m Arjun — A Software Developer",
          "I Recently Graduated From Queen Mary University Of London (o^‿^o)",
          "Currently Based in Bengaluru, India (¬‿¬)",
          "Actively Seeking Job opportunities (・‿・) ✧",
        ]}
        typingSpeed={100}
        deletingSpeed={50}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="_"
        // Optional niceties:
        variableSpeed={{ min: 40, max: 110 }}
        textColors={["#fff", "#e5e7eb", "#cbd5e1"]}
        startOnVisible={true}
      />
      </div>
    </div>
  );
}
