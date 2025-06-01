import { BlendFunction, Effect } from "postprocessing";
import React, { ForwardedRef, forwardRef, useMemo } from "react";
import { Object3D, Uniform, WebGLRenderer, WebGLRenderTarget } from "three";
import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

class WaterEffect extends Effect {
  public uTime = 0;
  constructor({ uTime = 0, blendFunction = BlendFunction.NORMAL }: Props = {}) {
    super("WaterEffect", fragmentShader, {
      vertexShader,
      blendFunction,
      uniforms: new Map([["uTime", new Uniform(uTime)]]),
    });
    this.uTime = uTime;
  }

  override update(
    _renderer: WebGLRenderer,
    _inputBuffer: WebGLRenderTarget,
    deltaTime: number = 0,
  ): void {
    this.uTime += deltaTime;
    this.uniforms.set("uTime", new Uniform(this.uTime));
  }
}

export const WaterEffectEffect = forwardRef(function WaterEffectEffect(
  { blendFunction = BlendFunction.NORMAL }: Omit<Props, "uTime">,
  ref: ForwardedRef<Object3D>,
) {
  const effect = useMemo(
    () => new WaterEffect({ blendFunction }),
    [blendFunction],
  );
  return <primitive ref={ref} object={effect} dispose={null} />;
});

interface Props {
  uTime?: number;
  blendFunction?: BlendFunction;
}
