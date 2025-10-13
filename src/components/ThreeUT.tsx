import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const FloatingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 75000;
    const bounds = 500;
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color("#40E0D0"), // Turquoise
      new THREE.Color("#40A0E0"), // Blue
      new THREE.Color("#40E080"), // Spring Green
    ];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * bounds;
      const y = (Math.random() - 0.5) * bounds;
      const z = (Math.random() - 0.5) * bounds;
      positions.set([x, y, z], i * 3);

      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors.set([chosenColor.r, chosenColor.g, chosenColor.b], i * 3);
    }
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.02; 
      pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.02; 
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* --- FIX START --- */}
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        {/* --- FIX END --- */}
      </bufferGeometry>
      <pointsMaterial
        size={0.2} 
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// --- No changes needed for the components below ---

const ScrollCamera = () => {
  const { camera } = useThree();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((_, delta) => {
    const targetZ = 60 - (scrollY / window.innerHeight) * 40;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3, delta);
  });

  return null;
};

const FloatingParticlesScroll = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 60], fov: 60 }}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.5} />
        <ScrollCamera />
        <FloatingParticles />
      </Canvas>
    </div>
  );
};

export default FloatingParticlesScroll;