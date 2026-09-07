"use client";

import { useEffect } from "react";
import { chapters } from "@/lib/experience/chapters";
import { getExperienceSnapshot, updateExperienceSnapshot } from "@/lib/experience/timeline-store";

type ChapterBounds = {
  id: (typeof chapters)[number]["id"];
  top: number;
  bottom: number;
};

export default function ExperienceController() {
  useEffect(() => {
    let bounds: ChapterBounds[] = [];
    let frame = 0;
    let previousScroll = window.scrollY;
    let previousTime = performance.now();

    const measure = () => {
      bounds = chapters.flatMap(({ id, domId }) => {
        const element = document.getElementById(domId);
        if (!element) return [];
        const rect = element.getBoundingClientRect();
        return [{ id, top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY }];
      });
    };

    const update = () => {
      frame = 0;
      const now = performance.now();
      const scroll = window.scrollY;
      const viewportCenter = scroll + window.innerHeight * 0.5;
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const globalProgress = Math.max(0, Math.min(1, scroll / scrollable));
      const containing = bounds.find(({ top, bottom }) => viewportCenter >= top && viewportCenter < bottom);
      const activeBounds = containing ?? bounds.reduce<ChapterBounds | undefined>((nearest, current) => {
        if (!nearest) return current;
        const nearestDistance = Math.min(Math.abs(viewportCenter - nearest.top), Math.abs(viewportCenter - nearest.bottom));
        const currentDistance = Math.min(Math.abs(viewportCenter - current.top), Math.abs(viewportCenter - current.bottom));
        return currentDistance < nearestDistance ? current : nearest;
      }, undefined);
      const activeChapter = activeBounds?.id ?? "hero";
      const chapterLength = Math.max(1, (activeBounds?.bottom ?? 1) - (activeBounds?.top ?? 0) - window.innerHeight);
      const chapterProgress = Math.max(0, Math.min(1, (scroll - (activeBounds?.top ?? 0)) / chapterLength));
      const elapsed = Math.max(1, now - previousTime);
      const previousActive = getExperienceSnapshot().activeChapter;

      updateExperienceSnapshot({
        globalProgress,
        activeChapter,
        chapterProgress,
        direction: scroll === previousScroll ? 0 : scroll > previousScroll ? 1 : -1,
        velocity: ((scroll - previousScroll) / elapsed) * 1000,
      }, activeChapter !== previousActive);
      previousScroll = scroll;
      previousTime = now;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const measureAndUpdate = () => {
      measure();
      requestUpdate();
    };

    const resizeObserver = new ResizeObserver(measureAndUpdate);
    resizeObserver.observe(document.documentElement);
    measureAndUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measureAndUpdate, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measureAndUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
