import { useRef, useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, Cylinder, Box, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { CSG } from "three-csg-ts";

export function Dice({ number, rolling }) {
  const meshRef = useRef();

  // Move rotation mapping to useMemo to prevent recalculation
  const targetRotation = useMemo(
    () => ({
      1: [0, 0, 0],
      2: [Math.PI / 2, 0, 0],
      3: [0, -Math.PI / 2, 0],
      4: [0, Math.PI / 2, 0],
      5: [-Math.PI / 2, 0, 0],
      6: [0, Math.PI, 0],
    }),
    []
  );

  // Memoize materials với các lỗ cho chấm
  const materials = useMemo(
    () =>
      Array(6)
        .fill()
        .map(
          () =>
            new THREE.MeshStandardMaterial({
              color: "#FF1493",
              roughness: 0.3,
              metalness: 0.2,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 1,
              depthWrite: true,
              // Thêm clipIntersection và clippingPlanes
              clipIntersection: true,
              clippingPlanes: [
                new THREE.Plane(new THREE.Vector3(0, 0, 1), 0.5),
              ],
            })
        ),
    []
  );

  // Memoize dot material as an actual material instance
  const dotMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#000000",
        metalness: 0.1,
        roughness: 0.5,
      }),
    []
  );

  // Memoize dot configurations for each face
  const dotConfigs = useMemo(
    () => ({
      front: [[0, 0]],
      back: [
        [-0.25, 0.25],
        [0, 0.25],
        [0.25, 0.25],
        [-0.25, -0.25],
        [0, -0.25],
        [0.25, -0.25],
      ],
      right: [
        [-0.25, 0.25],
        [-0.25, -0.25],
        [0.25, 0.25],
        [0.25, -0.25],
      ],
      left: [
        [0.25, 0.25],
        [0, 0],
        [-0.25, -0.25],
      ],
      top: [
        [-0.25, 0.25],
        [0.25, -0.25],
      ],
      bottom: [
        [-0.25, 0.25],
        [0.25, 0.25],
        [0, 0],
        [-0.25, -0.25],
        [0.25, -0.25],
      ],
    }),
    []
  );

  // Memoize the Dot component
  const Dot = useCallback(
    ({ position, rotation }) => (
      <Sphere
        position={[...position.slice(0, 2), position[2]]}
        rotation={rotation}
        args={[0.08, 32, 32]}
        material={dotMaterial}
        onBeforeRender={(renderer) => {
          renderer.localClippingEnabled = true;
        }}
      />
    ),
    [dotMaterial]
  );

  // Tạo geometry cho dice và dots
  const diceGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const dotGeometry = useMemo(() => new THREE.SphereGeometry(0.15, 32, 32), []);

  // Tạo mesh cho dice
  const diceMesh = useMemo(() => {
    // Tạo mesh chính với material cơ bản
    const mesh = new THREE.Mesh(
      diceGeometry,
      new THREE.MeshStandardMaterial({
        color: "#FF1493",
        roughness: 0.3,
        metalness: 0.2,
      })
    );

    // Tạo các chấm với kích thước nhỏ hơn và độ sâu phù hợp
    const dots = {
      front: dotConfigs.front.map(([x, y]) => {
        const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
        dotMesh.position.set(x, y, 0.5);
        dotMesh.scale.set(1, 1, 0.5); // Giảm độ sâu của lỗ
        return dotMesh;
      }),
      back: dotConfigs.back.map(([x, y]) => {
        const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
        dotMesh.position.set(x, y, -0.5);
        return dotMesh;
      }),
      right: dotConfigs.right.map(([x, y]) => {
        const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
        dotMesh.position.set(0.5, y, x);
        return dotMesh;
      }),
      left: dotConfigs.left.map(([x, y]) => {
        const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
        dotMesh.position.set(-0.5, y, x);
        return dotMesh;
      }),
      top: dotConfigs.top.map(([x, y]) => {
        const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
        dotMesh.position.set(x, 0.5, y);
        return dotMesh;
      }),
      bottom: dotConfigs.bottom.map(([x, y]) => {
        const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
        dotMesh.position.set(x, -0.5, y);
        return dotMesh;
      }),
    };

    // Sử dụng CSG để tạo các lỗ
    let diceCsg = CSG.fromMesh(mesh);

    // Đảm bảo các dot mesh được đặt đúng vị trí và hướng
    Object.values(dots).forEach((faceDots) => {
      faceDots.forEach((dotMesh) => {
        const dotCsg = CSG.fromMesh(dotMesh);
        diceCsg = diceCsg.subtract(dotCsg);
      });
    });

    // Convert back to mesh và áp dụng material mới
    const finalMesh = CSG.toMesh(diceCsg, mesh.matrix);
    finalMesh.material = new THREE.MeshStandardMaterial({
      color: "#FF1493",
      roughness: 0.3,
      metalness: 0.2,
    });

    return finalMesh;
  }, [diceGeometry, dotGeometry, dotConfigs, dotMaterial]);

  // Optimize animation frame calculations
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    const currentRotation = mesh.rotation;
    const target = targetRotation[number] || [0, 0, 0];

    if (rolling) {
      currentRotation.x += delta * 5;
      currentRotation.y += delta * 3;
      currentRotation.z += delta * 4;
    } else {
      const lerp = 0.1;
      currentRotation.x += (target[0] - currentRotation.x) * lerp;
      currentRotation.y += (target[1] - currentRotation.y) * lerp;
      currentRotation.z += (target[2] - currentRotation.z) * lerp;
    }
  });

  return (
    <Center>
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-5, 3, 0]} intensity={0.7} color="#ffcce6" />
      <ambientLight intensity={0.5} />

      <group ref={meshRef}>
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial
            color="#FF1493"
            roughness={0.3}
            metalness={0.2}
          />
        </Box>

        {/* Mặt trước */}
        {dotConfigs.front.map((pos, idx) => (
          <Dot
            key={`front-${idx}`}
            position={[pos[0], pos[1], 0.51]}
            rotation={[0, 0, 0]}
          />
        ))}
        {/* Mặt sau */}
        {dotConfigs.back.map((pos, idx) => (
          <Dot
            key={`back-${idx}`}
            position={[pos[0], pos[1], -0.51]}
            rotation={[0, 0, 0]}
          />
        ))}
        {/* Mặt phải */}
        {dotConfigs.right.map((pos, idx) => (
          <Dot
            key={`right-${idx}`}
            position={[0.51, pos[1], pos[0]]}
            rotation={[0, Math.PI / 2, 0]}
          />
        ))}
        {/* Mặt trái */}
        {dotConfigs.left.map((pos, idx) => (
          <Dot
            key={`left-${idx}`}
            position={[-0.51, pos[1], pos[0]]}
            rotation={[0, -Math.PI / 2, 0]}
          />
        ))}
        {/* Mặt trên */}
        {dotConfigs.top.map((pos, idx) => (
          <Dot
            key={`top-${idx}`}
            position={[pos[0], 0.51, pos[1]]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        ))}
        {/* Mặt dưới */}
        {dotConfigs.bottom.map((pos, idx) => (
          <Dot
            key={`bottom-${idx}`}
            position={[pos[0], -0.51, pos[1]]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        ))}
      </group>
    </Center>
  );
}
