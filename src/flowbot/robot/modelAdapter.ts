/**
 * Future model swap point.
 *
 * When replacing the procedural arm with a GLB/GLTF model, map the imported
 * scene's node names to these semantic joints so motion code can stay stable.
 */
export type FlowbotModelAdapter = {
  base: string
  shoulder: string
  elbow: string
  wrist: string
  gripper: string
}

export const defaultModelAdapter: FlowbotModelAdapter = {
  base: 'shoulder_pan',
  shoulder: 'shoulder_lift',
  elbow: 'elbow_flex',
  wrist: 'wrist_flex',
  gripper: 'gripper',
}
