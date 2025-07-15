"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

export function NetworkAnimation() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  // Generate random points
  const points = useMemo(() => {
    const temp = new Float32Array(100 * 3)
    for (let i = 0; i < 100; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 10
      temp[i * 3 + 1] = (Math.random() - 0.5) * 10
      temp[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return temp
  }, [])

  // Generate connections between nearby points
  const lines = useMemo(() => {
    const linePoints = []
    const positions = []

    for (let i = 0; i < points.length; i += 3) {
      positions.push(new THREE.Vector3(points[i], points[i + 1], points[i + 2]))
    }

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const distance = positions[i].distanceTo(positions[j])
        if (distance < 3) {
          linePoints.push(positions[i].x, positions[i].y, positions[i].z)
          linePoints.push(positions[j].x, positions[j].y, positions[j].z)
        }
      }
    }

    return new Float32Array(linePoints)
  }, [points])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.1
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
    if (linesRef.current) {
      linesRef.current.rotation.x = state.clock.elapsedTime * 0.1
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <>
      <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#60a5fa" size={0.05} sizeAttenuation={true} depthWrite={false} />
      </Points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#60a5fa" transparent opacity={0.3} />
      </lineSegments>
    </>
  )
}
