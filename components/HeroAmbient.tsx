"use client";

import { useEffect, useRef } from "react";
import { useExperienceQuality } from "@/components/experience/AdaptiveQualityProvider";

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let nearViewport = false;
    const syncPlayback = () => {
      if (nearViewport && !document.hidden) void video.play().catch(() => undefined);
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      nearViewport = entry.isIntersecting;
      if (nearViewport && !video.src) {
        video.src = "/hero-code-background.mp4";
        video.load();
      }
      syncPlayback();
    }, { rootMargin: "200px" });
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return <div className="heroVideo heroVideoAdaptive" aria-hidden="true">
    <video ref={videoRef} muted loop playsInline preload="none" />
    <span />
  </div>;
}

export default function HeroAmbient() {
  const { decision } = useExperienceQuality();
  if (decision.layer === "video") return <HeroVideo />;
  if (decision.layer === "webgl") return <div className="heroVideo heroAmbientCanvas" aria-hidden="true"><span /></div>;
  return <div className="heroVideo heroAmbientStatic" aria-hidden="true"><span /></div>;
}
