import MagicBento from "../../../components/reactbits/MagicBento";

const aboutCards = [
  { color: "#0a0714", title: "Who I am", description: "Backend/Full-Stack dev from Bengaluru", label: "About" },
  { color: "#0a0714", title: "Stack", description: "Node.js, Next.js, Postgres, Java", label: "Tech" },
  { color: "#0a0714", title: "Experience", description: "Furious Fox — 50+ APIs, JWT, DB perf", label: "Work" },
  { color: "#0a0714", title: "Focus", description: "Systems design, solid DX, clean code", label: "Now" },
  { color: "#0a0714", title: "Interests", description: "AI/ML side projects & tooling", label: "Build" },
  { color: "#0a0714", title: "Contact", description: "Open to roles & collabs", label: "Reach" },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">About</h1>
      <MagicBento
        cards={aboutCards}
        textAutoHide
        enableStars
        enableSpotlight
        enableBorderGlow
        enableTilt
        enableMagnetism
        glowColor="132, 0, 255"
        particleCount={10}
        spotlightRadius={280}
        clickEffect
      />
    </main>
  );
}
