import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CockroachPolitician({ 
  bgmActive = false, 
  scuttleActive = false, 
  isSpeaking = false,
  position = [1.8, -0.6, 0.2],
  scale = [1.45, 1.45, 1.45],
  onClick
}) {
  const groupRef = useRef()
  const headRef = useRef()
  const leftAntennaRef = useRef()
  const rightAntennaRef = useRef()
  const mandiblesRef = useRef()
  const rightArmRef = useRef()
  const leftArmRef = useRef()
  const podiumRef = useRef()

  // Physics-based interactive variables
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const mouse = state.mouse

    // 1. Overall Bobbing & Mouse Look-At
    if (groupRef.current) {
      // Gentle breathing/bobbing
      groupRef.current.position.y = -0.6 + Math.sin(time * 1.5) * 0.02
      // Look at mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.3, 0.08)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.1, 0.08)
    }

    // 2. Head Shake & Speak Speech animation
    if (headRef.current) {
      if (isSpeaking) {
        // Shaking head while talking
        headRef.current.rotation.y = Math.sin(time * 15) * 0.05
        headRef.current.rotation.z = Math.cos(time * 12) * 0.03
        headRef.current.position.y = Math.sin(time * 20) * 0.01
      } else {
        headRef.current.rotation.y = 0
        headRef.current.rotation.z = 0
        headRef.current.position.y = 0
      }
    }

    // 3. Mandibles (Mouth) wiggling
    if (mandiblesRef.current) {
      const wiggleSpeed = isSpeaking ? 30 : (scuttleActive ? 20 : 3)
      const wiggleAmp = isSpeaking ? 0.15 : (scuttleActive ? 0.08 : 0.02)
      mandiblesRef.current.rotation.z = Math.sin(time * wiggleSpeed) * wiggleAmp
      mandiblesRef.current.scale.setScalar(1 + Math.sin(time * wiggleSpeed) * 0.05)
    }

    // 4. Antennae wiggling
    const antSpeed = scuttleActive ? 35 : (isSpeaking ? 22 : 10)
    const antAmp = scuttleActive ? 0.35 : (isSpeaking ? 0.2 : 0.1)
    if (leftAntennaRef.current) {
      leftAntennaRef.current.rotation.z = Math.sin(time * antSpeed) * antAmp + 0.15
      leftAntennaRef.current.rotation.x = Math.cos(time * (antSpeed - 2)) * (antAmp * 0.5)
    }
    if (rightAntennaRef.current) {
      rightAntennaRef.current.rotation.z = -Math.sin(time * (antSpeed + 1)) * antAmp - 0.15
      rightAntennaRef.current.rotation.x = -Math.cos(time * (antSpeed - 1)) * (antAmp * 0.5)
    }

    // 5. Right Pointing Arm gesture
    if (rightArmRef.current) {
      const gSpeed = isSpeaking ? 8 : 2
      const gAmp = isSpeaking ? 0.15 : 0.03
      rightArmRef.current.rotation.z = Math.sin(time * gSpeed) * gAmp - 0.1
      rightArmRef.current.rotation.x = Math.cos(time * gSpeed) * gAmp + 0.2
    }

    // 6. Left Arm subtle sway
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 2) * 0.02
    }

    // 7. Podium vibration on BGM/threat
    if (podiumRef.current && (bgmActive || scuttleActive)) {
      podiumRef.current.position.y = -0.9 + Math.sin(time * 60) * 0.004
    }
  })

  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Muted warm light sources for retro paper look */}
      <pointLight position={[0, 0.7, 0.6]} intensity={6.0} color="#E9C46A" distance={5} />
      <pointLight position={[-0.5, 0.2, 0.7]} intensity={5.0} color="#E26D5C" distance={4} />
      <pointLight position={[0.5, 0.2, 0.7]} intensity={5.0} color="#4F772D" distance={4} />
      <directionalLight position={[0, 2, 2]} intensity={2.0} color="#ffffff" />

      {/* Main 3D Cockroach Politician Character with hand-drawn ink outlines */}
      <group ref={groupRef}>
        
        {/* Head Group */}
        <group ref={headRef} position={[0, 0.18, 0]}>
          {/* Triangular Cockroach Head (Brown ink and wireframe) */}
          <group>
            <mesh castShadow>
              <coneGeometry args={[0.16, 0.32, 5]} />
              <meshStandardMaterial color="#BD8057" roughness={0.95} metalness={0.05} />
            </mesh>
            <mesh scale={[1.04, 1.04, 1.04]}>
              <coneGeometry args={[0.16, 0.32, 5]} />
              <meshBasicMaterial color="#1E1E1E" wireframe={true} />
            </mesh>
          </group>

          {/* Left Eye (Sketch sphere with yellow wireframe highlight) */}
          <group position={[-0.08, -0.02, 0.08]}>
            <mesh castShadow>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshStandardMaterial color="#1E1E1E" roughness={0.9} metalness={0.1} />
            </mesh>
            <mesh scale={[1.05, 1.05, 1.05]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color="#E9C46A" wireframe={true} />
            </mesh>
          </group>

          {/* Right Eye */}
          <group position={[0.08, -0.02, 0.08]}>
            <mesh castShadow>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshStandardMaterial color="#1E1E1E" roughness={0.9} metalness={0.1} />
            </mesh>
            <mesh scale={[1.05, 1.05, 1.05]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color="#E9C46A" wireframe={true} />
            </mesh>
          </group>

          {/* Mandibles / Mouthparts */}
          <group ref={mandiblesRef} position={[0, -0.16, 0.07]}>
            {/* Left mandible */}
            <group position={[-0.02, 0, 0]} rotation={[0.2, 0, 0.1]}>
              <mesh>
                <boxGeometry args={[0.025, 0.04, 0.015]} />
                <meshStandardMaterial color="#90552b" roughness={0.9} />
              </mesh>
              <mesh scale={[1.05, 1.05, 1.05]}>
                <boxGeometry args={[0.025, 0.04, 0.015]} />
                <meshBasicMaterial color="#1E1E1E" wireframe={true} />
              </mesh>
            </group>
            {/* Right mandible */}
            <group position={[0.02, 0, 0]} rotation={[0.2, 0, -0.1]}>
              <mesh>
                <boxGeometry args={[0.025, 0.04, 0.015]} />
                <meshStandardMaterial color="#90552b" roughness={0.9} />
              </mesh>
              <mesh scale={[1.05, 1.05, 1.05]}>
                <boxGeometry args={[0.025, 0.04, 0.015]} />
                <meshBasicMaterial color="#1E1E1E" wireframe={true} />
              </mesh>
            </group>
          </group>

          {/* Antennae (Thin charcoal drawing lines) */}
          <group position={[0, 0.14, 0]}>
            {/* Left Antenna */}
            <group ref={leftAntennaRef} rotation={[0.5, 0, 0.3]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.005, 0.002, 0.7, 5]} />
                <meshStandardMaterial color="#1E1E1E" roughness={0.9} />
              </mesh>
            </group>
            {/* Right Antenna */}
            <group ref={rightAntennaRef} rotation={[0.5, 0, -0.3]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.005, 0.002, 0.7, 5]} />
                <meshStandardMaterial color="#1E1E1E" roughness={0.9} />
              </mesh>
            </group>
          </group>
        </group>

        {/* Neck */}
        <group position={[0, 0.02, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.07, 0.08, 0.08, 8]} />
            <meshStandardMaterial color="#BD8057" roughness={0.95} />
          </mesh>
          <mesh scale={[1.04, 1.04, 1.04]}>
            <cylinderGeometry args={[0.07, 0.08, 0.08, 8]} />
            <meshBasicMaterial color="#1E1E1E" wireframe={true} />
          </mesh>
        </group>

        {/* White shirt collar */}
        <group position={[0, 0.01, 0.05]}>
          <group position={[-0.05, 0, 0]} rotation={[0.2, 0.1, -0.4]}>
            <mesh>
              <boxGeometry args={[0.08, 0.05, 0.01]} />
              <meshStandardMaterial color="#FDFBF7" roughness={0.9} />
            </mesh>
            <mesh scale={[1.05, 1.05, 1.05]}>
              <boxGeometry args={[0.08, 0.05, 0.01]} />
              <meshBasicMaterial color="#1E1E1E" wireframe={true} />
            </mesh>
          </group>
          <group position={[0.05, 0, 0]} rotation={[0.2, -0.1, 0.4]}>
            <mesh>
              <boxGeometry args={[0.08, 0.05, 0.01]} />
              <meshStandardMaterial color="#FDFBF7" roughness={0.9} />
            </mesh>
            <mesh scale={[1.05, 1.05, 1.05]}>
              <boxGeometry args={[0.08, 0.05, 0.01]} />
              <meshBasicMaterial color="#1E1E1E" wireframe={true} />
            </mesh>
          </group>
          
          {/* Saffron Tie */}
          <group position={[0, -0.06, 0.015]} rotation={[0.1, 0, 0]}>
            <mesh castShadow>
              <coneGeometry args={[0.022, 0.15, 4]} />
              <meshStandardMaterial color="#E26D5C" roughness={0.9} />
            </mesh>
            <mesh scale={[1.06, 1.06, 1.06]}>
              <coneGeometry args={[0.022, 0.15, 4]} />
              <meshBasicMaterial color="#1E1E1E" wireframe={true} />
            </mesh>
          </group>
        </group>

        {/* Body Torso - Charcoal Business Suit */}
        <group position={[0, -0.35, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.18, 0.22, 0.65, 10]} />
            <meshStandardMaterial color="#3D405B" roughness={0.9} metalness={0.1} />
          </mesh>
          <mesh scale={[1.03, 1.03, 1.03]}>
            <cylinderGeometry args={[0.18, 0.22, 0.65, 10]} />
            <meshBasicMaterial color="#1E1E1E" wireframe={true} />
          </mesh>
        </group>

        {/* Left Shoulder & Arm (Relaxed) */}
        <group ref={leftArmRef} position={[-0.22, -0.18, 0]} rotation={[0.1, 0, 0.15]}>
          <group>
            <mesh castShadow>
              <cylinderGeometry args={[0.045, 0.035, 0.35, 8]} />
              <meshStandardMaterial color="#3D405B" roughness={0.9} />
            </mesh>
            <mesh scale={[1.04, 1.04, 1.04]}>
              <cylinderGeometry args={[0.045, 0.035, 0.35, 8]} />
              <meshBasicMaterial color="#1E1E1E" wireframe={true} />
            </mesh>
          </group>
          {/* Lower Arm */}
          <group position={[0, -0.22, 0]} rotation={[0.2, 0, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.035, 0.025, 0.3, 8]} />
              <meshStandardMaterial color="#BD8057" roughness={0.9} />
            </mesh>
            <mesh scale={[1.04, 1.04, 1.04]}>
              <cylinderGeometry args={[0.035, 0.025, 0.3, 8]} />
              <meshBasicMaterial color="#1E1E1E" wireframe={true} />
            </mesh>
          </group>
        </group>

        {/* Right Shoulder & Arm (Gesturing/Pointing in the air) */}
        <group ref={rightArmRef} position={[0.22, -0.18, 0.05]} rotation={[-0.2, -0.4, -0.3]}>
          {/* Upper Arm in Suit */}
          <group>
            <mesh castShadow>
              <cylinderGeometry args={[0.045, 0.038, 0.32, 8]} />
              <meshStandardMaterial color="#3D405B" roughness={0.9} />
            </mesh>
            <mesh scale={[1.04, 1.04, 1.04]}>
              <cylinderGeometry args={[0.045, 0.038, 0.32, 8]} />
              <meshBasicMaterial color="#1E1E1E" wireframe={true} />
            </mesh>
          </group>
          
          {/* Lower Arm (Pointing upwards) */}
          <group position={[0.02, 0.2, 0.15]} rotation={[-0.9, 0.2, 0]}>
            <group>
              <mesh castShadow>
                <cylinderGeometry args={[0.035, 0.028, 0.32, 8]} />
                <meshStandardMaterial color="#BD8057" roughness={0.9} />
              </mesh>
              <mesh scale={[1.04, 1.04, 1.04]}>
                <cylinderGeometry args={[0.035, 0.028, 0.32, 8]} />
                <meshBasicMaterial color="#1E1E1E" wireframe={true} />
              </mesh>
            </group>

            {/* Pointing Index Finger */}
            <group position={[0, 0.18, 0.02]} rotation={[0.4, 0, 0]}>
              {/* Main Pointing Finger */}
              <group>
                <mesh castShadow>
                  <cylinderGeometry args={[0.009, 0.007, 0.12, 5]} />
                  <meshStandardMaterial color="#BD8057" roughness={0.9} />
                </mesh>
                <mesh scale={[1.05, 1.05, 1.05]}>
                  <cylinderGeometry args={[0.009, 0.007, 0.12, 5]} />
                  <meshBasicMaterial color="#1E1E1E" wireframe={true} />
                </mesh>
              </group>
              {/* Folded remaining fingers */}
              <group position={[-0.015, -0.04, 0]} rotation={[1.2, 0, 0]}>
                <mesh castShadow>
                  <sphereGeometry args={[0.018, 8, 8]} />
                  <meshStandardMaterial color="#BD8057" roughness={0.9} />
                </mesh>
                <mesh scale={[1.05, 1.05, 1.05]}>
                  <sphereGeometry args={[0.018, 8, 8]} />
                  <meshBasicMaterial color="#1E1E1E" wireframe={true} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Cyber Political Podium Standing in Front */}
      <group ref={podiumRef} position={[0, -0.9, 0.45]} scale={[0.9, 0.9, 0.9]}>
        {/* Podium base column */}
        <group position={[0, 0.28, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.26, 0.55, 8]} />
            <meshStandardMaterial color="#FAF6EE" roughness={0.9} />
          </mesh>
          <mesh scale={[1.03, 1.03, 1.03]}>
            <cylinderGeometry args={[0.22, 0.26, 0.55, 8]} />
            <meshBasicMaterial color="#1E1E1E" wireframe={true} />
          </mesh>
        </group>
        
        {/* Glowing front shield */}
        <group position={[0, 0.3, 0.12]}>
          <mesh castShadow>
            <boxGeometry args={[0.34, 0.5, 0.04]} />
            <meshStandardMaterial color="#FAF6EE" roughness={0.9} />
          </mesh>
          <mesh scale={[1.03, 1.03, 1.03]}>
            <boxGeometry args={[0.34, 0.5, 0.04]} />
            <meshBasicMaterial color="#1E1E1E" wireframe={true} />
          </mesh>
        </group>

        {/* Indian Tricolor Circle Emblem on Podium (Retro Palette) */}
        <group position={[0, 0.3, 0.155]}>
          {/* Orange outer circle */}
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[0.08, 0.1, 16]} />
            <meshBasicMaterial color="#E26D5C" />
          </mesh>
          {/* White inner circle */}
          <mesh position={[0, 0, 0.001]}>
            <ringGeometry args={[0.06, 0.08, 16]} />
            <meshBasicMaterial color="#FDFBF7" />
          </mesh>
          {/* Green center circle */}
          <mesh position={[0, 0, 0.002]}>
            <ringGeometry args={[0.04, 0.06, 16]} />
            <meshBasicMaterial color="#4F772D" />
          </mesh>
          {/* Outer Ring Outline */}
          <mesh position={[0, 0, -0.001]}>
            <ringGeometry args={[0.04, 0.105, 16]} />
            <meshBasicMaterial color="#1E1E1E" />
          </mesh>
        </group>
        
        {/* Podium top board */}
        <group position={[0, 0.56, -0.04]} rotation={[0.15, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.05, 0.35]} />
            <meshStandardMaterial color="#BD8057" roughness={0.9} />
          </mesh>
          <mesh scale={[1.02, 1.02, 1.02]}>
            <boxGeometry args={[0.55, 0.05, 0.35]} />
            <meshBasicMaterial color="#1E1E1E" wireframe={true} />
          </mesh>
        </group>

        {/* Small Dual Microphones */}
        <group position={[-0.12, 0.65, 0.05]} rotation={[-0.4, 0.3, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.006, 0.006, 0.2, 4]} />
            <meshStandardMaterial color="#1E1E1E" />
          </mesh>
        </group>
        <group position={[0.12, 0.65, 0.05]} rotation={[-0.4, -0.3, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.006, 0.006, 0.2, 4]} />
            <meshStandardMaterial color="#1E1E1E" />
          </mesh>
        </group>
      </group>
    </group>
  )
}
