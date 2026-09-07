"use client";

import dynamic from "next/dynamic";

const HeroScene3D = dynamic(() => import("./HeroScene3D"), {
  ssr: false,
  loading: () => null,
});

export default function HeroScene({ onUnavailable }: { onUnavailable?: () => void }) {
  return (
    <div className="heroScene" aria-hidden="true">
      <div className="heroSceneFallback" />
      <HeroScene3D onUnavailable={onUnavailable} />
    </div>
  );
}
