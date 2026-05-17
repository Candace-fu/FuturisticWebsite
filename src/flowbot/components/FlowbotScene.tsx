import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import URDFLoader from 'urdf-loader'
import type { URDFRobot } from 'urdf-loader/src/URDFClasses'
import { type MotionId, getMotionPose } from '../robot/motions'

interface FlowbotSceneProps {
  motion: MotionId
}

type WeatherProfile = 'clear' | 'cloudy' | 'rainy'

type RoomLighting = {
  background: string
  fog: string
  floor: string
  wall: string
  sideWall: string
  ceiling: string
  windowFrame: string
  windowGlass: string
  windowEmission: string
  ambientIntensity: number
  sunIntensity: number
  sunColor: string
  sunPosition: [number, number, number]
  lampIntensity: number
  lampColor: string
  coolFillIntensity: number
  coolFillColor: string
}

function classifyWeather(code: number | null): WeatherProfile {
  if (code == null) return 'clear'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'rainy'
  if ([1, 2, 3, 45, 48].includes(code)) return 'cloudy'
  return 'clear'
}

function buildLighting(hour: number, weather: WeatherProfile): RoomLighting {
  const normalizedHour = ((hour % 24) + 24) % 24
  const isNight = normalizedHour < 5 || normalizedHour >= 20
  const isSunrise = normalizedHour >= 5 && normalizedHour < 8
  const isSunset = normalizedHour >= 17 && normalizedHour < 20

  let background = '#f0ebe4'
  let fog = '#ddd7d0'
  let floor = '#c5d0d6'
  let wall = '#efe8df'
  let sideWall = '#ebe3d8'
  let ceiling = '#f7f1ea'
  let windowFrame = '#f8f2eb'
  let windowGlass = '#d4edf8'
  let windowEmission = '#89b5cf'
  let ambientIntensity = 1.06
  let sunIntensity = 1.28
  let sunColor = '#fff2da'
  let sunPosition: [number, number, number] = [3.4, 4.5, -2]
  let lampIntensity = 0.65
  let lampColor = '#ffd6a0'
  let coolFillIntensity = 1.8
  let coolFillColor = '#9ad8ff'

  if (isSunrise) {
    background = '#e8dfd7'
    fog = '#d9cec5'
    windowGlass = '#ffd8c0'
    windowEmission = '#ffba80'
    ambientIntensity = 0.9
    sunIntensity = 1.0
    sunColor = '#ffc89c'
    sunPosition = [3.0, 2.8, -2.1]
    lampIntensity = 0.95
    coolFillIntensity = 1.3
  } else if (isSunset) {
    background = '#e0d5ce'
    fog = '#cdc0b9'
    windowGlass = '#ffc8a3'
    windowEmission = '#ff9962'
    ambientIntensity = 0.84
    sunIntensity = 0.96
    sunColor = '#ffb27d'
    sunPosition = [2.4, 2.6, -2.1]
    lampIntensity = 1.1
    coolFillIntensity = 1.18
  } else if (isNight) {
    background = '#1c1d24'
    fog = '#20222a'
    floor = '#737d84'
    wall = '#bcb4ad'
    sideWall = '#b3aaa2'
    ceiling = '#d6d0ca'
    windowGlass = '#4b617d'
    windowEmission = '#2c435b'
    ambientIntensity = 0.42
    sunIntensity = 0.12
    sunColor = '#88a9c8'
    sunPosition = [2.5, 2.2, -2]
    lampIntensity = 1.95
    coolFillIntensity = 0.8
    coolFillColor = '#74a8cb'
  }

  if (weather === 'cloudy') {
    background = isNight ? background : '#ded9d4'
    fog = isNight ? fog : '#cbc9c6'
    windowGlass = isNight ? windowGlass : '#cad8e0'
    windowEmission = isNight ? windowEmission : '#93a6b4'
    ambientIntensity *= 0.92
    sunIntensity *= 0.58
    coolFillIntensity *= 0.94
  }

  if (weather === 'rainy') {
    background = isNight ? '#1a1b22' : '#d3d8dc'
    fog = isNight ? '#20222a' : '#c1c8ce'
    floor = isNight ? floor : '#b8c2c8'
    windowGlass = isNight ? '#556d89' : '#bdd0dc'
    windowEmission = isNight ? '#364c63' : '#8598a8'
    ambientIntensity *= 0.84
    sunIntensity *= 0.4
    lampIntensity *= 1.15
    coolFillIntensity *= 1.16
  }

  return {
    background,
    fog,
    floor,
    wall,
    sideWall,
    ceiling,
    windowFrame,
    windowGlass,
    windowEmission,
    ambientIntensity,
    sunIntensity,
    sunColor,
    sunPosition,
    lampIntensity,
    lampColor,
    coolFillIntensity,
    coolFillColor,
  }
}

function So101Robot({ motion }: { motion: MotionId }) {
  const [robot, setRobot] = useState<URDFRobot | null>(null)

  useFrame((state) => {
    if (!robot) return
    const t = state.clock.getElapsedTime()
    const pose = getMotionPose(motion, t)

    robot.setJointValue('shoulder_pan', pose.base)
    robot.setJointValue('shoulder_lift', pose.shoulder)
    robot.setJointValue('elbow_flex', pose.elbow)
    robot.setJointValue('wrist_flex', pose.wrist)
    robot.setJointValue('wrist_roll', pose.wristRoll)
    robot.setJointValue('gripper', pose.gripperOpen)
  })

  useEffect(() => {
    let disposed = false
    const loader = new URDFLoader()

    loader.load(
      '/flowbot/so101/so101_new_calib.urdf',
      (loadedRobot) => {
        if (disposed) return

        loadedRobot.traverse((child) => {
          const mesh = child as THREE.Mesh
          if (mesh.isMesh) {
            mesh.castShadow = true
            mesh.receiveShadow = true
          }
        })

        loadedRobot.rotation.x = -Math.PI / 2
        loadedRobot.rotation.z = -0.08
        loadedRobot.position.set(1.42, 0.93, 0.74)
        loadedRobot.scale.setScalar(3.42)
        setRobot(loadedRobot)
      },
      undefined,
      (error) => {
        console.error('Failed to load SO101 robot', error)
      },
    )

    return () => {
      disposed = true
      setRobot(null)
    }
  }, [])

  if (!robot) return null
  return <primitive object={robot} />
}

function DeskAccessory({
  position,
  rotation,
  scale,
  color,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  color: string
}) {
  return (
    <mesh castShadow receiveShadow position={position} rotation={rotation} scale={scale ?? [1, 1, 1]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.9} metalness={0.04} />
    </mesh>
  )
}

function DeskMonitor({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
        <boxGeometry args={[0.88, 0.56, 0.08]} />
        <meshStandardMaterial color="#1f2328" roughness={0.76} metalness={0.16} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.45, 0.045]}>
        <boxGeometry args={[0.78, 0.44, 0.02]} />
        <meshStandardMaterial color="#253448" emissive="#3c5d6e" emissiveIntensity={0.2} roughness={0.24} metalness={0.18} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.16, 0]}>
        <boxGeometry args={[0.08, 0.26, 0.08]} />
        <meshStandardMaterial color="#22262b" roughness={0.78} metalness={0.18} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.03, 0.04]}>
        <cylinderGeometry args={[0.2, 0.24, 0.03, 28]} />
        <meshStandardMaterial color="#23262a" roughness={0.78} metalness={0.16} />
      </mesh>
    </group>
  )
}

function DeskLamp() {
  return (
    <group position={[-0.15, 1.78, -0.08]} rotation={[0, 0.18, -0.04]}>
      <mesh castShadow receiveShadow position={[0, 0, 0]} rotation={[0, 0, -0.92]}>
        <cylinderGeometry args={[0.024, 0.024, 0.9, 18]} />
        <meshStandardMaterial color="#1f1f20" roughness={0.84} metalness={0.2} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.44, -0.04, 0.04]} rotation={[0, 0, 0.62]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 18]} />
        <meshStandardMaterial color="#1f1f20" roughness={0.84} metalness={0.2} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.68, -0.16, 0.08]} rotation={[0.22, 0, 0.42]}>
        <coneGeometry args={[0.18, 0.32, 28]} />
        <meshStandardMaterial color="#242424" emissive="#ffd4a3" emissiveIntensity={0.12} roughness={0.82} metalness={0.14} />
      </mesh>
    </group>
  )
}

function HomeDeskSet({ lighting }: { lighting: RoomLighting }) {
  return (
    <>
      <mesh castShadow receiveShadow position={[0.9, 0.73, 0.12]}>
        <boxGeometry args={[3.5, 0.1, 1.85]} />
        <meshStandardMaterial color="#d5b184" roughness={0.9} metalness={0.03} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.9, 0.69, 0.99]}>
        <boxGeometry args={[3.5, 0.06, 0.12]} />
        <meshStandardMaterial color="#916a4e" roughness={0.94} metalness={0.03} />
      </mesh>

      {[
        [-0.6, 0.36, 0.8],
        [2.4, 0.36, 0.8],
        [-0.6, 0.36, -0.58],
        [2.4, 0.36, -0.58],
      ].map((pos, index) => (
        <mesh key={index} castShadow receiveShadow position={pos as [number, number, number]}>
          <boxGeometry args={[0.14, 0.72, 0.14]} />
          <meshStandardMaterial color="#866047" roughness={0.94} metalness={0.03} />
        </mesh>
      ))}

      <DeskMonitor position={[0.38, 0.73, 0.06]} rotation={[0, -0.1, 0]} />
      <DeskMonitor position={[1.12, 0.73, -0.08]} rotation={[0, 0.05, 0]} />
      <DeskLamp />

      <mesh castShadow receiveShadow position={[-0.02, 0.785, 0.62]} rotation={[0, -0.02, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.28]} />
        <meshStandardMaterial color="#2a2d31" roughness={0.82} metalness={0.08} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.46, 0.79, 0.54]} rotation={[0, 0.06, 0.1]}>
        <capsuleGeometry args={[0.082, 0.22, 8, 14]} />
        <meshStandardMaterial color="#343840" roughness={0.72} metalness={0.12} />
      </mesh>

      <mesh castShadow receiveShadow position={[0.72, 0.82, 0.72]} rotation={[0, -0.18, 0]}>
        <boxGeometry args={[0.62, 0.022, 0.44]} />
        <meshStandardMaterial color="#f4ede3" roughness={0.92} metalness={0.02} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.9, 0.835, 0.83]} rotation={[0, -0.18, 0]}>
        <boxGeometry args={[0.02, 0.008, 0.22]} />
        <meshStandardMaterial color="#2b2927" roughness={0.82} metalness={0.12} />
      </mesh>

      <DeskAccessory position={[1.9, 0.79, 0.58]} rotation={[0.02, -0.05, 0.08]} scale={[0.56, 0.03, 0.34]} color="#183971" />
      <DeskAccessory position={[1.96, 0.82, 0.52]} rotation={[0.02, -0.03, 0.08]} scale={[0.46, 0.03, 0.3]} color="#2f4054" />
      <DeskAccessory position={[2.0, 0.85, 0.48]} rotation={[0.04, -0.03, 0.08]} scale={[0.34, 0.02, 0.24]} color="#e7ddc6" />
      <DeskAccessory position={[2.02, 0.88, 0.56]} scale={[0.16, 0.012, 0.12]} color="#efe08d" />

      <mesh castShadow receiveShadow position={[1.86, 0.86, 0.18]}>
        <cylinderGeometry args={[0.11, 0.1, 0.18, 28]} />
        <meshStandardMaterial color="#857866" roughness={0.88} metalness={0.03} />
      </mesh>
      <mesh castShadow receiveShadow position={[1.86, 0.99, 0.18]}>
        <torusGeometry args={[0.055, 0.012, 16, 32]} />
        <meshStandardMaterial color="#857866" roughness={0.88} metalness={0.03} />
      </mesh>

      <mesh castShadow receiveShadow position={[-1.38, 0.52, 0.02]}>
        <boxGeometry args={[1.68, 0.42, 0.68]} />
        <meshStandardMaterial color="#d9d6ce" roughness={0.94} metalness={0.02} />
      </mesh>
      <mesh castShadow receiveShadow position={[-1.38, 0.78, -0.04]}>
        <boxGeometry args={[1.68, 0.12, 0.56]} />
        <meshStandardMaterial color="#d0cdc5" roughness={0.96} metalness={0.02} />
      </mesh>
      <mesh castShadow receiveShadow position={[-1.38, 0.64, -0.34]}>
        <boxGeometry args={[1.68, 0.26, 0.12]} />
        <meshStandardMaterial color="#d3d0c8" roughness={0.95} metalness={0.02} />
      </mesh>

      <mesh castShadow receiveShadow position={[-2.34, 0.34, 0.28]}>
        <cylinderGeometry args={[0.16, 0.2, 0.42, 24]} />
        <meshStandardMaterial color="#47483a" roughness={0.9} metalness={0.02} />
      </mesh>
      <mesh castShadow receiveShadow position={[-2.34, 0.96, 0.28]}>
        <sphereGeometry args={[0.44, 26, 22]} />
        <meshStandardMaterial color="#5d8342" roughness={0.92} metalness={0.02} />
      </mesh>

      <mesh castShadow receiveShadow position={[2.24, 1.0, -0.54]}>
        <boxGeometry args={[0.42, 0.62, 0.34]} />
        <meshStandardMaterial color="#877361" roughness={0.9} metalness={0.02} />
      </mesh>
      <DeskAccessory position={[2.12, 1.07, -0.49]} scale={[0.06, 0.52, 0.26]} color="#2b241f" />
      <DeskAccessory position={[2.22, 1.06, -0.52]} scale={[0.055, 0.48, 0.24]} color="#c7b79f" />
      <DeskAccessory position={[2.32, 1.07, -0.55]} scale={[0.05, 0.52, 0.22]} color="#5a4f43" />
      <DeskAccessory position={[2.4, 1.06, -0.57]} scale={[0.045, 0.5, 0.22]} color="#3d342d" />

      <mesh castShadow receiveShadow position={[1.92, 0.98, -1.04]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.08, 0.14]} />
        <meshStandardMaterial color="#cbc8c0" roughness={0.84} metalness={0.06} />
      </mesh>
      <mesh castShadow receiveShadow position={[2.08, 0.98, -1.12]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.18, 0.08, 0.14]} />
        <meshStandardMaterial color="#f4f0eb" roughness={0.84} metalness={0.06} />
      </mesh>

      <mesh position={[1.82, 1.98, -3.53]}>
        <boxGeometry args={[2.66, 1.68, 0.06]} />
        <meshStandardMaterial color={lighting.windowFrame} roughness={0.95} metalness={0.02} />
      </mesh>
      <mesh position={[1.82, 1.98, -3.49]}>
        <planeGeometry args={[2.26, 1.24]} />
        <meshStandardMaterial color={lighting.windowGlass} emissive={lighting.windowEmission} emissiveIntensity={0.32} roughness={0.72} metalness={0} />
      </mesh>
      <mesh position={[1.82, 1.98, -3.5]}>
        <boxGeometry args={[0.06, 1.32, 0.03]} />
        <meshStandardMaterial color={lighting.windowFrame} roughness={0.95} metalness={0.02} />
      </mesh>
      <mesh position={[1.82, 1.98, -3.5]}>
        <boxGeometry args={[2.28, 0.06, 0.03]} />
        <meshStandardMaterial color={lighting.windowFrame} roughness={0.95} metalness={0.02} />
      </mesh>
      <mesh castShadow receiveShadow position={[1.82, 1.18, -3.42]}>
        <boxGeometry args={[2.42, 0.08, 0.18]} />
        <meshStandardMaterial color="#eee5dc" roughness={0.94} metalness={0.02} />
      </mesh>
      <mesh position={[1.44, 2.22, -3.48]} rotation={[0, 0, 0.18]}>
        <planeGeometry args={[1.08, 0.92]} />
        <meshBasicMaterial color="#7ea25b" transparent opacity={0.14} />
      </mesh>
      <mesh position={[2.24, 2.16, -3.48]} rotation={[0, 0, -0.14]}>
        <planeGeometry args={[0.96, 0.82]} />
        <meshBasicMaterial color="#84aa5d" transparent opacity={0.1} />
      </mesh>

      <mesh castShadow receiveShadow position={[-0.86, 2.26, -3.28]}>
        <planeGeometry args={[0.92, 1.28]} />
        <meshStandardMaterial color="#dccfbb" roughness={0.96} metalness={0} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.86, 2.26, -3.26]}>
        <planeGeometry args={[0.64, 0.96]} />
        <meshStandardMaterial color="#274082" roughness={0.96} metalness={0} />
      </mesh>
    </>
  )
}

function SceneEnvironment() {
  const [lighting, setLighting] = useState<RoomLighting>(() =>
    buildLighting(new Date().getHours() + new Date().getMinutes() / 60, 'clear'),
  )

  useEffect(() => {
    let cancelled = false
    let intervalId: number | undefined
    const fallbackLatitude = 31.2304
    const fallbackLongitude = 121.4737

    const refreshLighting = async (latitude?: number, longitude?: number) => {
      const currentHour = new Date().getHours() + new Date().getMinutes() / 60
      let weather: WeatherProfile = 'clear'

      if (latitude != null && longitude != null) {
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code`,
          )
          const data = await response.json()
          weather = classifyWeather(
            typeof data?.current?.weather_code === 'number' ? data.current.weather_code : null,
          )
        } catch (error) {
          console.warn('Flowbot lighting weather fetch failed', error)
        }
      }

      if (!cancelled) {
        setLighting(buildLighting(currentHour, weather))
      }
    }

    const updateFromEnvironment = () => {
      if (!navigator.geolocation) {
        void refreshLighting(fallbackLatitude, fallbackLongitude)
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          void refreshLighting(position.coords.latitude, position.coords.longitude)
        },
        () => {
          void refreshLighting(fallbackLatitude, fallbackLongitude)
        },
        {
          enableHighAccuracy: false,
          maximumAge: 1000 * 60 * 30,
          timeout: 4000,
        },
      )
    }

    updateFromEnvironment()
    intervalId = window.setInterval(updateFromEnvironment, 1000 * 60 * 20)

    return () => {
      cancelled = true
      if (intervalId != null) {
        window.clearInterval(intervalId)
      }
    }
  }, [])

  return (
    <>
      <color attach="background" args={[lighting.background]} />
      <fog attach="fog" args={[lighting.fog, 6.2, 14]} />

      <ambientLight intensity={lighting.ambientIntensity} />
      <directionalLight
        castShadow
        intensity={lighting.sunIntensity}
        position={lighting.sunPosition}
        color={lighting.sunColor}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0.32, 2.12, -0.06]} intensity={lighting.lampIntensity} color={lighting.lampColor} distance={5.2} />
      <pointLight position={[1.92, 2.24, -2.1]} intensity={lighting.coolFillIntensity} color={lighting.coolFillColor} distance={6.8} />
      <pointLight position={[2.5, 1.2, 1.2]} intensity={1} color="#ee8ea0" distance={4.8} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={lighting.floor} roughness={0.98} metalness={0.02} />
      </mesh>

      <mesh position={[0.2, 3.52, -3.6]} receiveShadow>
        <planeGeometry args={[7.4, 1.36]} />
        <meshStandardMaterial color={lighting.wall} roughness={0.98} metalness={0} />
      </mesh>
      <mesh position={[0.2, 0.3, -3.6]} receiveShadow>
        <planeGeometry args={[7.4, 1.6]} />
        <meshStandardMaterial color={lighting.wall} roughness={0.98} metalness={0} />
      </mesh>
      <mesh position={[-1.37, 1.98, -3.6]} receiveShadow>
        <planeGeometry args={[4.26, 1.68]} />
        <meshStandardMaterial color={lighting.wall} roughness={0.98} metalness={0} />
      </mesh>
      <mesh position={[3.26, 1.98, -3.6]} receiveShadow>
        <planeGeometry args={[1.48, 1.68]} />
        <meshStandardMaterial color={lighting.wall} roughness={0.98} metalness={0} />
      </mesh>

      <mesh position={[-3.58, 1.9, -1.05]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4.9, 4.9]} />
        <meshStandardMaterial color={lighting.sideWall} roughness={0.98} metalness={0} />
      </mesh>
      <mesh position={[0.2, 3.62, -2.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.9, 2.5]} />
        <meshStandardMaterial color={lighting.ceiling} roughness={1} metalness={0} />
      </mesh>

      <HomeDeskSet lighting={lighting} />
    </>
  )
}

export function FlowbotScene({ motion }: FlowbotSceneProps) {
  return (
    <div className="flowbot-canvas-wrap">
      <Canvas camera={{ position: [5.1, 3.35, 5.9], fov: 25 }} shadows dpr={[1, 1.8]}>
        <SceneEnvironment />
        <So101Robot motion={motion} />
        <ContactShadows position={[1.32, 0.772, 0.72]} opacity={0.18} scale={2.2} blur={2.8} />
        <OrbitControls
          enablePan={false}
          minDistance={4.6}
          maxDistance={9}
          minPolarAngle={0.92}
          maxPolarAngle={1.16}
          target={[0.82, 1.08, 0.1]}
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
