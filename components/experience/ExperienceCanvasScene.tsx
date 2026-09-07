"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Group, MathUtils, Mesh, Vector3 } from "three";
import { getExperienceSnapshot, subscribeToExperienceFrame } from "@/lib/experience/timeline-store";

type Piece = { size: [number, number, number]; assembled: [number, number, number]; scattered: [number, number, number]; rotation: [number, number, number] };
const pieces: Piece[] = [
  { size: [.3, 2.45, .42], assembled: [-1.12, .04, 0], scattered: [-4.4, 2.2, -3.6], rotation: [0, 0, .36] },
  { size: [.3, 2.45, .42], assembled: [-.38, .04, 0], scattered: [-2.8, -2.4, 2.8], rotation: [0, 0, -.36] },
  { size: [.3, 2.65, .42], assembled: [.48, 0, 0], scattered: [3.8, 2.7, -2.2], rotation: [0, 0, 0] },
  { size: [.3, 2.65, .42], assembled: [1.58, 0, 0], scattered: [4.2, -2.1, 3.4], rotation: [0, 0, 0] },
  { size: [1.35, .27, .42], assembled: [1.03, 0, .02], scattered: [.8, 3.4, -4.5], rotation: [0, 0, 0] },
  { size: [.08, 1.3, .12], assembled: [-2.25, 0, -.65], scattered: [-4.8, -.4, -1.8], rotation: [0, 0, 0] },
  { size: [.08, 1.3, .12], assembled: [2.65, 0, -.65], scattered: [4.9, .5, -2.6], rotation: [0, 0, 0] },
];

function ContextGuard({ onUnavailable }: { onUnavailable: () => void }) {
  const { gl, invalidate } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onUnavailable(); };
    const visible = () => { if (!document.hidden) invalidate(); };
    const unsubscribe = subscribeToExperienceFrame(invalidate);
    canvas.addEventListener("webglcontextlost", lost);
    document.addEventListener("visibilitychange", visible);
    return () => { unsubscribe(); canvas.removeEventListener("webglcontextlost", lost); document.removeEventListener("visibilitychange", visible); };
  }, [gl, invalidate, onUnavailable]);
  return null;
}

function HeroAssembly({ portalEnabled }: { portalEnabled: boolean }) {
  const rig = useRef<Group>(null);
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);
  const pieceRefs = useRef<Array<Mesh | null>>([]);
  const assembledVectors = useMemo(() => pieces.map((piece) => new Vector3(...piece.assembled)), []);
  const scatteredVectors = useMemo(() => pieces.map((piece) => new Vector3(...piece.scattered)), []);

  useFrame(({ camera, clock, invalidate }, delta) => {
    const snapshot = getExperienceSnapshot();
    const heroActive = snapshot.activeChapter === "hero";
    const raw = portalEnabled && heroActive ? snapshot.chapterProgress : 0;
    const assembly = heroActive && portalEnabled ? .12 + MathUtils.smootherstep(raw, .04, .76) * .88 : 1;
    const passage = heroActive && portalEnabled ? MathUtils.smoothstep(raw, .82, 1) : 0;
    pieceRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const stagger = MathUtils.clamp((assembly * 1.32) - index * .045, 0, 1);
      mesh.position.lerpVectors(scatteredVectors[index], assembledVectors[index], MathUtils.smootherstep(stagger, 0, 1));
      mesh.rotation.x = (1 - stagger) * (.55 + index * .11);
      mesh.rotation.y = (1 - stagger) * (index % 2 ? -.8 : .8);
      mesh.rotation.z = pieces[index].rotation[2] + (1 - stagger) * (index % 2 ? -.32 : .32);
    });
    if (rig.current) {
      const projectChapter = ["nexus", "ecar", "black-widow", "novatech", "phazion"].includes(snapshot.activeChapter);
      const targetScale = heroActive ? .9 + assembly * .12 : snapshot.activeChapter === "about" ? .24 : snapshot.activeChapter === "contact" ? .82 : projectChapter ? .14 : .1;
      const targetPosition = snapshot.activeChapter === "about" ? [-3.1, 1.55, -4.2] : snapshot.activeChapter === "contact" ? [0, 0, -.5] : projectChapter ? [3.6, -1.8, -5] : heroActive ? [.35, .05, 0] : [-4, 2, -5.5];
      const nextScale = MathUtils.damp(rig.current.scale.x, targetScale, 3.2, delta);
      rig.current.scale.setScalar(nextScale);
      rig.current.position.x = MathUtils.damp(rig.current.position.x, targetPosition[0], 3.2, delta);
      rig.current.position.y = MathUtils.damp(rig.current.position.y, targetPosition[1], 3.2, delta);
      rig.current.position.z = MathUtils.damp(rig.current.position.z, targetPosition[2], 3.2, delta);
      rig.current.visible = nextScale > .006;
      rig.current.rotation.y = MathUtils.damp(rig.current.rotation.y, heroActive ? Math.sin(clock.elapsedTime * .22) * .035 + passage * .12 : .38, 3.2, delta);
      rig.current.rotation.x = heroActive ? Math.sin(clock.elapsedTime * .16) * .018 : 0;
      if (Math.abs(nextScale - targetScale) > .003) invalidate();
    }
    if (ringA.current && ringB.current) {
      ringA.current.rotation.z = clock.elapsedTime * .06 + assembly * .55;
      ringB.current.rotation.z = -clock.elapsedTime * .045 - assembly * .38;
      const opening = 1 + passage * .48;
      ringA.current.scale.setScalar(opening);
      ringB.current.scale.setScalar(opening);
    }
    camera.position.x = MathUtils.damp(camera.position.x, heroActive ? passage * .16 : 0, 4, delta);
    camera.position.z = MathUtils.damp(camera.position.z, heroActive ? 7 - passage * 11.5 : 7, 4.5, delta);
    if (!document.hidden && snapshot.activeChapter === "hero" && (raw < .995 || assembly < .999)) invalidate();
  });

  return <group ref={rig} position={[.35, .05, 0]}>
    <mesh ref={ringA}><torusGeometry args={[2.65, .022, 8, 96]} /><meshBasicMaterial color="#6f9fff" toneMapped={false} /></mesh>
    <mesh ref={ringB} rotation={[.22, .18, 0]}><torusGeometry args={[2.25, .012, 6, 72]} /><meshBasicMaterial color="#315da8" toneMapped={false} /></mesh>
    {pieces.map((piece, index) => <mesh key={index} ref={(mesh) => { pieceRefs.current[index] = mesh; }} position={piece.scattered}>
      <boxGeometry args={piece.size} />
      <meshStandardMaterial color={index < 5 ? "#426eb5" : "#203a67"} emissive={index < 5 ? "#102b59" : "#08162e"} emissiveIntensity={index < 5 ? .9 : .45} metalness={.78} roughness={.24} />
    </mesh>)}
    <mesh position={[0, 0, -1.1]}><circleGeometry args={[1.65, 64]} /><meshBasicMaterial color="#071a38" transparent opacity={.38} /></mesh>
  </group>;
}

function ChapterUniverse() {
  const about = useRef<Group>(null);
  const experience = useRef<Group>(null);
  const tech = useRef<Group>(null);
  const project = useRef<Group>(null);
  const nexus = useRef<Group>(null);
  const ecar = useRef<Group>(null);
  const redRoom = useRef<Group>(null);
  const clinic = useRef<Group>(null);
  const phazion = useRef<Group>(null);
  const moon = useRef<Mesh>(null);

  useFrame(({ invalidate, size }, delta) => {
    const { activeChapter, chapterProgress, reducedMotion } = getExperienceSnapshot();
    const responsiveScale = size.width < 1024 ? .9 : size.width < 1200 ? 1.03 : size.width < 1500 ? 1.16 : 1.32;
    const targets = {
      about: activeChapter === "about" ? responsiveScale : .001,
      experience: activeChapter === "experience" ? responsiveScale : .001,
      tech: activeChapter === "tech" ? responsiveScale : .001,
      project: size.width >= 900 && ["nexus", "ecar", "black-widow", "novatech", "phazion"].includes(activeChapter) ? responsiveScale * .9 : .001,
    };
    let settling = false;
    const settle = (group: Group | null, target: number) => {
      if (!group) return;
      const next = MathUtils.damp(group.scale.x, target, reducedMotion ? 20 : 4.2, delta);
      group.scale.setScalar(next);
      group.visible = next > .006;
      settling ||= Math.abs(next - target) > .004;
    };
    settle(about.current, targets.about);
    settle(experience.current, targets.experience);
    settle(tech.current, targets.tech);
    settle(project.current, targets.project);
    settle(nexus.current, activeChapter === "nexus" ? 1 : .001);
    settle(ecar.current, activeChapter === "ecar" ? 1 : .001);
    settle(redRoom.current, activeChapter === "black-widow" ? 1 : .001);
    settle(clinic.current, activeChapter === "novatech" ? 1 : .001);
    settle(phazion.current, activeChapter === "phazion" ? 1 : .001);
    if (about.current) {
      about.current.rotation.y = -.12 + chapterProgress * .18;
      about.current.position.y = -.35 + chapterProgress * .18;
    }
    if (experience.current) {
      experience.current.rotation.y = -.26 + chapterProgress * .36;
      experience.current.position.z = -1.2 + chapterProgress * 1.2;
      experience.current.children.forEach((child, index) => { child.position.z = (index - 2) * .3 * (1 - chapterProgress); });
    }
    if (tech.current) tech.current.rotation.y = chapterProgress * .8;
    if (project.current) {
      project.current.rotation.y = 0;
      project.current.position.z = .38;
      project.current.position.y = activeChapter === "phazion" ? -.12 : 0;
      const sideX = size.width < 1200 ? 1.72 : 2.05;
      const targetX = activeChapter === "ecar" || activeChapter === "phazion" ? -sideX : sideX;
      project.current.position.x = MathUtils.damp(project.current.position.x, targetX, reducedMotion ? 20 : 2.6, delta);
    }
    const scrollTurn = reducedMotion ? 0 : (chapterProgress - .5) * .08;
    if (nexus.current) nexus.current.rotation.y = -.18 + scrollTurn;
    if (ecar.current) ecar.current.rotation.y = -.38 + scrollTurn * .45;
    if (redRoom.current) redRoom.current.rotation.y = -.18 + scrollTurn * .75;
    if (phazion.current) phazion.current.rotation.y = .28 + scrollTurn * .65;
    if (moon.current) moon.current.visible = activeChapter === "phazion";
    if (!document.hidden && settling) invalidate();
  });

  return <>
    <group ref={about} position={[2.7,-.35,-.8]} scale={.001}>
      <mesh rotation={[0,.2,0]}><torusGeometry args={[1.8,.018,6,72,Math.PI*1.35]} /><meshBasicMaterial color="#315d9f" toneMapped={false} /></mesh>
      {[-.75,0,.75].map((offset,index)=><mesh key={offset} position={[offset,index*.18-.18,-index*.38]} rotation={[0,.18,0]}><planeGeometry args={[1.1,2.65]} /><meshStandardMaterial color="#0e2445" emissive="#071b38" emissiveIntensity={.45} transparent opacity={.42-index*.08} side={2} /></mesh>)}
      <mesh position={[1.55,-1.25,.2]}><sphereGeometry args={[.06,12,8]} /><meshBasicMaterial color="#82adff" toneMapped={false} /></mesh>
    </group>
    <group ref={experience} position={[2.4, 0, -1]} scale={.001}>
      {[-2, -1, 0, 1, 2].map((layer, index) => <mesh key={layer} position={[index * .08, index * -.06, layer * .28]}>
        <boxGeometry args={[3.6 - index * .18, 2.4 - index * .12, .035]} />
        <meshStandardMaterial color={index === 0 ? "#315c9c" : "#10284d"} emissive="#0b2b5d" emissiveIntensity={.55} metalness={.68} roughness={.32} wireframe={index > 1} transparent opacity={index > 1 ? .55 : .92} />
      </mesh>)}
      {[[-1.2,.55],[-.5,-.35],[.35,.25],[1.15,-.55]].map(([x,y], index) => <mesh key={index} position={[x,y,1.08]}><sphereGeometry args={[.07 + index * .012,16,12]} /><meshBasicMaterial color="#78a8ff" toneMapped={false} /></mesh>)}
    </group>
    <group ref={tech} position={[2.15, 0, 0]} scale={.001}>
      <mesh><octahedronGeometry args={[.72,1]} /><meshStandardMaterial color="#234d8d" emissive="#123d82" emissiveIntensity={1.1} metalness={.82} roughness={.2} /></mesh>
      <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.25,.055,10,72]} /><meshStandardMaterial color="#6f9fff" emissive="#1a4b9c" emissiveIntensity={.8} metalness={.7} roughness={.25} /></mesh>
      <mesh rotation={[.5,.15,0]}><torusGeometry args={[1.75,.018,6,72]} /><meshBasicMaterial color="#315da8" toneMapped={false} /></mesh>
      {[-1.9,-.95,0,.95,1.9].map((x,index)=><mesh key={x} position={[x,index%2?.85:-.85,-.35]}><boxGeometry args={[.42,.18,.12]} /><meshStandardMaterial color="#294c80" emissive="#102b59" emissiveIntensity={.7} /></mesh>)}
    </group>
    <group ref={project} position={[2.7,0,-1]} scale={.001}>
      <group ref={nexus} scale={.001}>
        <mesh rotation={[Math.PI / 2,0,0]}><cylinderGeometry args={[.92,.92,.3,6]} /><meshStandardMaterial color="#102c55" emissive="#0a3373" emissiveIntensity={.72} metalness={.72} roughness={.28} /></mesh>
        <mesh position={[0,0,.18]}><torusGeometry args={[.67,.055,12,6]} /><meshStandardMaterial color="#78c9ff" emissive="#287bd1" emissiveIntensity={.9} metalness={.68} roughness={.24} /></mesh>
        {[[-.42,-.22,.38],[-.12,.02,.7],[.18,-.08,.96],[.48,.32,1.25]].map(([x,y,h],index)=><mesh key={index} position={[x,y-.3,.25]}><boxGeometry args={[.16,h,.1]} /><meshStandardMaterial color={index>1?"#7fe7ff":"#558dff"} emissive={index>1?"#1c91bc":"#234ba5"} emissiveIntensity={.65} metalness={.58} roughness={.28} /></mesh>)}
        {[1.18,1.62,2.02].map((radius,index)=><mesh key={radius} rotation={[.38+index*.2,.12,index*.38]}><torusGeometry args={[radius,.022-index*.003,8,72]} /><meshBasicMaterial color={index===1?"#68ddff":"#416fc5"} transparent opacity={.68-index*.13} toneMapped={false} /></mesh>)}
        {[[-1.35,.5],[-.65,-.7],[.15,.35],[.85,-.3],[1.45,.72]].map(([x,y],index)=><mesh key={index} position={[x,y,index*.14]}><sphereGeometry args={[.07,14,10]} /><meshBasicMaterial color="#79a8ff" /></mesh>)}
      </group>
      <group ref={ecar} rotation={[.04,-.38,0]} scale={.001}>
        <mesh position={[0,.02,0]} scale={[1.65,.52,.72]}><sphereGeometry args={[1,32,18]} /><meshStandardMaterial color="#123b70" emissive="#061c3b" emissiveIntensity={.32} metalness={.68} roughness={.3} /></mesh>
        <mesh position={[-.08,.56,0]} scale={[.98,.48,.61]}><sphereGeometry args={[1,28,16]} /><meshStandardMaterial color="#23558a" emissive="#0a2950" emissiveIntensity={.28} metalness={.62} roughness={.28} /></mesh>
        <mesh position={[-.08,.61,.61]} scale={[.73,.3,.035]}><sphereGeometry args={[1,24,12]} /><meshStandardMaterial color="#91bfe8" emissive="#315f8c" emissiveIntensity={.25} metalness={.28} roughness={.13} transparent opacity={.72} /></mesh>
        <mesh position={[1.57,.02,0]}><boxGeometry args={[.12,.38,1.02]} /><meshStandardMaterial color="#0c2e59" metalness={.65} roughness={.28} /></mesh>
        {[-.58,.58].map(z=><mesh key={z} position={[1.65,.12,z]} rotation={[0,Math.PI/2,0]}><boxGeometry args={[.14,.16,.06]} /><meshBasicMaterial color="#bde7ff" toneMapped={false} /></mesh>)}
        {[[-.92,-.38,.62],[.92,-.38,.62],[-.92,-.38,-.62],[.92,-.38,-.62]].map((position,index)=><group key={index} position={position as [number,number,number]} rotation={[Math.PI/2,0,0]}><mesh><cylinderGeometry args={[.36,.36,.23,28]} /><meshStandardMaterial color="#03070d" metalness={.5} roughness={.42} /></mesh><mesh position={[0,.125,0]}><cylinderGeometry args={[.17,.17,.02,12]} /><meshStandardMaterial color="#6d7f94" metalness={.72} roughness={.28} /></mesh></group>)}
        <mesh position={[0,-.72,-.15]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[2.35,.028,8,72,Math.PI]} /><meshBasicMaterial color="#4a83d3" transparent opacity={.7} toneMapped={false} /></mesh>
      </group>
      <group ref={redRoom} scale={.001}>
        {[-1.12,1.12].map(y=><mesh key={y} position={[0,y,0]}><cylinderGeometry args={[.9,.9,.16,32]} /><meshStandardMaterial color="#15171b" emissive="#26060a" emissiveIntensity={.22} metalness={.74} roughness={.26} /></mesh>)}
        {[[-.68,-.68],[-.68,.68],[.68,-.68],[.68,.68]].map(([x,z],index)=><mesh key={index} position={[x,0,z]}><cylinderGeometry args={[.055,.055,2.18,12]} /><meshStandardMaterial color="#282b31" metalness={.72} roughness={.25} /></mesh>)}
        <mesh position={[0,.53,0]}><coneGeometry args={[.69,1.02,32,1,true]} /><meshPhysicalMaterial color="#91a0ad" transmission={.72} transparent opacity={.24} roughness={.08} metalness={.05} thickness={.08} side={2} /></mesh>
        <mesh position={[0,-.53,0]} rotation={[0,0,Math.PI]}><coneGeometry args={[.69,1.02,32,1,true]} /><meshPhysicalMaterial color="#91a0ad" transmission={.72} transparent opacity={.24} roughness={.08} metalness={.05} thickness={.08} side={2} /></mesh>
        <mesh position={[0,.72,0]} rotation={[0,0,Math.PI]}><coneGeometry args={[.57,.64,32]} /><meshStandardMaterial color="#c31020" emissive="#9d0613" emissiveIntensity={.72} metalness={.18} roughness={.42} /></mesh>
        <mesh position={[0,-.86,0]}><coneGeometry args={[.62,.36,32]} /><meshStandardMaterial color="#d01525" emissive="#a50616" emissiveIntensity={.7} metalness={.15} roughness={.45} /></mesh>
        <mesh><cylinderGeometry args={[.038,.038,.48,10]} /><meshBasicMaterial color="#ff3346" toneMapped={false} /></mesh>
        <group position={[0,1.22,.91]} scale={.22}><mesh scale={[.65,1,1]}><sphereGeometry args={[.34,16,12]} /><meshStandardMaterial color="#b20c1a" emissive="#7c0710" emissiveIntensity={.5} /></mesh>{[-1,1].map(side=>[[-.42,.2],[-.5,0],[-.42,-.2]].map(([x,y],i)=><mesh key={`${side}-${i}`} position={[side*x,y,0]} rotation={[0,0,side*(i-1)*.5]}><boxGeometry args={[.55,.055,.055]} /><meshBasicMaterial color="#d31b28" /></mesh>))}</group>
        {[1.38,1.72].map((radius,index)=><mesh key={radius} rotation={[.2+index*.18,.1,index*.3]}><torusGeometry args={[radius,.014,6,64]} /><meshBasicMaterial color={index?"#6d1720":"#dc4650"} transparent opacity={.36-index*.1} /></mesh>)}
        <pointLight position={[-1.4,.2,1.5]} intensity={12} distance={5} color="#e2192b" />
      </group>
      <group ref={clinic} scale={.001}>
        <mesh><boxGeometry args={[.42,2.5,.25]} /><meshStandardMaterial color="#dcecff" emissive="#315d9f" emissiveIntensity={.35} roughness={.28} /></mesh>
        <mesh><boxGeometry args={[2.5,.42,.25]} /><meshStandardMaterial color="#dcecff" emissive="#315d9f" emissiveIntensity={.35} roughness={.28} /></mesh>
        {[-1,0,1].map((x,index)=><mesh key={x} position={[x,-1.25-index*.12,-index*.28]}><boxGeometry args={[.72,.12,.06]} /><meshBasicMaterial color="#6f9fff" transparent opacity={.75-index*.15} /></mesh>)}
        {[[-1.5,-.72],[-.95,-.72],[-.62,-.25],[-.28,-1.02],[.1,-.72],[.78,-.72],[1.48,-.72]].map(([x,y],index)=><mesh key={index} position={[x,y,.2]} rotation={[0,0,index===2?.95:index===3?-1.1:0]}><boxGeometry args={[index===2||index===3?.58:.55,.045,.04]} /><meshBasicMaterial color="#82b7ff" toneMapped={false} /></mesh>)}
      </group>
      <group ref={phazion} scale={.001}>
        <mesh ref={moon} position={[1.15,.82,-.55]}><sphereGeometry args={[.54,24,18]} /><meshStandardMaterial color="#e2eaff" emissive="#7994c8" emissiveIntensity={.42} roughness={.78} /></mesh>
        <mesh position={[0,-.05,0]} scale={[1.42,.62,.38]}><sphereGeometry args={[1,32,18]} /><meshStandardMaterial color="#263d72" emissive="#172960" emissiveIntensity={.52} metalness={.32} roughness={.34} /></mesh>
        {[-1,1].map(side=><mesh key={side} position={[side*.88,-.48,-.02]} rotation={[0,0,side*.34]} scale={[.52,.8,.38]}><sphereGeometry args={[.65,24,16]} /><meshStandardMaterial color="#203564" emissive="#19295d" emissiveIntensity={.46} metalness={.28} roughness={.36} /></mesh>)}
        {[[-.46,.16],[.42,.12]].map(([x,y],index)=><group key={index} position={[x,y,.38]}><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.17,.19,.12,24]} /><meshStandardMaterial color="#202f5e" emissive="#3b3192" emissiveIntensity={.38} metalness={.45} roughness={.38} /></mesh><mesh position={[0,0,.075]}><sphereGeometry args={[.115,18,12]} /><meshStandardMaterial color="#6276c7" emissive="#322a8a" emissiveIntensity={.5} /></mesh></group>)}
        <group position={[-.76,-.12,.4]}>{[-.16,.16].map(v=><mesh key={`h${v}`} position={[v,0,0]}><boxGeometry args={[.34,.11,.1]} /><meshStandardMaterial color="#95a9e8" emissive="#4052a4" emissiveIntensity={.42} /></mesh>)}{[-.16,.16].map(v=><mesh key={`v${v}`} position={[0,v,0]}><boxGeometry args={[.11,.34,.1]} /><meshStandardMaterial color="#95a9e8" emissive="#4052a4" emissiveIntensity={.42} /></mesh>)}</group>
        {[[.78,.14,"#8074ff"],[1.02,-.04,"#54b7ff"],[.72,-.18,"#d163ff"],[.94,-.31,"#6e8cff"]].map(([x,y,color],index)=><mesh key={index} position={[x as number,y as number,.42]}><sphereGeometry args={[.1,16,12]} /><meshBasicMaterial color={color as string} toneMapped={false} /></mesh>)}
        {[-.62,.62].map(x=><mesh key={x} position={[x,.53,-.05]}><boxGeometry args={[.52,.13,.28]} /><meshStandardMaterial color="#40558c" emissive="#1a2d68" emissiveIntensity={.4} metalness={.38} roughness={.34} /></mesh>)}
        <pointLight position={[0,.35,2]} intensity={18} distance={5} color="#788cff" />
        <mesh rotation={[0,0,.24]}><torusGeometry args={[1.55,.018,6,56,Math.PI*1.45]} /><meshBasicMaterial color="#5677ad" transparent opacity={.7} /></mesh>
        {[-.55,.15].map((y,index)=><mesh key={y} position={[0,y,-.5-index*.35]} rotation={[0,0,index?.08:-.06]}><planeGeometry args={[3.2,.7]} /><meshBasicMaterial color="#172746" transparent opacity={.25} /></mesh>)}
      </group>
    </group>
  </>;
}

function SceneDirector({ portalEnabled, onUnavailable }: { portalEnabled: boolean; onUnavailable: () => void }) {
  return <><ContextGuard onUnavailable={onUnavailable} /><fog attach="fog" args={["#03060b", 9, 22]} /><ambientLight intensity={.62} /><hemisphereLight color="#cfe0ff" groundColor="#07142b" intensity={1.05} /><directionalLight position={[-4, 5, 6]} intensity={4.8} color="#f1f5ff" /><pointLight position={[3.5, 1, 4]} intensity={46} distance={12} color="#6395ff" /><pointLight position={[-3, -2, 3]} intensity={32} distance={11} color="#2867d2" /><HeroAssembly portalEnabled={portalEnabled} /><ChapterUniverse /></>;
}

export default function ExperienceCanvasScene({ maxDpr, portalEnabled, onUnavailable }: { maxDpr: 1 | 1.25 | 1.5; portalEnabled: boolean; onUnavailable: () => void }) {
  return <Canvas frameloop="demand" camera={{ position: [0, 0, 7], fov: 44 }} dpr={[1, maxDpr]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}><SceneDirector portalEnabled={portalEnabled} onUnavailable={onUnavailable} /></Canvas>;
}
