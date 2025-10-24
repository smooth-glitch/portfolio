// Server Component (default) - safe to import a Client Component
import dynamic from "next/dynamic";
import PillNav from "../../components/reactbits/PillNav";
import RippleBackgroundClient from "./_components/RippleBackgroundClient";
import HeroTitleClient from "./_components/HeroTitleClient";
import MagicBento from "../../components/reactbits/MagicBento";
import ProfileCardClient from "./_components/ProfileCardClient";
import ScrollReveal from "../../components/reactbits/ScrollReveal";

export default function HomePage() {
  const homeCards = [
    {
      color: "#0b0616",
      title: "Invoyze",
      description: "Flutter + Firebase inventory app",
      label: "Mobile",
    },
    {
      color: "#0b0616",
      title: "CyberMindWorks",
      description: "Next.js + NestJS job portal",
      label: "Web",
    },
    {
      color: "#0b0616",
      title: "ExBranchNet",
      description: "CIFAR-10 custom CNN",
      label: "ML",
    },
    {
      color: "#0b0616",
      title: "EdgeSense",
      description: "IoT predictive maintenance",
      label: "IoT",
    },
    {
      color: "#0b0616",
      title: "API Suite",
      description: "50+ REST APIs, JWT auth",
      label: "Backend",
    },
    {
      color: "#0b0616",
      title: "Portfolio",
      description: "Next + ReactBits animations",
      label: "UI",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Nav: slightly softer colors by default */}
      <PillNav
        socials={[
          {
            type: "linkedin",
            href: "https://www.linkedin.com/in/arjun-sridhar-6466751b7/",
            ariaLabel: "LinkedIn",
          },
          { type: "cv", href: "/cv.pdf", ariaLabel: "Download CV" },
          {
            type: "github",
            href: "https://github.com/smooth-glitch",
            ariaLabel: "GitHub",
          },
        ]}
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "#projects" },
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
        ]}
        activeHref="/"
        initialLoadAnimation
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#14011F"
        pillColor="#1E0933"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#bde8ff" // slightly softer than pure cyan
      />

     
      {/* Background (client-only, visible layer) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <RippleBackgroundClient/>
      </div>

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20">
        {/* 2-col grid; better gaps + stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* Left: title */}
          <div className="order-2 md:order-1">
            <HeroTitleClient />
            {/* optional sub-copy could go here */}
          </div>

          {/* Right: profile card (sticks to the right on desktop, stacks under on mobile) */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <ProfileCardClient
              name="Arjun Sridhar"
              title="Backend Developer"
              handle="smooth-glitch"
              status="Online"
              contactText="Github"
              miniAvatarUrl="https://media.journoportfolio.com/users/405725/images/5803a3a0-dd39-4880-980c-74de9dc5d158.jpg"
              showUserInfo
              showBehindGradient={false}
              innerGradient={`url(public/card-avatar.jpg)`}
              enableTilt
              enableMobileTilt={false}
            />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pb-16 md:pb-20 scroll-mt-24"
      >
        <h2 className="mb-6 md:mb-8 text-center text-2xl md:text-3xl font-bold pixel-heading pixel-heading-rgb">
          {"<Projects />"}
        </h2>
        {/* softer divider glow */}
        <div className="h-1 w-40 md:w-48 mx-auto mb-10 md:mb-12 bg-cyan-400/35 shadow-[0_0_8px_rgba(56,244,255,0.45)] rounded-full" />
        <MagicBento
          cards={homeCards}
          textAutoHide
          enableStars
          enableSpotlight
          enableBorderGlow
          enableTilt
          enableMagnetism
          clickEffect
          spotlightRadius={10}
          particleCount={220} // ↓ particles for less eye fatigue
          glowColor="132, 0, 255"
        />
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-16 md:py-20 scroll-mt-24 text-center"
      >
        <h2 className="text-2xl md:text-3xl mb-6 md:mb-8 tracking-widest text-cyan-300/90 font-bold pixel-heading">
          {"<About />"}
        </h2>
        <div className="h-1 w-40 md:w-48 mx-auto mb-10 md:mb-12 bg-cyan-400/35 shadow-[0_0_8px_rgba(56,244,255,0.45)] rounded-full" />
        <ScrollReveal
          baseOpacity={0}
          enableBlur
          baseRotation={6}
          blurStrength={8}
          containerClassName="max-w-3xl mx-auto text-center leading-relaxed md:leading-[1.7] space-y-5 md:space-y-6 text-white/90"
        >
          {`• (•‿•) Hi, I’m Arjun Sridhar — a backend developer from Bangalore with a passion for building things that actually make sense.

• (⌐■_■) I believe good code isn’t just efficient — it’s clean, resilient, and quietly powerful.

• From crafting REST APIs and predictive models to designing smooth UIs, I love solving real-world problems that matter.

• (￣▽￣)ゞ Outside the terminal, I watch movies, play story-driven games, go on treks, and experiment with tech that blurs art and logic ☆彡`}
        </ScrollReveal>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-16 md:py-20 scroll-mt-24 text-center"
      >
        <h2 className="text-2xl md:text-3xl mb-6 md:mb-8 tracking-widest font-bold pixel-heading pixel-heading-rgb">
          {"<Contact />"}
        </h2>
        <div className="h-1 w-40 md:w-48 mx-auto mb-10 md:mb-12 bg-cyan-400/35 shadow-[0_0_8px_rgba(56,244,255,0.45)] rounded-full" />
        <ScrollReveal
          baseOpacity={0}
          enableBlur
          baseRotation={8}
          blurStrength={8}
          containerClassName="max-w-3xl mx-auto text-left leading-relaxed md:leading-[1.7] text-white/90"
          textClassName="press-start-white"
        >
          {`• (✉️) I’m always open to exciting opportunities, collaborations, or even a casual geek-out about tech, design, or games.

• (★‿★) Whether it’s building something that pushes boundaries, exploring new ideas, or just sharing creative energy — feel free to reach out!

• (⌐■_■) Let’s connect and make something cool together ✦`}
        </ScrollReveal>
      </section>
    </main>
  );
}
