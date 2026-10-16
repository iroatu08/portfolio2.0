import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { gsap, withMotionPreference } from '@/shared/motion/gsapSetup'
import * as THREE from 'three'

type CameraRigProps = {
  target: [number, number, number] | null
  lookAt?: [number, number, number]
}

/**
 * Tweens the perspective camera toward a target with GSAP when focus changes.
 */
export function CameraRig({ target, lookAt = [0, 0.5, 0] }: CameraRigProps): null {
  const { camera } = useThree()
  const lookRef = useRef(new THREE.Vector3(...lookAt))

  useEffect(() => {
    lookRef.current.set(...lookAt)
    const destination = target ?? ([0, 1.6, 7] as [number, number, number])
    const media = withMotionPreference(
      () => {
        gsap.to(camera.position, {
          x: destination[0],
          y: destination[1],
          z: destination[2],
          duration: 1.1,
          ease: 'power3.inOut',
          onUpdate: () => {
            camera.lookAt(lookRef.current)
          },
        })
      },
      () => {
        camera.position.set(...destination)
        camera.lookAt(lookRef.current)
      },
    )
    return () => {
      media.revert()
      gsap.killTweensOf(camera.position)
    }
  }, [camera, target, lookAt])

  return null
}
