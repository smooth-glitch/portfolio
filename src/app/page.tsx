// Server Component (default) - safe to import a Client Component
import PillNav from "../../components/reactbits/PillNav";
import RippleGridClient from "../../components/reactbits/RippleGrid";
import HeroTitleClient from "./_components/HeroTitleClient";
import MagicBento from "../../components/reactbits/MagicBento"; // note the path (src/app -> ../../components)
import ProfileCardClient from "./_components/ProfileCardClient";

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
          { label: "Projects", href: "/projects" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
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
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-6"></h2>
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
    </main>
  );
}
