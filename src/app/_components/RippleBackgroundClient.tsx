"use client";

import RippleGrid, { RippleGridProps } from "../../../components/reactbits/RippleGridClient";

export default function RippleBackgroundClient() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <RippleGrid
        enableRainbow={false}
        gridColor="#d627F5"
        rippleIntensity={0.07}
        gridSize={30}
        gridThickness={10}
        mouseInteraction
        mouseInteractionRadius={4}
        opacity={0.2}
      />
    </div>
  );
}
