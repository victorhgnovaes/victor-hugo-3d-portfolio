import { describe, expect, it, vi } from "vitest";
import { getExperienceSnapshot, subscribeToExperience, subscribeToExperienceFrame, updateExperienceSnapshot } from "../lib/experience/timeline-store";

describe("experience timeline store", () => {
  it("updates frame consumers without forcing semantic UI notifications", () => {
    const semanticListener = vi.fn();
    const frameListener = vi.fn();
    const unsubscribeSemantic = subscribeToExperience(semanticListener);
    const unsubscribeFrame = subscribeToExperienceFrame(frameListener);

    updateExperienceSnapshot({ globalProgress: 0.4 });
    expect(getExperienceSnapshot().globalProgress).toBe(0.4);
    expect(frameListener).toHaveBeenCalledOnce();
    expect(semanticListener).not.toHaveBeenCalled();

    updateExperienceSnapshot({ activeChapter: "experience" }, true);
    expect(semanticListener).toHaveBeenCalledOnce();
    unsubscribeSemantic();
    unsubscribeFrame();
  });

  it("stops delivering updates after cleanup", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToExperienceFrame(listener);
    unsubscribe();
    updateExperienceSnapshot({ velocity: 10 });
    expect(listener).not.toHaveBeenCalled();
  });
});
