import type { ExperienceSnapshot } from "./types";

let snapshot: ExperienceSnapshot = {
  globalProgress: 0,
  activeChapter: "hero",
  chapterProgress: 0,
  direction: 0,
  velocity: 0,
  quality: "low",
  reducedMotion: false,
};

const listeners = new Set<() => void>();
const frameListeners = new Set<() => void>();

export function getExperienceSnapshot() {
  return snapshot;
}

export function updateExperienceSnapshot(next: Partial<ExperienceSnapshot>, notify = false) {
  snapshot = { ...snapshot, ...next };
  frameListeners.forEach((listener) => listener());
  if (notify) listeners.forEach((listener) => listener());
}

export function subscribeToExperience(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function subscribeToExperienceFrame(listener: () => void) {
  frameListeners.add(listener);
  return () => frameListeners.delete(listener);
}
