"use client";

import { useEffect, useRef, useState } from "react";

type RevealState = "idle" | "pending" | "visible";

export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top <= window.innerHeight * 0.9) {
      setState("visible");
      return;
    }
    setState("pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setState("visible");
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -10%", threshold: 0.05 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal reveal--${state} ${className}`}>{children}</div>;
}
