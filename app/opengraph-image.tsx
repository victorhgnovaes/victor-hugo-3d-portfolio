import { ImageResponse } from "next/og";

export const alt = "Victor Hugo — Software Developer, Full Stack e Agentic AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 78px", color: "#f5f7fa", background: "radial-gradient(circle at 78% 28%, #173d7c 0%, #081a38 27%, #040609 65%)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, letterSpacing: 5, color: "#8eaeeb" }}>
        <span>VICTOR HUGO</span><span>PORTFOLIO · 2026</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 116, fontWeight: 800, letterSpacing: -8, lineHeight: .82 }}>DIGITAL</div>
        <div style={{ display: "flex", fontSize: 116, fontWeight: 800, letterSpacing: -8, lineHeight: .82, color: "#5c8fff" }}>UNIVERSE.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#aab5c8" }}>
        <span>SOFTWARE DEVELOPER · FULL STACK · AGENTIC AI</span><span>SP · BR</span>
      </div>
    </div>,
    size,
  );
}
