import type { ChapterDefinition, ChapterId } from "./types";

export const chapters = [
  { id: "hero", domId: "top", navLabel: "HOME", index: "01", range: [0, 0.16], scene: "vh" },
  { id: "about", domId: "about", navLabel: "ABOUT", index: "02", range: [0.16, 0.27], scene: "rest" },
  { id: "experience", domId: "career", navLabel: "EXPERIENCE", index: "03", range: [0.27, 0.37], scene: "experience-panel" },
  { id: "tech", domId: "technologies", navLabel: "TECH CORE", index: "04", range: [0.37, 0.47], scene: "tech-core" },
  { id: "nexus", domId: "nexus", navLabel: "NEXUS", index: "05", range: [0.47, 0.57], scene: "project-universe" },
  { id: "ecar", domId: "ecar", navLabel: "ECAR", index: "06", range: [0.57, 0.65], scene: "project-universe" },
  { id: "black-widow", domId: "black-widow", navLabel: "RED ROOM", index: "07", range: [0.65, 0.73], scene: "project-universe" },
  { id: "novatech", domId: "novatech", navLabel: "NOVATECH", index: "08", range: [0.73, 0.81], scene: "project-universe" },
  { id: "phazion", domId: "phazion", navLabel: "PHAZION", index: "09", range: [0.81, 0.91], scene: "project-universe" },
  { id: "contact", domId: "contact", navLabel: "CONTACT", index: "10", range: [0.91, 1], scene: "finale" },
] as const satisfies readonly ChapterDefinition[];

const primaryChapterIds = new Set<ChapterId>(["about", "experience", "nexus", "contact"]);
export const primaryNavigation = chapters.filter(({ id }) => primaryChapterIds.has(id));

export function getChapterAtProgress(progress: number) {
  const normalized = Math.max(0, Math.min(1, progress));
  return chapters.find((chapter, index) => normalized >= chapter.range[0] && (index === chapters.length - 1 ? normalized <= chapter.range[1] : normalized < chapter.range[1])) ?? chapters[0];
}
