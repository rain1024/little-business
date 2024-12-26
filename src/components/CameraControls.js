import { useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect } from "react";

// Extend OrbitControls to make it available as a JSX element
extend({ OrbitControls });

export function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, domElement);
    controls.enableZoom = false;
    return () => controls.dispose();
  }, [camera, domElement]);

  return null;
}
