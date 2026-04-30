export type MotionId = 'idle' | 'wave' | 'point' | 'greet' | 'bow'

type Pose = {
  base: number
  shoulder: number
  elbow: number
  wrist: number
  gripper: number
}

const idlePose: Pose = {
  base: 0.2,
  shoulder: -0.2,
  elbow: 0.45,
  wrist: 0.18,
  gripper: 0,
}

export function pickMotionFromPrompt(prompt: string): MotionId {
  const value = prompt.toLowerCase()
  if (value.includes('wave')) return 'wave'
  if (value.includes('point')) return 'point'
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
        wrist: Math.sin(time * 6) * 0.65,
        gripper: Math.sin(time * 6) * 0.12,
      }
    case 'point':
      return {
        base: -0.45,
        shoulder: -0.22,
        elbow: 0.18,
        wrist: -0.85,
        gripper: 0.08,
      }
    case 'greet':
      return {
        base: 0.18 + Math.sin(time * 2.5) * 0.08,
        shoulder: -0.4,
        elbow: 0.9,
        wrist: Math.sin(time * 5) * 0.2,
        gripper: 0,
      }
    case 'bow':
      return {
        base: 0,
        shoulder: -0.85 + Math.sin(time * 2) * 0.04,
        elbow: 0.55,
        wrist: 0.15,
        gripper: 0,
      }
    default:
      return {
        base: idlePose.base + Math.sin(time * 0.7) * 0.03,
        shoulder: idlePose.shoulder + Math.sin(time * 0.9) * 0.04,
        elbow: idlePose.elbow + Math.sin(time * 0.8) * 0.05,
        wrist: idlePose.wrist + Math.sin(time * 1.2) * 0.03,
        gripper: 0,
      }
  }
}
