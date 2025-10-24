// Server Component (default) - safe to import a Client Component
import PillNav from "../../components/reactbits/PillNav";
import RippleGridClient from "../../components/reactbits/RippleGrid";
import HeroTitleClient from "./_components/HeroTitleClient";
import MagicBento from "../../components/reactbits/MagicBento"; // note the path (src/app -> ../../components)
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
    <main className="relative min-h-screen overflow-hidden">
      {/* Pill Nav */}
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
        initialLoadAnimation={true}
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#14011F" // Deep purple background for nav
        pillColor="#1E0933" // Slightly lighter pill color
        hoveredPillTextColor="#ffffff"
        pillTextColor="#b3eaff" // Cyan text glow tone
      />

      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <RippleGridClient
          enableRainbow={false}
          gridColor="#d627F5"
          rippleIntensity={0.05}
          gridSize={30}
          gridThickness={20}
          mouseInteraction={true}
          mouseInteractionRadius={1.6}
          opacity={0.9}
        />
      </div>

      {/* Foreground */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        {/* Two-column hero: left title, right profile card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            {/* Removed wrapping <h1> to avoid nested H1s; HeroTitleClient renders its own heading */}
            <HeroTitleClient />
            <p className="mt-5 text-lg text-neutral-300"></p>
          </div>

          <div className="flex-1 flex justify-end">
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

      <br />

      {/* Magic Bento section — sits right below the hero */}
      <section
        id="projects"
        className="relative z-10 mx-auto max-w-6xl px-6 pb-24 scroll-mt-24"
      >
        <h2 className="mb-8 text-center text-2xl md:text-3xl font-bold pixel-heading pixel-heading-rgb">
          {"<Projects />"}
        </h2>
        <div className="h-1 w-48 mx-auto mb-12 bg-cyan-400/60 shadow-[0_0_12px_rgba(56,244,255,0.7)] rounded-full"></div>
        <MagicBento
          cards={homeCards}
          textAutoHide
          enableStars
          enableSpotlight
          enableBorderGlow
          enableTilt
          enableMagnetism
          clickEffect
          spotlightRadius={100}
          particleCount={50}
          glowColor="132, 0, 255" // RGB, no '#'
        />
      </section>

      {/* About */}
      <section
        id="about"
        className="relative z-10 mx-auto max-w-5xl px-6 py-24 scroll-mt-24 text-center"
      >
        <h2 className="text-2xl md:text-3xl mb-8 tracking-widest text-cyan-300 font-bold pixel-heading">
          {"<About />"}
        </h2>

        <div className="h-1 w-48 mx-auto mb-12 bg-cyan-400/60 shadow-[0_0_12px_rgba(56,244,255,0.7)] rounded-full"></div>

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={8}
          blurStrength={10}
          containerClassName="max-w-3xl mx-auto text-center leading-relaxed space-y-6"
        >
          {`(•‿•) Hi, I’m Arjun Sridhar — a backend developer from Bangalore with a passion for building things that actually make sense.  
  
(⌐■_■) I believe good code isn’t just efficient — it’s clean, resilient, and quietly powerful.  
  
⚙️ From crafting REST APIs and predictive models to designing smooth UIs, I love solving real-world problems that matter.  
  
(￣▽￣)ゞ Outside the terminal, I watch movies, play story-driven games, go on treks, and experiment with tech that blurs art and logic ☆彡`}
        </ScrollReveal>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative z-10 mx-auto max-w-5xl px-6 py-24 scroll-mt-24 text-center"
      >
        <h2 className="text-2xl md:text-3xl mb-8 tracking-widest font-bold pixel-heading pixel-heading-rgb">
          {"<Contact />"}
        </h2>

        <div className="h-1 w-48 mx-auto mb-12 bg-cyan-400/60 shadow-[0_0_12px_rgba(56,244,255,0.7)] rounded-full"></div>

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={10}
          blurStrength={10}
          containerClassName="max-w-3xl mx-auto text-left leading-relaxed"
          textClassName="press-start-white"
        >
          {`(✉️) I’m always open to exciting opportunities, collaborations, or even a casual geek-out about tech, design, or games.  
(★‿★) Whether it’s building something that pushes boundaries, exploring new ideas, or just sharing creative energy — feel free to reach out!  
(⌐■_■) Let’s connect and make something cool together ✦`}
        </ScrollReveal>

        <a
          href="mailto:arjunsridhar445@gmail.com"
          className="inline-block mt-10 text-lg md:text-xl font-bold pixel-heading pixel-heading-rgb transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(56,244,255,0.8)]"
        >
          arjunsridhar445@gmail.com
        </a>
      </section>
    </main>
  );
}
