export type MotionId = 'idle' | 'wave' | 'point' | 'greet' | 'bow' | 'highfive'

type Pose = {
  base: number
  shoulder: number
  elbow: number
  wrist: number
  wristRoll: number
  gripperOpen: number
}

const idlePose: Pose = {
  base: 0.2,
  shoulder: -0.2,
  elbow: 0.45,
  wrist: 0.18,
  wristRoll: 0,
  gripperOpen: 0.18,
}

export function pickMotionFromPrompt(prompt: string): MotionId {
  const value = prompt.toLowerCase()
  if (value.includes('wave')) return 'wave'
  if (value.includes('point')) return 'point'
  if (value.includes('high five') || value.includes('high-five') || value.includes('highfive')) {
    return 'highfive'
  }
  if (value.includes('greet') || value.includes('hello') || value.includes('hi')) return 'greet'
  if (value.includes('bow')) return 'bow'
  return 'idle'
}

export function getMotionPose(motion: MotionId, time: number): Pose {
  switch (motion) {
    case 'wave':
      return {
        base: 0.35,
        shoulder: -0.55,
        elbow: 1.1,
        wrist: -0.2,
        wristRoll: Math.sin(time * 6) * 0.72,
        gripperOpen: 0.38,
      }
    case 'point':
      return {
        base: -0.45,
        shoulder: -0.22,
        elbow: 0.18,
        wrist: -0.85,
        wristRoll: 0.15,
        gripperOpen: 0.8,
      }
    case 'greet':
      return {
        base: 0.18 + Math.sin(time * 2.5) * 0.08,
        shoulder: -0.4,
        elbow: 0.9,
        wrist: -0.15,
        wristRoll: Math.sin(time * 5) * 0.24,
        gripperOpen: 0.3,
      }
    case 'bow':
      return {
        base: 0,
        shoulder: -0.85 + Math.sin(time * 2) * 0.04,
        elbow: 0.55,
        wrist: 0.15,
        wristRoll: 0,
        gripperOpen: 0.12,
      }
    case 'highfive':
      return {
        base: 0.08 + Math.sin(time * 1.8) * 0.03,
        shoulder: -1.22,
        elbow: 0.42 + Math.sin(time * 3.2) * 0.04,
        wrist: -0.22,
        wristRoll: 1.18 + Math.sin(time * 4.8) * 0.08,
        gripperOpen: 0.95,
      }
    default:
      return {
        base: idlePose.base + Math.sin(time * 0.7) * 0.03,
        shoulder: idlePose.shoulder + Math.sin(time * 0.9) * 0.04,
        elbow: idlePose.elbow + Math.sin(time * 0.8) * 0.05,
        wrist: idlePose.wrist + Math.sin(time * 1.2) * 0.03,
        wristRoll: Math.sin(time * 0.65) * 0.04,
        gripperOpen: idlePose.gripperOpen,
      }
  }
}
