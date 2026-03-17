import React, { useState, useCallback, useRef, useEffect } from "react"

type ThrottledCallback<TArgs extends unknown[]> = (...args: TArgs) => void

/**
 * A custom hook to throttle a callback function.
 * This ensures the function is not called more than once every `delay` milliseconds.
 * Useful for performance-critical event handlers like mouse move or scroll.
 */
function useThrottledCallback<TArgs extends unknown[]>(
  callback: ThrottledCallback<TArgs>,
  delay: number
) {
  const timeoutRef = useRef<number | null>(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useCallback(
    (...args: TArgs) => {
      if (timeoutRef.current) return
      callbackRef.current(...args)
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null
      }, delay)
    },
    [delay]
  )
}

type ShaderParams = {
  hue: number
  speed: number
  intensity: number
  complexity: number
}

/**
 * A custom hook to encapsulate all WebGL shader logic.
 * It handles setup, the animation loop, and cleanup.
 */
function useShaderAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  params: ShaderParams
) {
  const { hue, speed, intensity, complexity } = params
  const mousePos = useRef({ x: 0.5, y: 0.5 })

  const throttledMouseMove = useThrottledCallback<[MouseEvent]>(
    (e) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mousePos.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mousePos.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    },
    16
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ||
      (canvas.getContext("webgl") as WebGLRenderingContext | null)
    if (!gl) {
      // WebGL unsupported: fail silently (no UI break)
      return
    }

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
    `

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_hue;
      uniform float u_speed;
      uniform float u_intensity;
      uniform float u_complexity;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 10; i++) {
          if (float(i) >= u_complexity) break;
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float t = u_time * u_speed * 0.1;
        float mouse_dist = distance(uv, u_mouse);
        float warp = smoothstep(0.5, 0.0, mouse_dist) * 0.5;
        vec2 p = uv * 2.0 + vec2(t, t * 0.5) + warp;
        float noise_pattern = fbm(p);
        float vignette = 1.0 - smoothstep(0.8, 1.5, length(uv));
        float saturation = 0.6 + noise_pattern * 0.4;
        float value = 0.2 + (noise_pattern * 0.8) * u_intensity * vignette;
        vec3 color = hsv2rgb(vec3(u_hue / 360.0, saturation, value));
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(
      fragmentShaderSource,
      gl.FRAGMENT_SHADER
    )
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "a_position"
    )
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    const timeLocation = gl.getUniformLocation(program, "u_time")
    const mouseLocation = gl.getUniformLocation(program, "u_mouse")
    const hueLocation = gl.getUniformLocation(program, "u_hue")
    const speedLocation = gl.getUniformLocation(program, "u_speed")
    const intensityLocation = gl.getUniformLocation(program, "u_intensity")
    const complexityLocation = gl.getUniformLocation(program, "u_complexity")

    let animationFrameId = 0
    const startTime = performance.now()

    const render = () => {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      }

      if (resolutionLocation) gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)
      if (timeLocation) gl.uniform1f(timeLocation, (performance.now() - startTime) * 0.001)
      if (mouseLocation) gl.uniform2f(mouseLocation, mousePos.current.x, mousePos.current.y)
      if (hueLocation) gl.uniform1f(hueLocation, hue)
      if (speedLocation) gl.uniform1f(speedLocation, speed)
      if (intensityLocation) gl.uniform1f(intensityLocation, intensity)
      if (complexityLocation) gl.uniform1f(complexityLocation, complexity)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationFrameId = requestAnimationFrame(render)
    }

    render()
    window.addEventListener("mousemove", throttledMouseMove)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", throttledMouseMove)
      if (!gl.isContextLost()) {
        gl.deleteProgram(program)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
        if (positionBuffer) gl.deleteBuffer(positionBuffer)
      }
    }
  }, [hue, speed, intensity, complexity, canvasRef, throttledMouseMove])
}

type ControlSliderProps = {
  label: string
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  min: number
  max: number
  step: number
}

const ControlSlider = React.memo(
  ({ label, value, onChange, min, max, step }: ControlSliderProps) => (
    <div className="flex flex-col text-white">
      <div className="mb-1 flex items-center justify-between">
        <label className="select-none text-sm font-medium">{label}</label>
        <span className="select-none rounded-full bg-white/10 px-2 py-0.5 text-sm">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700 accent-cyan-400"
      />
    </div>
  )
)

export type ShaderCanvasProps = ShaderParams & {
  className?: string
}

export const ShaderCanvas = React.memo(
  ({ hue, speed, intensity, complexity, className }: ShaderCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    useShaderAnimation(canvasRef, { hue, speed, intensity, complexity })
    return (
      <canvas
        ref={canvasRef}
        className={[
          "absolute left-0 top-0 h-full w-full",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    )
  }
)

export default function ShaderComponent() {
  const [hue, setHue] = useState(210)
  const [speed, setSpeed] = useState(0.4)
  const [intensity, setIntensity] = useState(1.2)
  const [complexity, setComplexity] = useState(5.0)

  const handleHueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setHue(parseFloat(e.target.value)),
    []
  )
  const handleSpeedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setSpeed(parseFloat(e.target.value)),
    []
  )
  const handleIntensityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setIntensity(parseFloat(e.target.value)),
    []
  )
  const handleComplexityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setComplexity(parseFloat(e.target.value)),
    []
  )

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900 font-sans">
      <ShaderCanvas
        hue={hue}
        speed={speed}
        intensity={intensity}
        complexity={complexity}
      />

      <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center">
        <h1 className="select-none text-5xl font-bold text-white mix-blend-overlay md:text-8xl">
          Interactive Shader
        </h1>
      </div>

      <div className="absolute bottom-4 left-1/2 w-full max-w-lg -translate-x-1/2 p-4">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/50 p-6 shadow-lg backdrop-blur-md">
          <ControlSlider
            label="Hue"
            value={hue}
            onChange={handleHueChange}
            min={0}
            max={360}
            step={1}
          />
          <ControlSlider
            label="Speed"
            value={speed}
            onChange={handleSpeedChange}
            min={0.0}
            max={2.0}
            step={0.01}
          />
          <ControlSlider
            label="Intensity"
            value={intensity}
            onChange={handleIntensityChange}
            min={0.1}
            max={3.0}
            step={0.01}
          />
          <ControlSlider
            label="Complexity"
            value={complexity}
            onChange={handleComplexityChange}
            min={1.0}
            max={10.0}
            step={0.1}
          />
        </div>
      </div>
    </div>
  )
}

