import dynamic from "next/dynamic";

// Server Component (default) - safe to import a Client Component
import RippleGridClient from "../../components/reactbits/RippleGrid";

export default function HomePage() {
  return (
    <main className="relative min-h-[80svh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <RippleGridClient
          enableRainbow={true}
          gridColor="#d627F5"
          rippleIntensity={0.08}
          gridSize={25}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.6}
          opacity={0.9}
        />
      </div>

      {/* Foreground */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Hi, I’m Arjun — <br></br>
          A Backend Developer
        </h1>
        <p className="mt-5 text-lg text-neutral-300">
          
        </p>
      </section>
    </main>
  );
}

