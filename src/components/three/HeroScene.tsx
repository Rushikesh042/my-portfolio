import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import NeuralNetwork from './NeuralNetwork'
import './HeroScene.css'

// ─── Camera rig — subtle parallax on mouse move ───────────────────────────
function CameraRig() {
  const { camera, gl } = useThree()
  const targetRef = useRef({ x: 0, y: 0 })

  useFrame(() => {
    camera.position.x += (targetRef.current.x - camera.position.x) * 0.04
    camera.position.y += (targetRef.current.y - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  useFrame(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      targetRef.current = { x: nx * 0.8, y: -ny * 0.5 }
    }
    gl.domElement.ownerDocument.addEventListener('mousemove', onMove, { once: true, passive: true })
  })

  return null
}

// ─── Grid floor ───────────────────────────────────────────────────────────
function GridFloor() {
  return (
    <gridHelper
      args={[20, 30, '#1e1b4b', '#1e1b4b']}
      position={[0, -3.5, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

// ─── Ambient glow sphere ─────────────────────────────────────────────────
function GlowSphere() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (!ref.current) return
    const t = performance.now() * 0.0005
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = 0.04 + 0.02 * Math.sin(t)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[4.5, 32, 32]} />
      <meshBasicMaterial color="#4f46e5" transparent opacity={0.04} side={THREE.BackSide} depthWrite={false} />
    </mesh>
  )
}

// ─── Fallback for WebGL errors ────────────────────────────────────────────
function SceneFallback() {
  return (
    <div className="hero-scene__fallback" aria-hidden="true">
      <div className="hero-scene__fallback-inner" />
    </div>
  )
}

// ─── Exported hero scene ─────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <ErrorBoundary fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'default',
          }}
          dpr={[1, 1.5]}
          className="hero-scene__canvas"
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#6366f1" />
          <pointLight position={[-5, -3, -3]} intensity={0.8} color="#06b6d4" />

          <Stars
            radius={50}
            depth={50}
            count={800}
            factor={3}
            saturation={0.5}
            fade
            speed={0.5}
          />

          <GridFloor />
          <GlowSphere />

          <Suspense fallback={null}>
            <NeuralNetwork />
          </Suspense>

          <CameraRig />
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}

// ─── Simple error boundary ────────────────────────────────────────────────
import { Component, type ReactNode } from 'react'

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { error: boolean }
> {
  state = { error: false }

  static getDerivedStateFromError() {
    return { error: true }
  }

  render() {
    return this.state.error ? this.props.fallback : this.props.children
  }
}
