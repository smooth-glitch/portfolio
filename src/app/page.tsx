import dynamic from "next/dynamic";

const RippleGrid = dynamic(() => import("../../components/reactbits/RippleGrid"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="relative min-h-[80svh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <RippleGrid
          enableRainbow={false}
          gridColor="#ffffff"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.8}
        />
      </div>

      {/* Foreground content */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Hi, I’m Arjun — Backend/Full-Stack Developer
        </h1>
        <p className="mt-5 text-lg text-neutral-300">
          Node.js • Next.js • Postgres • ReactBits animations
        </p>
      </section>
    </main>
  );
}
