import { useCallback, useMemo, useRef } from "react";
import { Mesh, ShaderMaterial, Vector2 } from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { PositionalProps } from "Components/WebGLImages";
import { WebGLImageGenerator } from "HOCs/WebGLImageGenerator";
import { mergeRefs } from "Tools/mergeRefs";
import { Callback } from "Types/Generics";
import fragmentShader from "./fragment.glsl";
import { Geometry } from "./Geometry";
import vertexShader from "./vertex.glsl";

const DEFAULT_MOUSE_COORDINATES = new Vector2(0.5, 0.5);

const WaveImageMesh = WebGLImageGenerator(
  {
    uTime: 0,
    uHoverState: 0,
    uXPointerFromCenter: 0,
    uMouseCoordinates: DEFAULT_MOUSE_COORDINATES.clone(),
  },
  vertexShader,
  fragmentShader,
);

export const GLWaveImage = ({ ref, ...props }: PositionalProps) => {
  const mesh = useRef<Mesh>(null);
  const cacheMeshInstance = useMemo(() => mergeRefs(ref, mesh), [ref]);

  const withMesh = useCallback((fn: Callback<[Mesh]>) => {
    if (!mesh.current) {
      return;
    }
    fn(mesh.current);
  }, []);

  const withMaterial = useCallback(
    (fn: Callback<[IWaveShaderMaterial]>) => {
      withMesh(mesh => {
        fn(mesh.material as unknown as IWaveShaderMaterial);
      });
    },
    [withMesh],
  );

  useFrame((_, delta) => {
    withMaterial(material => {
      material.uniforms.uTime.value = material.uniforms.uTime.value + delta;
    });
  });

  const onPointerEnter = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      const position = Geometry.pointerPosition(e);
      withMaterial(material => {
        Geometry.transitionUniforms([[material.uniforms.uHoverState, 1]]);
        Geometry.transitionVector2(
          material.uniforms.uMouseCoordinates.value,
          position,
        );
      });
    },
    [withMaterial],
  );

  const onPointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      const { x, y, position } = Geometry.pointerEventFromCenter(e);
      withMaterial(material => {
        Geometry.transitionVector2(
          material.uniforms.uMouseCoordinates.value,
          position,
          0.25,
        );
        Geometry.transitionUniforms([
          [material.uniforms.uXPointerFromCenter, x],
        ]);
      });
      withMesh(mesh => {
        Geometry.rotateMesh(mesh, x * 0.1, y * -0.25);
      });
    },
    [withMesh, withMaterial],
  );

  const onPointerOut = useCallback(() => {
    withMaterial(material => {
      Geometry.transitionUniforms([
        [material.uniforms.uHoverState, 0],
        [material.uniforms.uXPointerFromCenter, 0],
      ]);
      Geometry.transitionVector2(
        material.uniforms.uMouseCoordinates.value,
        DEFAULT_MOUSE_COORDINATES,
        0.25,
      );
    });
    withMesh(mesh => {
      Geometry.rotateMesh(mesh, 0, 0);
    });
  }, [withMesh, withMaterial]);

  return (
    <WaveImageMesh
      {...props}
      segments={100}
      ref={cacheMeshInstance}
      onPointerOut={onPointerOut}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
    />
  );
};

type IWaveShaderMaterial = ShaderMaterial & {
  uTime: number;
  uXPointerFromCenter: number;
  uHoverState: number;
  uMouseCoordinates: Vector2;
};
