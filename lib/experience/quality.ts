import type { QualityTier } from "./types";

export type HeroLayer = "webgl" | "video" | "static";

export type DeviceCapabilities = {
  reducedMotion: boolean;
  saveData: boolean;
  effectiveType?: string;
  deviceMemory?: number;
  hardwareConcurrency: number;
  coarsePointer: boolean;
  viewportWidth: number;
  webgl: boolean;
  devicePixelRatio: number;
};

export type QualityDecision = {
  tier: QualityTier;
  layer: HeroLayer;
  maxDpr: 1 | 1.25 | 1.5;
  targetFps: 0 | 30 | 60;
  reason: string;
};

export function decideQuality(capabilities: DeviceCapabilities): QualityDecision {
  const constrainedNetwork = ["slow-2g", "2g"].includes(capabilities.effectiveType ?? "");
  if (capabilities.reducedMotion || capabilities.saveData || constrainedNetwork) {
    return { tier: "low", layer: "static", maxDpr: 1, targetFps: 0, reason: "accessibility-or-data" };
  }
  if (!capabilities.webgl) {
    return { tier: "medium", layer: "video", maxDpr: 1, targetFps: 30, reason: "webgl-unavailable" };
  }
  const constrainedDevice = capabilities.viewportWidth <= 760
    || capabilities.coarsePointer
    || (capabilities.deviceMemory !== undefined && capabilities.deviceMemory <= 4)
    || capabilities.hardwareConcurrency <= 4
    || capabilities.effectiveType === "3g";
  if (constrainedDevice) {
    return { tier: "medium", layer: "webgl", maxDpr: 1, targetFps: 30, reason: "lightweight-webgl" };
  }
  return {
    tier: "high",
    layer: "webgl",
    maxDpr: capabilities.devicePixelRatio <= 1 ? 1 : capabilities.devicePixelRatio <= 1.25 ? 1.25 : 1.5,
    targetFps: 60,
    reason: "capable-device",
  };
}
