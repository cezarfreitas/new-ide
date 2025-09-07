'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

// Floating Cubes Component
function FloatingCube({ position, rotationSpeed = 0.01, floatSpeed = 0.5 }: { 
  position: [number, number, number], 
  rotationSpeed?: number, 
  floatSpeed?: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.5;
      
      // Floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * floatSpeed) * 0.5;
    }
  });

  return (
    <Box ref={meshRef} position={position} args={[1, 1, 1]}>
      <meshStandardMaterial 
        color="#fbbf24" 
        transparent 
        opacity={0.3}
        wireframe={true}
        emissive="#fbbf24"
        emissiveIntensity={0.1}
      />
    </Box>
  );
}

// Animated Lines Component
function AnimatedLine({ start, end, color = "#fbbf24" }: { 
  start: [number, number, number], 
  end: [number, number, number], 
  color?: string 
}) {
  const points = useMemo(() => [start, end], [start, end]);
  
  return (
    <Line
      points={points}
      color={color}
      lineWidth={2}
      transparent
      opacity={0.4}
    />
  );
}

// Floating Spheres Component
function FloatingSphere({ position, size = 0.3 }: { 
  position: [number, number, number], 
  size?: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[size, 16, 16]}>
      <meshStandardMaterial 
        color="#f59e0b" 
        transparent 
        opacity={0.2}
        wireframe={true}
        emissive="#f59e0b"
        emissiveIntensity={0.05}
      />
    </Sphere>
  );
}

// Main 3D Scene Component
function Scene3D() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.2} />
      
      {/* Directional light for depth */}
      <directionalLight position={[10, 10, 5]} intensity={0.3} color="#fbbf24" />
      
      {/* Point lights for dynamic lighting */}
      <pointLight position={[-10, -10, -5]} intensity={0.2} color="#f59e0b" />
      <pointLight position={[10, -10, 5]} intensity={0.2} color="#fbbf24" />
      
      {/* Floating Cubes */}
      <FloatingCube position={[-8, 2, -5]} rotationSpeed={0.02} floatSpeed={0.8} />
      <FloatingCube position={[6, -1, -3]} rotationSpeed={0.015} floatSpeed={0.6} />
      <FloatingCube position={[-4, 3, -7]} rotationSpeed={0.025} floatSpeed={0.7} />
      <FloatingCube position={[8, 1, -4]} rotationSpeed={0.018} floatSpeed={0.9} />
      <FloatingCube position={[-6, -2, -6]} rotationSpeed={0.022} floatSpeed={0.5} />
      <FloatingCube position={[4, 4, -2]} rotationSpeed={0.019} floatSpeed={0.8} />
      
      {/* Floating Spheres */}
      <FloatingSphere position={[-3, 1, -4]} size={0.4} />
      <FloatingSphere position={[7, -1, -5]} size={0.3} />
      <FloatingSphere position={[-7, 2, -3]} size={0.35} />
      <FloatingSphere position={[3, 3, -6]} size={0.25} />
      
      {/* Animated Lines connecting elements */}
      <AnimatedLine start={[-8, 2, -5]} end={[6, -1, -3]} />
      <AnimatedLine start={[-4, 3, -7]} end={[8, 1, -4]} />
      <AnimatedLine start={[-6, -2, -6]} end={[4, 4, -2]} />
      <AnimatedLine start={[-3, 1, -4]} end={[7, -1, -5]} />
      <AnimatedLine start={[-7, 2, -3]} end={[3, 3, -6]} />
      
      {/* Additional connecting lines */}
      <AnimatedLine start={[-8, 2, -5]} end={[-3, 1, -4]} />
      <AnimatedLine start={[6, -1, -3]} end={[7, -1, -5]} />
      <AnimatedLine start={[-4, 3, -7]} end={[-7, 2, -3]} />
      <AnimatedLine start={[8, 1, -4]} end={[3, 3, -6]} />
    </>
  );
}

// Main Background Component
export default function HeroBackground3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene3D />
        {/* Disable orbit controls for fixed camera */}
        {/* <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} /> */}
      </Canvas>
    </div>
  );
}
