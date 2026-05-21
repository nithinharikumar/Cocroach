import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js'

export default function AntigravitySwarm({ count = 800, scuttleActive = false, speedMultiplier = 1 }) {
  const mesh = useRef()

  // Initialize Perlin Noise
  const perlin = useMemo(() => new ImprovedNoise(), [])
  
  // Single reusable Vector3 / Object3D instances for high performance
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const tempPos = useMemo(() => new THREE.Vector3(), [])
  const tempDir = useMemo(() => new THREE.Vector3(), [])
  const closestPoint = useMemo(() => new THREE.Vector3(), [])

  // Generate initial particle properties with a seedable PRNG to maintain purity during render
  const particles = useMemo(() => {
    // Pure stateless hash function to satisfy react-hooks/purity
    const hash = (x, seed = 0) => {
      const h = Math.sin(x * 12.9898 + seed * 78.233) * 43758.5453
      return h - Math.floor(h)
    }

    const temp = []
    for (let i = 0; i < count; i++) {
      const factor = hash(i, 1) * 100
      const speed = 0.008 + hash(i, 2) * 0.012 // base upward drift speed
      // Distribute in a wider area to cover screen edges
      const x = (hash(i, 3) - 0.5) * 12
      const y = (hash(i, 4) - 0.5) * 10
      const z = (hash(i, 5) - 0.5) * 6 - 2 // slightly depth-distributed
      const scale = 0.45 + hash(i, 6) * 0.75 // varied sizes
      const repulsion = new THREE.Vector3(0, 0, 0)
      
      // Assign color preference (ink charcoal 70%, retro saffron 20%, retro yellow 10%)
      const r = hash(i, 7)
      const color = r < 0.7 
        ? new THREE.Color('#1E1E1E') 
        : r < 0.9 
          ? new THREE.Color('#E26D5C') 
          : new THREE.Color('#E9C46A')
      
      temp.push({ factor, speed, x, y, z, scale, repulsion, color })
    }
    return temp
  }, [count])

  // Apply colors once after mounting
  useEffect(() => {
    if (mesh.current) {
      particles.forEach((particle, i) => {
        mesh.current.setColorAt(i, particle.color)
      })
      mesh.current.instanceColor.needsUpdate = true
    }
  }, [particles])

  // Animate particles moving upward with noise, mouse repulsion, and scuttle alarm
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const ray = state.raycaster.ray
    const mouse = state.mouse

    // Check if mouse is on screen
    const isMouseActive = Math.abs(mouse.x) < 0.99 && Math.abs(mouse.y) < 0.99

    // Calculate effective speed based on multiplier
    const effSpeedMult = scuttleActive ? 3.5 : speedMultiplier

    particles.forEach((particle, i) => {
      // 1. Upward drift logic (scaled by speed multiplier)
      particle.y += particle.speed * effSpeedMult
      // Wrap around from top back to bottom
      if (particle.y > 6) {
        particle.y = -6
        // Use a deterministic wrapping offset to avoid Math.random during render
        particle.x = ((particle.factor * 17.5) % 12) - 6
      }

      // 2. 3D Noise for wavy, turbulence flow (frequency and speed affected by speedMultiplier)
      const noiseFreq = 0.15
      const noiseTimeScale = 0.3 * effSpeedMult
      const noiseX = perlin.noise(particle.x * noiseFreq, particle.y * noiseFreq + time * noiseTimeScale, particle.z * noiseFreq) * 1.8
      const noiseZ = perlin.noise(particle.z * noiseFreq, particle.y * noiseFreq - time * noiseTimeScale, particle.x * noiseFreq) * 1.8
      
      const basePosX = particle.x + noiseX
      const basePosY = particle.y
      const basePosZ = particle.z + noiseZ

      // 3. Mouse Ray Repulsion / Scuttle Alarm
      tempPos.set(
        basePosX + particle.repulsion.x,
        basePosY + particle.repulsion.y,
        basePosZ + particle.repulsion.z
      )

      if (scuttleActive) {
        // If alarm is triggered, scatter outwards rapidly in random directions
        const scatterAngle = particle.factor * 10 + time * 5
        const scatterSpeed = 0.35 * effSpeedMult
        particle.repulsion.x += Math.cos(scatterAngle) * scatterSpeed
        particle.repulsion.y += Math.sin(scatterAngle) * scatterSpeed + ((particle.factor % 1) - 0.5) * 0.1
        particle.repulsion.z += ((particle.factor * 2.5 % 1) - 0.5) * scatterSpeed
      } else if (isMouseActive) {
        const distToRay = ray.distanceToPoint(tempPos)
        
        // Repulsion radius of 2.2 units
        if (distToRay < 2.2) {
          ray.closestPointToPoint(tempPos, closestPoint)
          tempDir.subVectors(tempPos, closestPoint)
          
          const distance = tempDir.length()
          if (distance > 0.001) {
            tempDir.normalize()
            // Repel force scaled slightly with speedMultiplier for hyper responsiveness
            const force = (2.2 - distance) * 0.08 * (1 + (effSpeedMult - 1) * 0.2)
            particle.repulsion.addScaledVector(tempDir, force)
          }
        }
      }

      // Decelerate and return to noise path (damping)
      const damping = scuttleActive ? 0.95 : 0.92
      particle.repulsion.multiplyScalar(damping)
      
      // Limit maximum repulsion offset so particles stay relatively bounded
      const maxRepulsion = scuttleActive ? 8 : 5
      particle.repulsion.clampLength(0, maxRepulsion)

      // Final rendering position
      const finalX = basePosX + particle.repulsion.x
      const finalY = basePosY + particle.repulsion.y
      const finalZ = basePosZ + particle.repulsion.z

      // 4. Skittering rotation
      const wiggleSpeed = (scuttleActive ? 25 : 12) * Math.sqrt(effSpeedMult)
      const wiggleAmp = scuttleActive ? 0.8 : 0.25 * effSpeedMult
      const wiggleX = Math.sin(time * wiggleSpeed + particle.factor) * wiggleAmp
      const wiggleY = time * particle.speed * 8 * effSpeedMult + Math.cos(time * (wiggleSpeed - 2) + particle.factor) * (wiggleAmp * 1.5)
      const wiggleZ = Math.sin(time * (wiggleSpeed + 3) + particle.factor) * wiggleAmp

      dummy.position.set(finalX, finalY, finalZ)
      dummy.rotation.set(wiggleX, wiggleY, wiggleZ)
      dummy.scale.setScalar(particle.scale)
      dummy.updateMatrix()
      
      mesh.current.setMatrixAt(i, dummy.matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      {/* 3-sided cone represents a low-poly cockroach shape */}
      <coneGeometry args={[0.07, 0.24, 3]} />
      <meshBasicMaterial 
        wireframe={true}
      />
    </instancedMesh>
  )
}
