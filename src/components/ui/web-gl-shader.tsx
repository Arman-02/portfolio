"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

type SceneRefs = {
  scene: THREE.Scene | null
  camera: THREE.OrthographicCamera | null
  renderer: THREE.WebGLRenderer | null
  mesh: THREE.Mesh | null
  uniforms: {
    resolution: { value: THREE.Vector2 }
    time: { value: number }
    xScale: { value: number }
    yScale: { value: number }
    distortion: { value: number }
    stripColor: { value: THREE.Vector3 }
    baseColor: { value: THREE.Vector3 }
  } | null
  animationId: number | null
}

function hexToRgb01(input: string): [number, number, number] | null {
  const hex = input.trim().replace("#", "")
  if (hex.length !== 6) return null
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null
  return [r / 255, g / 255, b / 255]
}

function readCssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function readThemeMode() {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark"
}

export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<SceneRefs>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const container = canvas.parentElement
    if (!container) return
    const { current: refs } = sceneRef

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
      uniform vec3 stripColor;
      uniform vec3 baseColor;
      varying vec2 vUv;

      // Simple curve tinted with a single grey strip on a nearly black background
      vec3 maroonPalette(float x, float intensity) {
        vec3 base = baseColor;
        vec3 bandColor = stripColor;

        // Use intensity to fade from base into the band color
        float edge = smoothstep(0.0, 1.0, intensity);
        vec3 c = mix(base, bandColor, edge);

        // Very soft glow only on the strongest parts
        float glowStrength = pow(intensity, 2.5);
        c += bandColor * glowStrength * 0.15; // reduced glow

        // Subtle vignette so edges are darker
        float v = smoothstep(1.3, 0.3, length(vUv - 0.5));
        return c * v;
      }

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        float d = length(p) * distortion;

        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

        // Use the brightest channel as the “intensity” driver
        float intensity = clamp(max(max(r, g), b) * 0.6, 0.0, 1.0);
        vec3 color = maroonPalette(intensity, intensity);

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      const rect = container.getBoundingClientRect()
      const width = Math.max(1, Math.floor(rect.width))
      const height = Math.max(1, Math.floor(rect.height))
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value.set(width, height)
    }

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      refs.renderer.setPixelRatio(window.devicePixelRatio)
      refs.renderer.setClearColor(0x000000, 0)
      refs.renderer.debug.checkShaderErrors = true

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

      const rect = container.getBoundingClientRect()
      const width = Math.max(1, Math.floor(rect.width))
      const height = Math.max(1, Math.floor(rect.height))
      // Keep wave color the same across themes (match your dark-mode accent).
      const wave = hexToRgb01("#ff4d4d") ?? [1.0, 0.302, 0.302]
      const baseDark = [0.03, 0.03, 0.04] as const
      // Cream background for light mode (#FFF3E6-ish)
      const baseLight = [1.0, 0.95, 0.90] as const
      const base = readThemeMode() === "light" ? baseLight : baseDark
      refs.uniforms = {
        resolution: { value: new THREE.Vector2(width, height) },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
        stripColor: { value: new THREE.Vector3(wave[0], wave[1], wave[2]) },
        baseColor: { value: new THREE.Vector3(base[0], base[1], base[2]) },
      }

      const geometry = new THREE.PlaneGeometry(2, 2)

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        depthWrite: false,
        depthTest: false,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += 0.01
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    initScene()
    animate()
    window.addEventListener("resize", handleResize)
    const ro = new ResizeObserver(() => handleResize())
    ro.observe(container)
    const mo = new MutationObserver(() => {
      if (!refs.uniforms) return
      const mode = readThemeMode()
      if (mode === "light") {
        refs.uniforms.baseColor.value.set(1.0, 0.95, 0.90)
      } else {
        refs.uniforms.baseColor.value.set(0.03, 0.03, 0.04)
      }
    })
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      window.removeEventListener("resize", handleResize)
      ro.disconnect()
      mo.disconnect()
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  )
}

