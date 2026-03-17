"use client"

import * as React from "react"
import * as THREE from "three"

import { cn } from "@/lib/utils"
import { useTheme } from "@/context/ThemeContext"

export type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { theme } = useTheme()
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const rafRef = React.useRef<number | null>(null)
  const roRef = React.useRef<ResizeObserver | null>(null)

  React.useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const SEPARATION = 150
    const AMOUNTX = 40
    const AMOUNTY = 60

    const scene = new THREE.Scene()
    // Fog + depth can cause harsh flashing on some GPUs when used as a background layer.
    // Keep this as a clean transparent layer and control contrast via the overlay.

    const camera = new THREE.PerspectiveCamera(60, 1, 1, 10000)
    camera.position.set(0, 260, 1220)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)

    const positions: number[] = []
    const colors: number[] = []

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
        const y = 0
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2

        positions.push(x, y, z)

        // Note: THREE.Float32BufferAttribute normalized color range is typically 0..1,
        // but Three will normalize when `normalized` is set. We keep 0..1 here explicitly.
        if (theme === "dark") {
          colors.push(0.78, 0.78, 0.78)
        } else {
          colors.push(0.05, 0.05, 0.05)
        }
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    )
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    )

    const material = new THREE.PointsMaterial({
      size: 6,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    })
    material.depthTest = false
    material.depthWrite = false

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let count = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const width = Math.max(1, Math.floor(rect.width))
      const height = Math.max(1, Math.floor(rect.height))
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    const animate = () => {
      const positionAttribute = geometry.attributes.position
      const pos = positionAttribute.array as Float32Array

      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const idx = i * 3
          pos[idx + 1] =
            Math.sin((ix + count) * 0.3) * 28 +
            Math.sin((iy + count) * 0.5) * 28
          i++
        }
      }

      positionAttribute.needsUpdate = true
      renderer.clear()
      renderer.render(scene, camera)
      count += 0.1
      rafRef.current = requestAnimationFrame(animate)
    }

    resize()
    animate()

    roRef.current = new ResizeObserver(() => resize())
    roRef.current.observe(container)
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      if (roRef.current) roRef.current.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      scene.remove(points)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      {...props}
    >
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
    </div>
  )
}

