import { Effect } from "postprocessing";
import React, { ForwardedRef, forwardRef, useMemo } from "react";
import { Object3D } from "three";
import { Propless } from "Types/React";
import fragmentShader from "./fragment.glsl";

class WaveOut extends Effect {
  public uTime = 0;
  constructor() {
    super("WaveOut", fragmentShader);
  }
}

export const WaveOutEffect = forwardRef(function WaveOutEffect(
  _: Propless,
  ref: ForwardedRef<Object3D>,
) {
  const effect = useMemo(() => new WaveOut(), []);
  return <primitive ref={ref} object={effect} dispose={null} />;
});
