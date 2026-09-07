import { describe, expect, it } from "vitest";
import { decideQuality, type DeviceCapabilities } from "../lib/experience/quality";

const capableDesktop: DeviceCapabilities = {
  reducedMotion: false,
  saveData: false,
  effectiveType: "4g",
  deviceMemory: 8,
  hardwareConcurrency: 8,
  coarsePointer: false,
  viewportWidth: 1440,
  webgl: true,
  devicePixelRatio: 2,
};

describe("decideQuality", () => {
  it("selects the full WebGL experience for capable desktops", () => {
    expect(decideQuality(capableDesktop)).toEqual({ tier: "high", layer: "webgl", maxDpr: 1.5, targetFps: 60, reason: "capable-device" });
  });

  it("never raises the DPR cap above a 1x display", () => {
    expect(decideQuality({ ...capableDesktop, devicePixelRatio: 1 }).maxDpr).toBe(1);
  });

  it.each([
    { reducedMotion: true },
    { saveData: true },
    { effectiveType: "2g" },
    { effectiveType: "slow-2g" },
  ])("uses a zero-animation static layer for accessibility/data constraints: %o", (constraint) => {
    const decision = decideQuality({ ...capableDesktop, ...constraint });
    expect(decision).toMatchObject({ tier: "low", layer: "static", maxDpr: 1, targetFps: 0 });
  });

  it("uses video without creating WebGL when the API is unavailable", () => {
    expect(decideQuality({ ...capableDesktop, webgl: false })).toMatchObject({ tier: "medium", layer: "video", targetFps: 30 });
  });

  it.each([
    { viewportWidth: 760 },
    { coarsePointer: true },
    { deviceMemory: 4 },
    { hardwareConcurrency: 4 },
    { effectiveType: "3g" },
  ])("uses lightweight WebGL on constrained devices when WebGL exists: %o", (constraint) => {
    expect(decideQuality({ ...capableDesktop, ...constraint })).toMatchObject({ tier: "medium", layer: "webgl", maxDpr: 1 });
  });

  it("does not penalize missing optional device hints", () => {
    expect(decideQuality({ ...capableDesktop, deviceMemory: undefined, effectiveType: undefined }).layer).toBe("webgl");
  });
});
