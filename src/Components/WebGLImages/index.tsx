"use client";
import { Fragment, memo, use } from "react";
import { Canvas } from "@react-three/fiber";
import { Camera } from "./Camera";
import {
  WebGLImagesContext,
  WebGLImagesContextProps,
  WebGLImagesContextProvider,
} from "./Context";
import { GLImage, IGLImageComponent } from "./GLImage";
import "./styles.scss";

const WebGLImagesRenderer = memo(function WebGLImagesRenderer(
  props: IGLImageComponent,
) {
  const { images } = use(WebGLImagesContext);
  return (
    <Fragment>
      <Camera />
      {images.map((image, i) => (
        <GLImage key={i} {...image} {...props} />
      ))}
    </Fragment>
  );
});

export function WebGLImages({ ImageComponent, ...props }: Props) {
  return (
    <div className="webgl-images">
      <Canvas linear gl={{ antialias: true, alpha: true }}>
        <WebGLImagesContextProvider {...props}>
          <WebGLImagesRenderer ImageComponent={ImageComponent} />
        </WebGLImagesContextProvider>
      </Canvas>
    </div>
  );
}

export interface Props
  extends Omit<WebGLImagesContextProps, "children">,
    IGLImageComponent {}

export * from "./GLImage";
