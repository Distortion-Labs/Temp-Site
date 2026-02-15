'use client'

/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { forwardRef, useRef, useMemo, useLayoutEffect, useEffect, MutableRefObject } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

const MAX_COLORS = 8

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-6.0 / exp(6.0 * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  } else {
    vec2 s = q;
    for (int k = 0; k < 3; ++k) {
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float m = mix(m0, m1, kMix);
      col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));
    }
    a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
  }

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = (uTransparent > 0) ? col * a : col;
  gl_FragColor = vec4(rgb, a);
}
`

function hexToVec3(hex: string): THREE.Vector3 {
  const h = hex.replace('#', '').trim()
  const v =
    h.length === 3
      ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
      : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
  return new THREE.Vector3(v[0] / 255, v[1] / 255, v[2] / 255)
}

interface ColorBendsPlaneProps {
  uniforms: Record<string, { value: unknown }>
  pointerRef: MutableRefObject<{ x: number; y: number; targetX: number; targetY: number }>
  mouseInfluenceRef: MutableRefObject<{ value: number }>
  rotation: number
  autoRotate: number
}

const ColorBendsPlane = forwardRef<THREE.Mesh, ColorBendsPlaneProps>(function ColorBendsPlane(
  { uniforms, pointerRef, mouseInfluenceRef, rotation, autoRotate },
  ref
) {
  const { viewport, size } = useThree()

  useLayoutEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1)
    }
  }, [ref, viewport])

  useLayoutEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      const mat = ref.current.material as THREE.ShaderMaterial
      if (mat?.uniforms?.uCanvas) {
        mat.uniforms.uCanvas.value.set(size.width, size.height)
      }
    }
  }, [ref, size])

  useFrame((state, delta) => {
    if (ref && 'current' in ref && ref.current) {
      const mat = ref.current.material as THREE.ShaderMaterial
      mat.uniforms.uTime.value += delta

      // Update rotation with autoRotate
      const elapsed = state.clock.elapsedTime
      const deg = (rotation % 360) + autoRotate * elapsed
      const rad = (deg * Math.PI) / 180
      mat.uniforms.uRot.value.set(Math.cos(rad), Math.sin(rad))

      // Smooth pointer interpolation
      const pointer = pointerRef.current
      pointer.x += (pointer.targetX - pointer.x) * 0.08
      pointer.y += (pointer.targetY - pointer.y) * 0.08
      mat.uniforms.uPointer.value.set(pointer.x, pointer.y)

      // Update mouse influence from GSAP animated value
      mat.uniforms.uMouseInfluence.value = mouseInfluenceRef.current.value
    }
  })

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
})
ColorBendsPlane.displayName = 'ColorBendsPlane'

interface ColorBendsProps {
  rotation?: number
  speed?: number
  colors?: string[]
  transparent?: boolean
  autoRotate?: number
  scale?: number
  frequency?: number
  warpStrength?: number
  mouseInfluence?: number
  parallax?: number
  noise?: number
}

export default function ColorBends({
  rotation = 101,
  speed = 0.14,
  colors = ['#6b21a8', '#0ea5e9', '#e11d48', '#1e1b4b'],
  transparent = false,
  autoRotate = 5,
  scale = 0.2,
  frequency = 1.6,
  warpStrength = 0.9,
  mouseInfluence = 1.4,
  parallax = 0,
  noise = 0.84
}: ColorBendsProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const mouseInfluenceRef = useRef({ value: mouseInfluence })

  // Pointer events with GSAP reset
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1
      const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1)
      pointerRef.current.targetX = x
      pointerRef.current.targetY = y
    }

    const handlePointerEnter = () => {
      gsap.to(mouseInfluenceRef.current, {
        value: mouseInfluence,
        duration: 0.6,
        ease: 'power2.out'
      })
    }

    const handlePointerLeave = () => {
      // GSAP reset on mouse leave
      gsap.to(mouseInfluenceRef.current, {
        value: 0,
        duration: 1.0,
        ease: 'power3.out'
      })
      gsap.to(pointerRef.current, {
        targetX: 0,
        targetY: 0,
        duration: 1.2,
        ease: 'power2.out'
      })
    }

    el.addEventListener('pointermove', handlePointerMove, { passive: true })
    el.addEventListener('pointerenter', handlePointerEnter)
    el.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      el.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerenter', handlePointerEnter)
      el.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [mouseInfluence])

  const uniforms = useMemo(() => {
    const rad = (rotation * Math.PI) / 180
    const uColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0))
    const parsedColors = colors.filter(Boolean).slice(0, MAX_COLORS).map(hexToVec3)
    parsedColors.forEach((c, i) => uColorsArray[i].copy(c))

    return {
      uCanvas: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uRot: { value: new THREE.Vector2(Math.cos(rad), Math.sin(rad)) },
      uColorCount: { value: parsedColors.length },
      uColors: { value: uColorsArray },
      uTransparent: { value: transparent ? 1 : 0 },
      uScale: { value: scale },
      uFrequency: { value: frequency },
      uWarpStrength: { value: warpStrength },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uMouseInfluence: { value: mouseInfluence },
      uParallax: { value: parallax },
      uNoise: { value: noise }
    }
  }, [rotation, speed, colors, transparent, autoRotate, scale, frequency, warpStrength, mouseInfluence, parallax, noise])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Canvas dpr={[1, 1.5]} frameloop="always">
        <ColorBendsPlane
          ref={meshRef}
          uniforms={uniforms}
          pointerRef={pointerRef}
          mouseInfluenceRef={mouseInfluenceRef}
          rotation={rotation}
          autoRotate={autoRotate}
        />
      </Canvas>
    </div>
  )
}
