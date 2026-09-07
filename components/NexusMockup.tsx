import Image from "next/image";

export default function NexusMockup() {
  return (
    <div className="software nexusUi nexusShowcaseImage">
      <Image
        src="/nexus-portfolio-showcase.jpeg"
        alt="Interface da plataforma financeira Nexus com landing page e dashboard"
        fill
        sizes="(max-width: 760px) 100vw, 64vw"
      />
      <div className="nexusImageOverlay" />
      <span className="nexusImageTag">REAL PRODUCT INTERFACE / FINTECH</span>
    </div>
  );
}
