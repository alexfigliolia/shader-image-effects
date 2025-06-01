import { use, useMemo } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useWindowSize } from "Hooks/useWindowSize";
import { Propless } from "Types/React";
import { WebGLImagesContext } from "./Context";

const DISTANCE = 600;

export const Camera = (_: Propless) => {
  const { height } = useWindowSize();
  const { controller } = use(WebGLImagesContext);

  const fov = useMemo(
    () => 2 * Math.atan(height / 2 / DISTANCE) * (180 / Math.PI),
    [height],
  );

  useFrame(() => {
    controller.render();
  });

  return <PerspectiveCamera fov={fov} makeDefault position-z={DISTANCE} />;
};
