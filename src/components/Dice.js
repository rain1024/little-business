import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Dice({ number, rolling }) {
  const meshRef = useRef();

  const targetRotation = {
    1: [0, 0, 0],
    2: [Math.PI / 2, 0, 0],
    3: [0, -Math.PI / 2, 0],
    4: [0, Math.PI / 2, 0],
    5: [-Math.PI / 2, 0, 0],
    6: [0, Math.PI, 0],
  }[number] || [0, 0, 0];

  const materials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color: "#FF1493" }), // right
      new THREE.MeshStandardMaterial({ color: "#FF1493" }), // left
      new THREE.MeshStandardMaterial({ color: "#FF1493" }), // top
      new THREE.MeshStandardMaterial({ color: "#FF1493" }), // bottom
      new THREE.MeshStandardMaterial({ color: "#FF1493" }), // front
      new THREE.MeshStandardMaterial({ color: "#FF1493" }), // back
    ],
    []
  );

  // Tạo material cho các chấm lõm
  const dotMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#000000",
        metalness: 0.1,
        roughness: 0.8,
        side: THREE.DoubleSide,
        depthWrite: true,
        depthTest: true,
        transparent: false,
        opacity: 1,
      }),
    []
  );

  useFrame((state, delta) => {
    if (rolling) {
      meshRef.current.rotation.x += delta * 5;
      meshRef.current.rotation.y += delta * 3;
      meshRef.current.rotation.z += delta * 4;
    } else {
      meshRef.current.rotation.x +=
        (targetRotation[0] - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y +=
        (targetRotation[1] - meshRef.current.rotation.y) * 0.1;
      meshRef.current.rotation.z +=
        (targetRotation[2] - meshRef.current.rotation.z) * 0.1;
    }
  });

  return (
    <>
      {/* Lights */}
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-5, 3, 0]} intensity={0.7} color="#ffcce6" />
      <ambientLight intensity={0.5} />

      {/* Main dice cube */}
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        {materials.map((material, index) => (
          <primitive
            object={material}
            attach={`material-${index}`}
            key={index}
          />
        ))}

        {/* Front face dots (1) */}
        <group position={[0, 0, 0.501]}>
          <mesh position={[0, 0, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
        </group>

        {/* Back face dots (6) */}
        <group position={[0, 0, -0.501]} rotation={[0, Math.PI, 0]}>
          <mesh position={[-0.25, 0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[0.25, 0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.25, -0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[0, -0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[0.25, -0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
        </group>

        {/* Right face dots (4) */}
        <group position={[0.501, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <mesh position={[-0.25, 0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.25, -0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[0.25, 0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[0.25, -0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
        </group>

        {/* Left face dots (3) */}
        <group position={[-0.501, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh position={[0.25, 0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.25, -0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
        </group>

        {/* Top face dots (2) */}
        <group position={[0, 0.501, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh position={[-0.25, 0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[0.25, -0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
        </group>

        {/* Bottom face dots (5) */}
        <group position={[0, -0.501, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh position={[-0.25, 0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[0.25, 0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.25, -0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
          <mesh position={[0.25, -0.25, 0]} scale={[1, 1, -1]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <primitive object={dotMaterial} attach="material" />
          </mesh>
        </group>
      </mesh>
    </>
  );
}
