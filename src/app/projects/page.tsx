import MagicBento from "../../../components/reactbits/MagicBento";

const projects = [
  { color: "#0b0616", title: "Invoyze", description: "Flutter + Firebase inventory app", label: "Mobile" },
  { color: "#0b0616", title: "CyberMindWorks", description: "Next.js + NestJS job portal", label: "Web" },
  { color: "#0b0616", title: "ExBranchNet", description: "CIFAR-10 custom CNN", label: "ML" },
  { color: "#0b0616", title: "EdgeSense", description: "IoT predictive maintenance", label: "IoT" },
  { color: "#0b0616", title: "API Suite", description: "50+ REST APIs, JWT auth", label: "Backend" },
  { color: "#0b0616", title: "Portfolio", description: "Next + ReactBits animations", label: "UI" },
];

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Projects</h1>
      <MagicBento
        cards={projects}
        textAutoHide
        enableStars
        enableSpotlight
        enableBorderGlow
        enableTilt
        enableMagnetism
         // purple glow color in "r,g,b" (no hash)
        glowColor="132, 0, 255"
        particleCount={12}
        spotlightRadius={300}
        clickEffect
      />
    </main>
  );
}
