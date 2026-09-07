import Image from "next/image";

export default function EcarMockup() {
  return (
    <div className="software ecarUi ecarShowcaseImage">
      <Image
        src="/ecar-portfolio-showcase.png"
        alt="Interface do ECAR Automotive CRM com painel administrativo, clientes, propostas e comissões"
        fill
        sizes="(max-width: 760px) 100vw, 64vw"
      />
      <div className="ecarImageOverlay" />
      <span className="ecarImageTag">REAL PRODUCT INTERFACE / AUTOMOTIVE CRM</span>
    </div>
  );
}
