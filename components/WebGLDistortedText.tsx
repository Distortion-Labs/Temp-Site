'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Fragment shader with liquid distortion and chromatic aberration
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform vec2 uResolution;

  varying vec2 vUv;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                     + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // Calculate distance from mouse
    vec2 mouseUV = uMouse;
    float dist = distance(uv, mouseUV);
    float mouseInfluence = smoothstep(0.5, 0.0, dist) * uHover;

    // Time-based animation
    float time = uTime * 0.5;

    // Liquid distortion using noise
    float noiseScale = 3.0;
    float noiseStrength = 0.04 + mouseInfluence * 0.06;

    float noise1 = snoise(uv * noiseScale + time * 0.5);
    float noise2 = snoise(uv * noiseScale * 1.5 - time * 0.3);
    float noise3 = snoise(uv * noiseScale * 2.0 + time * 0.7);

    // Wave distortion
    float wave1 = sin(uv.x * 10.0 + time * 2.0) * 0.01;
    float wave2 = sin(uv.y * 8.0 + time * 1.5) * 0.01;

    // Combine distortions
    vec2 distortion = vec2(
      noise1 * noiseStrength + wave1 + mouseInfluence * (uv.x - mouseUV.x) * 0.1,
      noise2 * noiseStrength + wave2 + mouseInfluence * (uv.y - mouseUV.y) * 0.1
    );

    // Mouse ripple effect
    float ripple = sin(dist * 30.0 - uTime * 5.0) * 0.02 * mouseInfluence;
    distortion += vec2(ripple) * normalize(uv - mouseUV + 0.001);

    // Chromatic aberration
    float aberrationStrength = 0.015 + mouseInfluence * 0.025 + noise3 * 0.005;
    vec2 redOffset = distortion + vec2(aberrationStrength, 0.0);
    vec2 greenOffset = distortion;
    vec2 blueOffset = distortion - vec2(aberrationStrength, 0.0);

    // Add vertical chromatic split
    redOffset.y += aberrationStrength * 0.5;
    blueOffset.y -= aberrationStrength * 0.5;

    // Sample texture with chromatic aberration
    float r = texture2D(uTexture, uv + redOffset).r;
    float g = texture2D(uTexture, uv + greenOffset).g;
    float b = texture2D(uTexture, uv + blueOffset).b;
    float a = texture2D(uTexture, uv + distortion).a;

    // Color tinting
    vec3 color = vec3(r, g, b);

    // Add glow effect
    float glow = smoothstep(0.3, 0.7, a) * 0.3;
    color += vec3(0.4, 0.2, 0.8) * glow * (1.0 + mouseInfluence);

    // Add scan line effect (subtle)
    float scanline = sin(uv.y * 200.0 + uTime * 2.0) * 0.02;
    color += scanline * mouseInfluence;

    // Add edge glow
    float edgeGlow = (1.0 - smoothstep(0.0, 0.1, a)) * 0.5;
    color += vec3(0.5, 0.8, 1.0) * edgeGlow * a;

    gl_FragColor = vec4(color, a);
  }
`

// Text texture generator
function createTextTexture(text: string, fontSize: number): THREE.CanvasTexture | null {
  if (typeof window === 'undefined') return null

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // Set canvas size
  const scale = 2 // Higher resolution
  ctx.font = `bold ${fontSize * scale}px "Outfit", system-ui, sans-serif`
  const metrics = ctx.measureText(text)

  canvas.width = metrics.width + 100 * scale
  canvas.height = fontSize * scale * 1.5

  // Clear and draw text
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = `bold ${fontSize * scale}px "Outfit", system-ui, sans-serif`
  ctx.fillStyle = 'white'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  return texture
}

// Distorted plane mesh component
function DistortedPlane({ text, fontSize }: { text: string; fontSize: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { size, viewport } = useThree()
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [hover, setHover] = useState(0)

  // Create texture
  const texture = useMemo(() => createTextTexture(text, fontSize), [text, fontSize])

  // Calculate plane size based on text
  const planeWidth = useMemo(() => {
    if (!texture) return 4
    return (texture.image.width / texture.image.height) * 1.2
  }, [texture])

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = 1 - e.clientY / window.innerHeight
      setMouse({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animation loop
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y)

      // Smooth hover transition
      const targetHover = hover
      materialRef.current.uniforms.uHover.value +=
        (targetHover - materialRef.current.uniforms.uHover.value) * 0.1
    }
  })

  if (!texture) return null

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => setHover(1)}
      onPointerLeave={() => setHover(0)}
    >
      <planeGeometry args={[planeWidth, 1.2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture },
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uHover: { value: 0 },
          uResolution: { value: new THREE.Vector2(size.width, size.height) },
        }}
        transparent
      />
    </mesh>
  )
}

// Main component
interface WebGLDistortedTextProps {
  children: string
  className?: string
}

export default function WebGLDistortedText({ children, className = '' }: WebGLDistortedTextProps) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(96)

  useEffect(() => {
    setMounted(true)

    // Get computed font size
    if (containerRef.current) {
      const computed = window.getComputedStyle(containerRef.current)
      const size = parseFloat(computed.fontSize)
      setFontSize(Math.round(size * 1.4))
    }
  }, [])

  if (!mounted) {
    // SSR fallback
    return (
      <span className={`inline-block ${className}`} style={{ fontSize: 'inherit' }}>
        {children}
      </span>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{
        fontSize: 'inherit',
        width: '100%',
        maxWidth: '700px',
        height: `${fontSize * 1.5}px`,
        cursor: 'crosshair'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        <DistortedPlane text={children} fontSize={fontSize} />
      </Canvas>
    </div>
  )
}
