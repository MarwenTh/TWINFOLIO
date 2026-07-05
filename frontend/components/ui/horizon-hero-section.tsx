"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

gsap.registerPlugin(ScrollTrigger);

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;

  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    mountains: THREE.Mesh[];
    animationId: number | null;
    targetCameraX: number;
    targetCameraY: number;
    targetCameraZ: number;
    locations: number[];
  }>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    targetCameraX: 0,
    targetCameraY: 30,
    targetCameraZ: 100,
    locations: [],
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const refs = threeRefs.current;

    // Scene setup
    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);
    // Non-null alias — scene is guaranteed non-null from this point on
    const scene = refs.scene;

    refs.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    refs.camera.position.z = 100;
    refs.camera.position.y = 20;

    refs.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    refs.composer = new EffectComposer(refs.renderer);
    const renderPass = new RenderPass(refs.scene, refs.camera);
    refs.composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8,
      0.4,
      0.85
    );
    refs.composer.addPass(bloomPass);

    // --- Star Field ---
    const starCount = 5000;
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      for (let j = 0; j < starCount; j++) {
        const radius = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);

        const color = new THREE.Color();
        const colorChoice = Math.random();
        if (colorChoice < 0.7) color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
        else if (colorChoice < 0.9) color.setHSL(0.08, 0.5, 0.8);
        else color.setHSL(0.6, 0.5, 0.8);

        colors[j * 3] = color.r;
        colors[j * 3 + 1] = color.g;
        colors[j * 3 + 2] = color.b;
        sizes[j] = Math.random() * 2 + 0.5;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: i } },
        vertexShader: `
          attribute float size; attribute vec3 color; varying vec3 vColor;
          uniform float time; uniform float depth;
          void main() {
            vColor = color;
            vec3 pos = position;
            float angle = time * 0.05 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }`,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, opacity);
          }`,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const stars = new THREE.Points(geometry, material);
      scene.add(stars);
      refs.stars.push(stars);
    }

    // --- Nebula ---
    const nebulaGeo = new THREE.PlaneGeometry(8000, 4000, 100, 100);
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x0033ff) },
        color2: { value: new THREE.Color(0xff0066) },
        opacity: { value: 0.3 },
      },
      vertexShader: `
        varying vec2 vUv; varying float vElevation; uniform float time;
        void main() {
          vUv = uv; vec3 pos = position;
          float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
          pos.z += elevation; vElevation = elevation;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 color1; uniform vec3 color2; uniform float opacity; uniform float time;
        varying vec2 vUv; varying float vElevation;
        void main() {
          float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
          vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
          float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
          alpha *= 1.0 + vElevation * 0.01;
          gl_FragColor = vec4(color, alpha);
        }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.z = -1050;
    scene.add(nebula);
    refs.nebula = nebula;

    // --- Mountains ---
    const layers = [
      { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
      { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
      { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
      { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
    ];
    layers.forEach((layer, index) => {
      const points: THREE.Vector2[] = [];
      const segments = 50;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * 1000;
        const y =
          Math.sin(i * 0.1) * layer.height +
          Math.sin(i * 0.05) * layer.height * 0.5 +
          Math.random() * layer.height * 0.2 -
          100;
        points.push(new THREE.Vector2(x, y));
      }
      points.push(new THREE.Vector2(5000, -300));
      points.push(new THREE.Vector2(-5000, -300));
      const shape = new THREE.Shape(points);
      const geo = new THREE.ShapeGeometry(shape);
      const mat = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        side: THREE.DoubleSide,
      });
      const mountain = new THREE.Mesh(geo, mat);
      mountain.position.z = layer.distance;
      mountain.position.y = layer.distance;
      mountain.userData = { baseZ: layer.distance, index };
      scene.add(mountain);
      refs.mountains.push(mountain);
    });

    // Record initial mountain Z positions
    refs.mountains.forEach((m, i) => {
      refs.locations[i] = m.position.z;
    });

    // --- Atmosphere ---
    const atmGeo = new THREE.SphereGeometry(600, 32, 32);
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        varying vec3 vNormal; uniform float time;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          atmosphere *= pulse;
          gl_FragColor = vec4(atmosphere, intensity * 0.25);
        }`,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    scene.add(new THREE.Mesh(atmGeo, atmMat));

    // --- Animation Loop ---
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      refs.stars.forEach((sf) => {
        const mat = sf.material as THREE.ShaderMaterial;
        if (mat.uniforms) mat.uniforms.time.value = time;
      });

      if (refs.nebula) {
        const mat = refs.nebula.material as THREE.ShaderMaterial;
        if (mat.uniforms) mat.uniforms.time.value = time * 0.5;
      }

      if (refs.camera) {
        const sf = 0.05;
        smoothCameraPos.current.x +=
          (refs.targetCameraX - smoothCameraPos.current.x) * sf;
        smoothCameraPos.current.y +=
          (refs.targetCameraY - smoothCameraPos.current.y) * sf;
        smoothCameraPos.current.z +=
          (refs.targetCameraZ - smoothCameraPos.current.z) * sf;

        refs.camera.position.x =
          smoothCameraPos.current.x + Math.sin(time * 0.1) * 2;
        refs.camera.position.y =
          smoothCameraPos.current.y + Math.cos(time * 0.15) * 1;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      refs.mountains.forEach((mountain, i) => {
        const pf = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * pf;
        mountain.position.y =
          50 + Math.cos(time * 0.15) * 1 * pf;
      });

      if (refs.composer) refs.composer.render();
    };
    animate();

    // --- Resize ---
    const handleResize = () => {
      if (!refs.camera || !refs.renderer || !refs.composer) return;
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    setIsReady(true);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);
      refs.stars.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      refs.mountains.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
      }
      if (refs.renderer) refs.renderer.dispose();
    };
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    if (!isReady) return;

    gsap.set(
      [
        menuRef.current,
        titleRef.current,
        subtitleRef.current,
        scrollProgressRef.current,
      ],
      { visibility: "visible" }
    );

    const tl = gsap.timeline();
    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".title-char");
      tl.from(
        chars,
        { y: 200, opacity: 0, duration: 1.5, stagger: 0.05, ease: "power4.out" },
        "-=0.5"
      );
    }
    if (subtitleRef.current) {
      const lines = subtitleRef.current.querySelectorAll(".subtitle-line");
      tl.from(
        lines,
        { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=0.8"
      );
    }
    if (scrollProgressRef.current) {
      tl.from(
        scrollProgressRef.current,
        { opacity: 0, y: 50, duration: 1, ease: "power2.out" },
        "-=0.5"
      );
    }

    return () => { tl.kill(); };
  }, [isReady]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
      const newSection = Math.floor(progress * totalSections);
      setCurrentSection(newSection);

      const refs = threeRefs.current;
      const totalProgress = progress * totalSections;
      const sectionProgress = totalProgress % 1;

      const cameraPositions = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 },
      ];

      const currentPos = cameraPositions[newSection] ?? cameraPositions[0];
      const nextPos = cameraPositions[newSection + 1] ?? currentPos;

      refs.targetCameraX =
        currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY =
        currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ =
        currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

      refs.mountains.forEach((mountain, i) => {
        const speed = 1 + i * 0.9;
        const targetZ = mountain.userData.baseZ + scrollY * speed * 0.5;
        if (refs.nebula) refs.nebula.position.z = targetZ + progress * speed * 0.01 - 100;
        mountain.userData.targetZ = targetZ;
        if (progress > 0.7) mountain.position.z = 600000;
        else mountain.position.z = refs.locations[i];
      });

      if (refs.nebula && refs.mountains[3]) {
        refs.nebula.position.z = refs.mountains[3].position.z;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalSections]);

  const splitTitle = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="title-char inline-block overflow-hidden">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${(totalSections + 1) * 100}vh` }}>
      {/* Three.js canvas — full viewport, sticky */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Side menu */}
      <div
        ref={menuRef}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4"
        style={{ visibility: "hidden" }}
      >
        <div className="flex flex-col gap-1.5 cursor-pointer group">
          <span className="block w-6 h-0.5 bg-white/60 group-hover:bg-white transition-colors" />
          <span className="block w-4 h-0.5 bg-white/60 group-hover:bg-white transition-colors" />
          <span className="block w-6 h-0.5 bg-white/60 group-hover:bg-white transition-colors" />
        </div>
        <div
          className="text-white/40 text-[10px] tracking-[0.4em] font-light mt-4"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          SPACE
        </div>
      </div>

      {/* Main hero content — sticky on first section */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center z-10 pointer-events-none">
        <h1
          ref={titleRef}
          className="text-[clamp(4rem,15vw,12rem)] font-black tracking-widest text-white mix-blend-overlay uppercase leading-none"
          style={{ visibility: "hidden" }}
        >
          {splitTitle("TWINFOLIO")}
        </h1>

        <div
          ref={subtitleRef}
          className="mt-6 text-center"
          style={{ visibility: "hidden" }}
        >
          <p className="subtitle-line text-white/60 text-base md:text-lg font-light tracking-[0.25em] uppercase">
            Where vision meets reality,
          </p>
          <p className="subtitle-line text-white/60 text-base md:text-lg font-light tracking-[0.25em] uppercase">
            we shape the future of tomorrow
          </p>
        </div>

        {/* Scroll progress bar */}
        <div
          ref={scrollProgressRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ visibility: "hidden" }}
        >
          <span className="text-white/40 text-[10px] tracking-[0.5em] uppercase">
            Scroll
          </span>
          <div className="w-32 h-px bg-white/20 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-white transition-all duration-100"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="text-white/40 text-[10px] tracking-[0.3em]">
            {String(currentSection).padStart(2, "0")} /{" "}
            {String(totalSections).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Scroll sections */}
      <div className="relative z-10">
        {[
          {
            title: "COSMOS",
            sub1: "Beyond the boundaries of imagination,",
            sub2: "lies the universe of possibilities",
          },
          {
            title: "INFINITY",
            sub1: "In the space between thought and creation,",
            sub2: "we find the essence of true innovation",
          },
        ].map((section, i) => (
          <section
            key={i}
            className="h-screen flex flex-col items-center justify-center pointer-events-none"
          >
            <h2 className="text-[clamp(3rem,12vw,10rem)] font-black tracking-widest text-white/10 uppercase leading-none">
              {section.title}
            </h2>
            <p className="mt-4 text-white/30 text-sm md:text-base font-light tracking-[0.2em] uppercase text-center">
              {section.sub1}
            </p>
            <p className="text-white/30 text-sm md:text-base font-light tracking-[0.2em] uppercase text-center">
              {section.sub2}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};
