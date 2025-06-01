import { createContext, useEffect, useMemo, useState } from "react";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";
import { IImage, IScrollJacker, WebGLImagesController } from "./Controller";

export const WebGLImagesContext = createContext<IWebGLImagesContext>({
  controller: new WebGLImagesController({
    parent: "main",
    target: "#target",
  }),
  images: [],
});

export const WebGLImagesContextProvider = ({
  target,
  parent,
  lerpBy,
  onReady,
  children,
}: WebGLImagesContextProps) => {
  const [images, setImages] = useState<IImage[]>([]);
  const controller = useMemo(
    () => new WebGLImagesController({ target, parent, lerpBy }),
    [target, parent, lerpBy],
  );

  useEffect(() => {
    let invoked = false;
    controller.initialize(images => {
      setImages(images);
      if (!invoked && onReady) {
        invoked = true;
        setTimeout(onReady, 100);
      }
    });
    return () => {
      controller.destroy();
    };
  }, [controller, onReady]);

  const value = useMemo(() => ({ images, controller }), [images, controller]);

  return <WebGLImagesContext value={value}>{children}</WebGLImagesContext>;
};

export interface WebGLImagesContextProps
  extends IScrollJacker,
    OptionalChildren {
  onReady?: Callback;
}

export interface IWebGLImagesContext {
  images: IImage[];
  controller: WebGLImagesController;
}
