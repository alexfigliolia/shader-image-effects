import { ComponentType, RefObject } from "react";
import { Mesh } from "three";
import { Image } from "@react-three/drei";
import { IImage } from "./Controller";
import { useImagePosition } from "./useImagePosition";

export const GLImage = ({ ImageComponent = Image, ...props }: Props) => {
  const { ref, XPosition, YPosition, width, height } = useImagePosition(props);
  return (
    <ImageComponent
      // @ts-ignore
      ref={ref}
      position-z={0}
      url={props.image.src}
      position-x={XPosition}
      position-y={YPosition}
      scale={[width, height]}
    />
  );
};

export interface IGLImageComponent {
  ImageComponent?: ComponentType<PositionalProps>;
}

interface Props extends IImage, IGLImageComponent {}

export interface PositionalProps {
  ref: RefObject<Mesh<any, any>>;
  "position-z": 0;
  url: string;
  "position-x": number;
  "position-y": number;
  scale: [number, number];
}
