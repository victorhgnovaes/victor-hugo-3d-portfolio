"use client";

import { useSyncExternalStore } from "react";
import { getExperienceSnapshot, subscribeToExperience } from "@/lib/experience/timeline-store";

const getActiveChapter = () => getExperienceSnapshot().activeChapter;

export function useActiveChapter() {
  return useSyncExternalStore(subscribeToExperience, getActiveChapter, () => "hero");
}
