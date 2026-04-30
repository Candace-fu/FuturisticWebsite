import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { type MotionId, getMotionPose } from '../robot/motions'

interface FlowbotSceneProps {
  motion: MotionId
}

type JointRefs = {
  base: React.MutableRefObject<THREE.Group | null>
  shoulder: React.MutableRefObject<THREE.Group | null>
  elbow: React.MutableRefObject<THREE.Group | null>
  wrist: React.MutableRefObject<THREE.Group | null>
  gripper: React.MutableRefObject<THREE.Group | null>
}

function ProceduralArm({ motion }: { motion: MotionId }) {
  const base = useRef<THREE.Group | null>(null)
  const shoulder = useRef<THREE.Group | null>(null)
  const elbow = useRef<THREE.Group | null>(null)
  const wrist = useRef<THREE.Group | null>(null)
  const gripper = useRef<THREE.Group | null>(null)

  const refs = useMemo<JointRefs>(
    () => ({ base, shoulder, elbow, wrist, gripper }),
    []
  )

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const pose = getMotionPose(motion, t)

    if (refs.base.current) refs.base.current.rotation.y = pose.base
    if (refs.shoulder.current) refs.shoulder.current.rotation.z = pose.shoulder
    if (refs.elbow.current) refs.elbow.current.rotation.z = pose.elbow
    if (refs.wrist.current) refs.wrist.current.rotation.x = pose.wrist
    if (refs.gripper.current) refs.gripper.current.rotation.z = pose.gripper
  })

  return (
    <group position={[0, -0.05, 0]}>
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.75, 0.9, 0.18, 40]} />
        <meshStandardMaterial color="#141820" metalness={0.4} roughness={0.7} />
      </mesh>

      <group ref={base} position={[0, 0.12, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.22, 0.4, 24]} />
          <meshStandardMaterial color="#2c3645" metalness={0.65} roughness={0.3} />
        </mesh>

        <mesh position={[0.26, 0.12, 0]}>
          <sphereGeometry args={[0.05, 18, 18]} />
          <meshStandardMaterial color="#43d7ff" emissive="#43d7ff" emissiveIntensity={1.5} />
        </mesh>

        <group ref={shoulder} position={[0, 0.2, 0]}>
          <mesh castShadow receiveShadow position={[0, 0.38, 0]}>
            <boxGeometry args={[0.22, 0.9, 0.22]} />
            <meshStandardMaterial color="#d6dde5" metalness={0.2} roughness={0.65} />
          </mesh>

          <group ref={elbow} position={[0, 0.82, 0]}>
            <mesh castShadow receiveShadow position={[0, 0.34, 0]}>
              <boxGeometry args={[0.18, 0.78, 0.18]} />
              <meshStandardMaterial color="#f0b05b" metalness={0.15} roughness={0.58} />
            </mesh>

            <group ref={wrist} position={[0, 0.7, 0]}>
              <mesh castShadow receiveShadow position={[0, 0.18, 0]}>
                <cylinderGeometry args={[0.09, 0.11, 0.36, 22]} />
                <meshStandardMaterial color="#949cab" metalness={0.35} roughness={0.48} />
              </mesh>

              <group ref={gripper} position={[0, 0.36, 0]}>
                <mesh castShadow receiveShadow position={[0, 0.11, 0]}>
                  <boxGeometry args={[0.12, 0.24, 0.12]} />
                  <meshStandardMaterial color="#d6dde5" metalness={0.2} roughness={0.64} />
                </mesh>
                <mesh castShadow position={[0.1, 0.28, 0]}>
                  <boxGeometry args={[0.04, 0.22, 0.04]} />
                  <meshStandardMaterial color="#d6dde5" metalness={0.2} roughness={0.64} />
                </mesh>
                <mesh castShadow position={[-0.1, 0.28, 0]}>
                  <boxGeometry args={[0.04, 0.22, 0.04]} />
                  <meshStandardMaterial color="#d6dde5" metalness={0.2} roughness={0.64} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

function SceneEnvironment() {
  return (
    <>
      <color attach="background" args={['#06090d']} />
      <fog attach="fog" args={['#06090d', 4.5, 11]} />

      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        intensity={1.45}
        position={[3, 4.8, 2.6]}
        color="#ffd8c0"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-2, 1.8, 2]} intensity={12} color="#00d5ff" distance={6} />
      <pointLight position={[1.6, 2.2, -1.2]} intensity={10} color="#ff4062" distance={6} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#0a1014" roughness={0.95} metalness={0.06} />
      </mesh>

      <mesh position={[0, 1.8, -3.6]}>
        <planeGeometry args={[7, 4.2]} />
        <meshStandardMaterial color="#111821" roughness={1} metalness={0} />
      </mesh>
    </>
  )
}

export function FlowbotScene({ motion }: FlowbotSceneProps) {
  return (
    <div className="flowbot-canvas-wrap">
      <Canvas camera={{ position: [2.8, 1.7, 3.4], fov: 36 }} shadows dpr={[1, 1.8]}>
        <SceneEnvironment />
        <ProceduralArm motion={motion} />
        <ContactShadows position={[0, -0.115, 0]} opacity={0.45} scale={5} blur={2.4} />
        <OrbitControls
          enablePan={false}
          minDistance={2.5}
          maxDistance={6}
          minPolarAngle={0.6}
          maxPolarAngle={1.45}
          target={[0, 1.15, 0]}
        />
      </Canvas>

      <div className="flowbot-scene-overlay">
        <div className="flowbot-overlay-card">
          <div className="flowbot-status-dot" />
          <div>
            <div className="flowbot-kicker">Motion profile</div>
            <div className="flowbot-overlay-title">{motion}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
