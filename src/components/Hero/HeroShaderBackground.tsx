import { useTheme } from "@/context/ThemeContext"
import { WebGLShader } from "@/components/ui/web-gl-shader"

type HeroShaderBackgroundProps = {
  enabled?: boolean
  overlayOpacity?: number
  className?: string
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

export function HeroShaderBackground({
  enabled,
  overlayOpacity,
  className,
}: HeroShaderBackgroundProps) {
  const { theme } = useTheme()
  const isEnabled = enabled ?? true
  if (!isEnabled) return null

  const defaultOverlayOpacity = theme === "light" ? 0.0 : 0.25
  const overlayAlpha = clamp01(overlayOpacity ?? defaultOverlayOpacity)
  const overlayColor = theme === "light" ? "255,255,255" : "0,0,0"

  return (
    <div
      className={className}
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <WebGLShader />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(${overlayColor}, ${overlayAlpha})` }}
      />
    </div>
  )
}

