import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Pose utilities for warping
export type Keypoint = { x: number; y: number; score?: number }
export type PoseLandmarks = Record<string, Keypoint>

export function computeTorsoQuad(landmarks: PoseLandmarks) {
  const leftShoulder = landmarks["left_shoulder"]
  const rightShoulder = landmarks["right_shoulder"]
  const leftHip = landmarks["left_hip"]
  const rightHip = landmarks["right_hip"]
  if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) return null
  return [
    { x: leftShoulder.x, y: leftShoulder.y },
    { x: rightShoulder.x, y: rightShoulder.y },
    { x: rightHip.x, y: rightHip.y },
    { x: leftHip.x, y: leftHip.y },
  ]
}
