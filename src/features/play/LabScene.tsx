import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, Billboard } from '@react-three/drei'
import type { Group, Mesh } from 'three'
import type { Project } from '@/shared/cms/types'
import * as THREE from 'three'

type LabSceneProps = {
  projects: Project[]
  portraitUrl: string
  onSelectProject: (slug: string) => void
  onSelectGame: (game: 'memory' | 'reaction' | 'dodge') => void
  focusedSlug: string | null
}

const GAME_NODES: Array<{ id: 'memory' | 'reaction' | 'dodge'; label: string; position: [number, number, number] }> =
  [
    { id: 'memory', label: 'Memory', position: [-4.2, 0.2, 1.5] },
    { id: 'reaction', label: 'Pulse', position: [4.4, 0.4, 1.2] },
    { id: 'dodge', label: 'Catch', position: [0.2, -1.6, 2.2] },
  ]

export function LabScene({
  projects,
  portraitUrl,
  onSelectProject,
  onSelectGame,
  focusedSlug,
}: LabSceneProps): React.JSX.Element {
  const groupRef = useRef<Group>(null)
  const texture = useMemo(() => new THREE.TextureLoader().load(portraitUrl), [portraitUrl])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  const featured = projects.slice(0, 6)

  return (
    <group>
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 6, 4]} intensity={40} color="#c6f432" distance={30} />
      <pointLight position={[-5, 3, -2]} intensity={25} color="#6b8cff" distance={28} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]} receiveShadow>
        <circleGeometry args={[12, 64]} />
        <meshStandardMaterial color="#111111" metalness={0.2} roughness={0.85} />
      </mesh>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
        <Billboard position={[-0.2, 1.8, -1.2]}>
          <mesh
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <planeGeometry args={[1.6, 1.9]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
          </mesh>
          <Text
            position={[0, -1.2, 0]}
            fontSize={0.18}
            color="#c6f432"
            anchorX="center"
            anchorY="middle"
          >
            You are here
          </Text>
        </Billboard>
      </Float>

      <group ref={groupRef}>
        {featured.map((project, index) => {
          const angle = (index / featured.length) * Math.PI * 2
          const radius = 3.4
          const position: [number, number, number] = [
            Math.cos(angle) * radius,
            Math.sin(angle * 1.3) * 0.6,
            Math.sin(angle) * radius,
          ]
          const focused = focusedSlug === project.slug
          return (
            <ProjectOrb
              key={project.id}
              label={project.title}
              position={position}
              focused={focused}
              onClick={() => onSelectProject(project.slug)}
            />
          )
        })}
      </group>

      {GAME_NODES.map((node) => (
        <Float key={node.id} speed={2} floatIntensity={0.8}>
          <mesh
            position={node.position}
            onClick={(e) => {
              e.stopPropagation()
              onSelectGame(node.id)
            }}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto'
            }}
          >
            <octahedronGeometry args={[0.45, 0]} />
            <meshStandardMaterial
              color="#c6f432"
              emissive="#7a9a10"
              emissiveIntensity={0.6}
              metalness={0.4}
              roughness={0.25}
            />
          </mesh>
          <Text position={[node.position[0], node.position[1] + 0.7, node.position[2]]} fontSize={0.2} color="#ffffff">
            {node.label}
          </Text>
        </Float>
      ))}

      <Particles />
    </group>
  )
}

type ProjectOrbProps = {
  label: string
  position: [number, number, number]
  focused: boolean
  onClick: () => void
}

function ProjectOrb({ label, position, focused, onClick }: ProjectOrbProps): React.JSX.Element {
  const meshRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8
      meshRef.current.rotation.x += delta * 0.3
    }
  })

  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        scale={focused ? 1.25 : 1}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color={focused ? '#e8ff7a' : '#2a2a2a'}
          emissive={focused ? '#c6f432' : '#1a2e0a'}
          emissiveIntensity={focused ? 0.9 : 0.35}
          metalness={0.55}
          roughness={0.3}
        />
      </mesh>
      <Text
        position={[position[0], position[1] + 0.95, position[2]]}
        fontSize={0.16}
        color="#a3a3a3"
        maxWidth={1.8}
        textAlign="center"
        anchorX="center"
      >
        {label}
      </Text>
    </Float>
  )
}

function createParticlePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) {
    const seed = i * 12.9898
    const rand = (n: number): number => {
      const value = Math.sin(seed + n) * 43758.5453
      return value - Math.floor(value)
    }
    positions[i * 3] = (rand(1) - 0.5) * 16
    positions[i * 3 + 1] = (rand(2) - 0.5) * 10
    positions[i * 3 + 2] = (rand(3) - 0.5) * 16
  }
  return positions
}

function Particles(): React.JSX.Element {
  const points = useMemo(() => createParticlePositions(400), [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#c6f432" transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}
