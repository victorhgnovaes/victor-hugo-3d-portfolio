"use client";

import { useEffect, useState } from "react";
import { decideQuality, type DeviceCapabilities, type QualityDecision } from "@/lib/experience/quality";

type NavigatorHints = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string; addEventListener?: (type: string, listener: () => void) => void; removeEventListener?: (type: string, listener: () => void) => void };
  deviceMemory?: number;
};

const initialDecision: QualityDecision = { tier: "low", layer: "static", maxDpr: 1, targetFps: 0, reason: "ssr" };
let cachedWebGLSupport: boolean | undefined;

function supportsWebGL() {
  if (cachedWebGLSupport !== undefined) return cachedWebGLSupport;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  const supported = Boolean(context);
  const loseContext = context && "getExtension" in context ? context.getExtension("WEBGL_lose_context") : null;
  loseContext?.loseContext();
  cachedWebGLSupport = supported;
  return cachedWebGLSupport;
}

export function useAdaptiveQuality() {
  const [decision, setDecision] = useState<QualityDecision>(initialDecision);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const hints = navigator as NavigatorHints;
    const evaluate = () => {
      const capabilities: DeviceCapabilities = {
        reducedMotion: reducedMotion.matches,
        saveData: Boolean(hints.connection?.saveData),
        effectiveType: hints.connection?.effectiveType,
        deviceMemory: hints.deviceMemory,
        hardwareConcurrency: navigator.hardwareConcurrency || 2,
        coarsePointer: coarsePointer.matches,
        viewportWidth: window.innerWidth,
        webgl: supportsWebGL(),
        devicePixelRatio: window.devicePixelRatio || 1,
      };
      setDecision(decideQuality(capabilities));
    };
    evaluate();
    reducedMotion.addEventListener("change", evaluate);
    coarsePointer.addEventListener("change", evaluate);
    hints.connection?.addEventListener?.("change", evaluate);
    window.addEventListener("resize", evaluate, { passive: true });
    return () => {
      reducedMotion.removeEventListener("change", evaluate);
      coarsePointer.removeEventListener("change", evaluate);
      hints.connection?.removeEventListener?.("change", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  return decision;
}
