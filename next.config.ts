import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function config(phase: string): NextConfig {
  // Keep the open development server independent of production builds/tests.
  return { distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next/dev" : ".next/build" };
}
