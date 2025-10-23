// Server Component (default) - safe to import a Client Component
import RippleGridClient from "../../components/reactbits/RippleGrid";
import HeroTitleClient from "./_components/HeroTitleClient";
import MagicBento from "../../components/reactbits/MagicBento"; // note the path (src/app -> ../../components)

export default function HomePage() {

  const homeCards = [
    { color: "#0b0616", title: "Invoyze",        description: "Flutter + Firebase inventory app", label: "Mobile" },
    { color: "#0b0616", title: "CyberMindWorks", description: "Next.js + NestJS job portal",     label: "Web" },
    { color: "#0b0616", title: "ExBranchNet",    description: "CIFAR-10 custom CNN",             label: "ML" },
    { color: "#0b0616", title: "EdgeSense",      description: "IoT predictive maintenance",      label: "IoT" },
    { color: "#0b0616", title: "API Suite",      description: "50+ REST APIs, JWT auth",         label: "Backend" },
    { color: "#0b0616", title: "Portfolio",      description: "Next + ReactBits animations",     label: "UI" },
  ];

  return (
    <main className="relative min-h-[80svh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <RippleGridClient
          enableRainbow={false}
          gridColor="#d627F5"
          rippleIntensity={0.02}
          gridSize={40}
          gridThickness={20}
          mouseInteraction={true}
          mouseInteractionRadius={1.6}
          opacity={0.9}
        />
      </div>

      {/* Foreground */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
        <HeroTitleClient />
        </h1>
        <p className="mt-5 text-lg text-neutral-300">
          
        </p>
      </section>
      <br></br>
      
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
          glowColor="132, 0, 255"   // RGB, no '#'
        />
      </section>

    </main>
  );
}

