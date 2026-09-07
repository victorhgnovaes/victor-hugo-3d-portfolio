"use client";

import { useEffect } from "react";
import { useExperienceQuality } from "./AdaptiveQualityProvider";

export default function HeroPortalMotion() {
  const { portalEnabled } = useExperienceQuality();

  useEffect(() => {
    const journey = document.getElementById("top");
    if (!journey || !portalEnabled) return;
    let disposed = false;
    let cleanup: () => void = () => undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (disposed) return;
      const gsap = gsapModule.gsap;
      gsap.registerPlugin(triggerModule.ScrollTrigger);
      journey.classList.add("portalEnabled");
      const context = gsap.context(() => {
        gsap.timeline({ scrollTrigger: { trigger: journey, start: "top top", end: "bottom bottom", scrub: 0.75 } })
          .to(".heroMeta", { opacity: 0, y: -22, duration: 0.16 }, 0.08)
          .to(".heroCopy", { opacity: 0, scale: 0.92, filter: "blur(8px)", duration: 0.3 }, 0.3)
          .to(".heroBottom", { opacity: 0, y: 36, duration: 0.22 }, 0.34)
          .fromTo(".portalSignal", { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.43)
          .to(".portalSignal", { opacity: 0, duration: 0.15 }, 0.72);
      }, journey);
      cleanup = () => context.revert();
    }).catch(() => journey.classList.remove("portalEnabled"));

    return () => {
      disposed = true;
      cleanup();
      journey.classList.remove("portalEnabled");
    };
  }, [portalEnabled]);

  return null;
}
