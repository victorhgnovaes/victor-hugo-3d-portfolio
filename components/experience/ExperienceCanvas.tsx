"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ErrorInfo, type ReactNode } from "react";
import { updateExperienceSnapshot } from "@/lib/experience/timeline-store";
import { useExperienceQuality } from "./AdaptiveQualityProvider";

const ExperienceCanvasScene = dynamic(() => import("./ExperienceCanvasScene"), { ssr: false });

class CanvasErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(_error: Error, _info: ErrorInfo) { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function ExperienceCanvas() {
  const { decision, portalEnabled, reportWebGLFailure } = useExperienceQuality();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    updateExperienceSnapshot({ quality: decision.tier, reducedMotion: decision.layer === "static" });
  }, [decision]);

  useEffect(() => {
    if (decision.layer !== "webgl") {
      setReady(false);
      return;
    }
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, [decision.layer]);

  if (decision.layer !== "webgl" || !ready) return null;
  return <div className="experienceCanvas" aria-hidden="true"><CanvasErrorBoundary onError={reportWebGLFailure}><ExperienceCanvasScene maxDpr={decision.maxDpr} portalEnabled={portalEnabled} onUnavailable={reportWebGLFailure} /></CanvasErrorBoundary></div>;
}
