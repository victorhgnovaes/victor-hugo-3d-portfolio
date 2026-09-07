"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import type { QualityDecision } from "@/lib/experience/quality";

type AdaptiveQualityContextValue = {
  decision: QualityDecision;
  portalEnabled: boolean;
  reportWebGLFailure: () => void;
};

const AdaptiveQualityContext = createContext<AdaptiveQualityContextValue | null>(null);

export default function AdaptiveQualityProvider({ children }: { children: ReactNode }) {
  const detectedDecision = useAdaptiveQuality();
  const [webglFailed, setWebglFailed] = useState(false);
  const [widePortalViewport, setWidePortalViewport] = useState(false);
  const reportWebGLFailure = useCallback(() => setWebglFailed(true), []);
  const decision = useMemo<QualityDecision>(() => {
    if (!webglFailed || detectedDecision.layer !== "webgl") return detectedDecision;
    return { tier: "medium", layer: "video", maxDpr: 1, targetFps: 30, reason: "webgl-runtime-failure" };
  }, [detectedDecision, webglFailed]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setWidePortalViewport(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const portalEnabled = decision.layer === "webgl" && widePortalViewport;

  return <AdaptiveQualityContext.Provider value={{ decision, portalEnabled, reportWebGLFailure }}>{children}</AdaptiveQualityContext.Provider>;
}

export function useExperienceQuality() {
  const context = useContext(AdaptiveQualityContext);
  if (!context) throw new Error("useExperienceQuality must be used inside AdaptiveQualityProvider");
  return context;
}
