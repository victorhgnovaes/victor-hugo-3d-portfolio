export type ChapterId = "hero" | "about" | "experience" | "tech" | "nexus" | "ecar" | "black-widow" | "novatech" | "phazion" | "contact";
export type SceneId = "vh" | "rest" | "experience-panel" | "tech-core" | "project-universe" | "finale";
export type QualityTier = "high" | "medium" | "low";

export type ChapterDefinition = {
  id: ChapterId;
  domId: string;
  navLabel: string;
  index: string;
  range: readonly [number, number];
  scene: SceneId;
};

export type ExperienceSnapshot = {
  globalProgress: number;
  activeChapter: ChapterId;
  chapterProgress: number;
  direction: -1 | 0 | 1;
  velocity: number;
  quality: QualityTier;
  reducedMotion: boolean;
};
