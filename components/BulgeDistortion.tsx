'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

interface BulgeDistortionProps {
  children: React.ReactNode
  className?: string
}

// Vertex shader - passes UV coordinates to fragment shader
const vertexShader = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`

// Fragment shader with bulge distortion effect
const fragmentShader = `
  precision highp float;

  varying vec2 v_texCoord;
  uniform vec2 u_mouse;
  uniform float u_strength;
  uniform float u_radius;
  uniform float u_time;
  uniform vec2 u_resolution;

  // Bulge distortion function
  vec2 bulge(vec2 uv, vec2 center, float strength, float radius) {
    vec2 toCenter = uv - center;
    float dist = length(toCenter);
    float distNorm = dist / radius;

    if (dist < radius) {
      // Smooth falloff using smoothstep
      float bulgeAmount = 1.0 - smoothstep(0.0, 1.0, distNorm);
      bulgeAmount = pow(bulgeAmount, 2.0);

      // Apply bulge - push outward from center
      float scale = 1.0 + strength * bulgeAmount;
      toCenter *= scale;
    }

    return center + toCenter;
  }

  // Gradient orb function
  vec3 orb(vec2 uv, vec2 center, vec3 color, float size) {
    float dist = length(uv - center);
    float intensity = 1.0 - smoothstep(0.0, size, dist);
    intensity = pow(intensity, 1.5);
    return color * intensity;
  }

  void main() {
    vec2 uv = v_texCoord;
    float aspect = u_resolution.x / u_resolution.y;

    // Apply aspect ratio correction for mouse position
    vec2 mouse = u_mouse;

    // Apply bulge distortion
    vec2 distortedUV = bulge(uv, mouse, u_strength * 0.3, u_radius);

    // Correct for aspect ratio in orb calculations
    vec2 uvAspect = distortedUV;
    uvAspect.x *= aspect;

    vec2 mouseAspect = mouse;
    mouseAspect.x *= aspect;

    // Animated time factor for subtle movement
    float t = u_time * 0.5;

    // Create gradient orbs (similar to the CSS orbs)
    vec3 color = vec3(0.02, 0.02, 0.06); // Dark background

    // Purple orb - top left
    vec2 purpleCenter = vec2(-0.1 + sin(t * 0.3) * 0.05, 0.8 + cos(t * 0.2) * 0.03);
    purpleCenter.x *= aspect;
    color += orb(uvAspect, purpleCenter, vec3(0.5, 0.2, 0.8), 0.8);

    // Cyan orb - bottom right
    vec2 cyanCenter = vec2(1.1 + cos(t * 0.25) * 0.04, 0.1 + sin(t * 0.35) * 0.03);
    cyanCenter.x *= aspect;
    color += orb(uvAspect, cyanCenter, vec3(0.1, 0.7, 0.9), 0.7);

    // Rose/pink orb - middle right
    vec2 roseCenter = vec2(0.85 + sin(t * 0.4) * 0.03, 0.55 + cos(t * 0.3) * 0.04);
    roseCenter.x *= aspect;
    color += orb(uvAspect, roseCenter, vec3(0.9, 0.3, 0.5), 0.5) * 0.6;

    // Add subtle glow around mouse
    float mouseDist = length(uvAspect - mouseAspect);
    float mouseGlow = exp(-mouseDist * 3.0) * u_strength * 0.15;
    color += vec3(0.3, 0.5, 0.8) * mouseGlow;

    // Add subtle noise/grain for texture
    float noise = fract(sin(dot(uv * 1000.0, vec2(12.9898, 78.233))) * 43758.5453);
    color += (noise - 0.5) * 0.02;

    gl_FragColor = vec4(color, 1.0);
  }
`

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function createProgram(gl: WebGLRenderingContext, vertShader: WebGLShader, fragShader: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vertShader)
  gl.attachShader(program, fragShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
  }

  return program
}

export default function BulgeDistortion({ children, className = '' }: BulgeDistortionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const animationRef = useRef<number>(0)
  const uniformsRef = useRef<{
    mouse: WebGLUniformLocation | null
    strength: WebGLUniformLocation | null
    radius: WebGLUniformLocation | null
    time: WebGLUniformLocation | null
    resolution: WebGLUniformLocation | null
  }>({ mouse: null, strength: null, radius: null, time: null, resolution: null })

  // Animation values
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 })
  const strengthRef = useRef({ current: 0, target: 0 })
  const startTimeRef = useRef(Date.now())

  const initGL = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return false

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false
    })
    if (!gl) {
      console.error('WebGL not supported')
      return false
    }

    glRef.current = gl

    // Create shaders
    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShader)
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
    if (!vertShader || !fragShader) return false

    // Create program
    const program = createProgram(gl, vertShader, fragShader)
    if (!program) return false

    programRef.current = program
    gl.useProgram(program)

    // Set up geometry (full screen quad)
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ])

    const texCoords = new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      1, 1,
    ])

    // Position buffer
    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const posLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLocation)
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0)

    // TexCoord buffer
    const texBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW)

    const texLocation = gl.getAttribLocation(program, 'a_texCoord')
    gl.enableVertexAttribArray(texLocation)
    gl.vertexAttribPointer(texLocation, 2, gl.FLOAT, false, 0, 0)

    // Get uniform locations
    uniformsRef.current = {
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      strength: gl.getUniformLocation(program, 'u_strength'),
      radius: gl.getUniformLocation(program, 'u_radius'),
      time: gl.getUniformLocation(program, 'u_time'),
      resolution: gl.getUniformLocation(program, 'u_resolution'),
    }

    // Set initial uniforms
    gl.uniform2f(uniformsRef.current.mouse, 0.5, 0.5)
    gl.uniform1f(uniformsRef.current.strength, 0)
    gl.uniform1f(uniformsRef.current.radius, 0.4)

    return true
  }, [])

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const gl = glRef.current
    if (!canvas || !container || !gl) return

    const dpr = Math.min(window.devicePixelRatio, 2)
    const rect = container.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    gl.viewport(0, 0, canvas.width, canvas.height)

    if (uniformsRef.current.resolution) {
      gl.uniform2f(uniformsRef.current.resolution, canvas.width, canvas.height)
    }
  }, [])

  const render = useCallback(() => {
    const gl = glRef.current
    if (!gl || !programRef.current) return

    // Smooth mouse interpolation
    const mouse = mouseRef.current
    mouse.x += (mouse.targetX - mouse.x) * 0.1
    mouse.y += (mouse.targetY - mouse.y) * 0.1

    // Smooth strength interpolation
    const strength = strengthRef.current
    strength.current += (strength.target - strength.current) * 0.08

    // Update uniforms
    gl.uniform2f(uniformsRef.current.mouse, mouse.x, 1.0 - mouse.y)
    gl.uniform1f(uniformsRef.current.strength, strength.current)
    gl.uniform1f(uniformsRef.current.time, (Date.now() - startTimeRef.current) / 1000)

    // Clear and draw
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

    animationRef.current = requestAnimationFrame(render)
  }, [])

  useEffect(() => {
    if (!initGL()) return

    resize()
    render()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [initGL, resize, render])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    mouseRef.current.targetX = (e.clientX - rect.left) / rect.width
    mouseRef.current.targetY = (e.clientY - rect.top) / rect.height
  }, [])

  const handleMouseEnter = useCallback(() => {
    gsap.to(strengthRef.current, {
      target: 1,
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    gsap.to(strengthRef.current, {
      target: 0,
      duration: 0.8,
      ease: 'power3.out',
    })

    // Smoothly return mouse to center
    gsap.to(mouseRef.current, {
      targetX: 0.5,
      targetY: 0.5,
      duration: 1,
      ease: 'power2.out',
    })
  }, [])

  // Touch handlers for mobile
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container || !e.touches[0]) return

    const rect = container.getBoundingClientRect()
    mouseRef.current.targetX = (e.touches[0].clientX - rect.left) / rect.width
    mouseRef.current.targetY = (e.touches[0].clientY - rect.top) / rect.height
  }, [])

  const handleTouchStart = useCallback(() => {
    gsap.to(strengthRef.current, {
      target: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [])

  const handleTouchEnd = useCallback(() => {
    gsap.to(strengthRef.current, {
      target: 0,
      duration: 0.6,
      ease: 'power3.out',
    })

    gsap.to(mouseRef.current, {
      targetX: 0.5,
      targetY: 0.5,
      duration: 0.8,
      ease: 'power2.out',
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
