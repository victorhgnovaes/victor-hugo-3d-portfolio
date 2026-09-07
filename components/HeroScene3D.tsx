"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;

#define MAX_STEPS 68
#define FAR 8.0

mat2 rotate2d(float angle) {
  float s = sin(angle), c = cos(angle);
  return mat2(c, -s, s, c);
}

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float scene(vec3 p) {
  p.xz *= rotate2d(0.35 + time * 0.08);
  p.xy *= rotate2d(-0.48 + sin(time * 0.16) * 0.14);
  float core = sdTorus(p, vec2(1.0, 0.055));

  vec3 q = p;
  q.yz *= rotate2d(1.05);
  float orbit = sdTorus(q, vec2(1.34, 0.018));

  vec3 r = p;
  r.xz *= rotate2d(1.45);
  r.xy *= rotate2d(-0.72);
  float orbitTwo = sdTorus(r, vec2(1.62, 0.012));
  return min(core, min(orbit, orbitTwo));
}

vec3 normalAt(vec3 p) {
  vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(
    scene(p + e.xyy) - scene(p - e.xyy),
    scene(p + e.yxy) - scene(p - e.yxy),
    scene(p + e.yyx) - scene(p - e.yyx)
  ));
}

float raymarch(vec3 ro, vec3 rd) {
  float distanceTravelled = 0.0;
  for (int i = 0; i < MAX_STEPS; i++) {
    float distanceToScene = scene(ro + rd * distanceTravelled);
    distanceTravelled += distanceToScene;
    if (abs(distanceToScene) < 0.001 || distanceTravelled > FAR) break;
  }
  return distanceTravelled;
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
  uv.x += 0.2;
  vec3 ro = vec3(0.0, 0.0, 3.7);
  vec3 rd = normalize(vec3(uv, -1.8));
  float travelled = raymarch(ro, rd);
  vec3 color = vec3(0.0);

  if (travelled < FAR) {
    vec3 p = ro + rd * travelled;
    vec3 normal = normalAt(p);
    vec3 lightDirection = normalize(vec3(-0.5, 0.8, 1.2));
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float rim = pow(1.0 - max(dot(normal, -rd), 0.0), 2.4);
    color = vec3(0.06, 0.24, 0.68) * (0.3 + diffuse * 1.35);
    color += vec3(0.28, 0.62, 1.0) * rim * 1.6;
  }

  vec2 starGrid = floor((uv + time * 0.002) * 24.0);
  vec2 starCell = fract(uv * 24.0) - 0.5;
  float star = step(0.988, hash21(starGrid)) * smoothstep(0.09, 0.0, length(starCell));
  color += vec3(0.35, 0.58, 1.0) * star * 0.8;
  color += vec3(0.025, 0.08, 0.18) * (0.25 / max(length(uv) - 0.08, 0.25));
  gl_FragColor = vec4(color, max(max(color.r, color.g), color.b));
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function HeroScene3D({ onUnavailable }: { onUnavailable?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" });
    if (!gl) {
      onUnavailable?.();
      return;
    }

    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      if (program) gl.deleteProgram(program);
      onUnavailable?.();
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      onUnavailable?.();
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "resolution");
    const time = gl.getUniformLocation(program, "time");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let frame = 0;
    let start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const render = (now: number) => {
      resize();
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, reduceMotion.matches ? 0 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && !document.hidden && !reduceMotion.matches) frame = requestAnimationFrame(render);
    };

    const drawOrResume = () => {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden && !reduceMotion.matches) {
        start = performance.now();
        frame = requestAnimationFrame(render);
      } else if (visible) {
        render(0);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      drawOrResume();
    });
    observer.observe(canvas);
    const handleContextLoss = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      onUnavailable?.();
    };
    canvas.addEventListener("webglcontextlost", handleContextLoss);
    document.addEventListener("visibilitychange", drawOrResume);
    reduceMotion.addEventListener("change", drawOrResume);
    window.addEventListener("resize", drawOrResume, { passive: true });
    render(0);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLoss);
      document.removeEventListener("visibilitychange", drawOrResume);
      reduceMotion.removeEventListener("change", drawOrResume);
      window.removeEventListener("resize", drawOrResume);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [onUnavailable]);

  return <canvas ref={canvasRef} className="heroSceneCanvas" />;
}
