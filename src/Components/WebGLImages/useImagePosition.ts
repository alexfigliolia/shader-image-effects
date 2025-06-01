import { use, useCallback, useEffect, useMemo, useRef } from "react";
import { Mesh } from "three";
import { useWindowSize } from "Hooks/useWindowSize";
import { WebGLImagesContext } from "./Context";
import { IImage } from "./Controller";

export const useImagePosition = <T extends Mesh>({
  top,
  left,
  width,
  height,
}: IImage) => {
  const ref = useRef<T>(null);
  const { controller } = use(WebGLImagesContext);
  const { width: vpWidth, height: vpHeight } = useWindowSize();

  const XPosition = useMemo(
    () => left - vpWidth / 2 + width / 2,
    [vpWidth, width, left],
  );
  const YPosition = useMemo(
    () => -top + vpHeight / 2 - height / 2,
    [top, height, vpHeight],
  );

  const onPositionChange = useCallback(
    (scrollPosition: number) => {
      if (!ref.current?.position) {
        return;
      }
      ref.current.position.set(XPosition, YPosition + scrollPosition, 0);
      ref.current.scale.set(width, height, 1);
      ref.current.updateMatrixWorld();
    },
    [XPosition, YPosition, width, height],
  );

  useEffect(() => {
    const ID = controller.onScroll(onPositionChange);
    return () => {
      controller.offScroll(ID);
    };
  }, [onPositionChange, controller]);

  return useMemo(
    () => ({
      ref,
      width,
      height,
      XPosition,
      YPosition,
    }),
    [XPosition, YPosition, width, height],
  );
};
