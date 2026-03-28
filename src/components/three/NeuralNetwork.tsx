import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

// ─── Neural node positions (3 layers: input → hidden → output) ────────────
const LAYER_POSITIONS: [number, number, number][][] = [
  // Input layer (left)
  [[-3, 1.5, 0], [-3, 0, 0], [-3, -1.5, 0]],
  // Hidden layer 1
  [[-1, 2, 0.5], [-1, 0.5, -0.5], [-1, -0.8, 0.8], [-1, -2, -0.3]],
  // Hidden layer 2
  [[1, 1.5, -0.5], [1, 0, 0.5], [1, -1.5, -0.2]],
  // Output layer (right)
  [[3, 0.8, 0], [3, -0.8, 0]],
]

// Flatten all nodes with their layer index
type NodeEntry = { pos: [number, number, number]; layer: number; idx: number }

function buildNodes(): NodeEntry[] {
  return LAYER_POSITIONS.flatMap((layer, li) =>
    layer.map((pos, idx) => ({ pos, layer: li, idx }))
  )
}

// Build edges between adjacent layers
type Edge = { from: [number, number, number]; to: [number, number, number] }

function buildEdges(): Edge[] {
  const edges: Edge[] = []
  for (let l = 0; l < LAYER_POSITIONS.length - 1; l++) {
    const fromLayer = LAYER_POSITIONS[l]
    const toLayer = LAYER_POSITIONS[l + 1]
    fromLayer.forEach((from) => {
      toLayer.forEach((to) => {
        edges.push({ from: from as [number, number, number], to: to as [number, number, number] })
      })
    })
  }
  return edges
}

// ─── Single edge line ─────────────────────────────────────────────────────
function NeuralEdge({ from, to, opacity }: { from: [number,number,number]; to: [number,number,number]; opacity: number }) {
  const points = useMemo(() => [from, to], [from, to])

  return (
    <Line
      points={points}
      color="#6366f1"
      transparent
      opacity={opacity * 0.3}
      lineWidth={0.8}
    />
  )
}

// ─── Single node ──────────────────────────────────────────────────────────
function NeuralNode({ pos, layer, phase }: { pos: [number,number,number]; layer: number; phase: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const colors = ['#06b6d4', '#6366f1', '#8b5cf6', '#a78bfa']
  const col = colors[layer % colors.length]

  useFrame((_, delta) => {
    if (!meshRef.current || !glowRef.current) return
    const t = performance.now() * 0.001 + phase
    const scale = 1 + 0.15 * Math.sin(t * 1.5)
    meshRef.current.scale.setScalar(scale)
    glowRef.current.scale.setScalar(scale * 2.8)
    ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.06 + 0.04 * Math.sin(t * 1.5)
  })

  return (
    <group position={pos}>
      {/* Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={col} transparent opacity={0.07} depthWrite={false} />
      </mesh>
      {/* Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial
          color={col}
          emissive={col}
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>
    </group>
  )
}

// ─── Floating data particles ──────────────────────────────────────────────
function DataParticles() {
  const ref = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const count = 120
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
      velocities[i * 3] = (Math.random() - 0.5) * 0.008
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004
    }
    return { positions, velocities }
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < pos.length / 3; i++) {
      pos[i * 3] += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      pos[i * 3 + 2] += velocities[i * 3 + 2]

      // Wrap
      if (Math.abs(pos[i * 3]) > 5.5) velocities[i * 3] *= -1
      if (Math.abs(pos[i * 3 + 1]) > 3.5) velocities[i * 3 + 1] *= -1
      if (Math.abs(pos[i * 3 + 2]) > 2.5) velocities[i * 3 + 2] *= -1
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.025}
        color="#6366f1"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ─── Main Neural Network Scene ────────────────────────────────────────────
export default function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  const nodes = useMemo(() => buildNodes(), [])
  const edges = useMemo(() => buildEdges(), [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.08
    groupRef.current.rotation.x = Math.sin(performance.now() * 0.0004) * 0.12
  })

  return (
    <group ref={groupRef}>
      {/* Edges */}
      {edges.map((e, i) => (
        <NeuralEdge key={i} from={e.from} to={e.to} opacity={0.8} />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <NeuralNode
          key={i}
          pos={n.pos}
          layer={n.layer}
          phase={i * 0.7}
        />
      ))}

      {/* Particles */}
      <DataParticles />
    </group>
  )
}
