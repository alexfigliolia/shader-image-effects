import { Effect } from "postprocessing";
import React, { ForwardedRef, forwardRef, useMemo } from "react";
import { Object3D, Uniform, WebGLRenderer, WebGLRenderTarget } from "three";
import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

class ScrollDistortion extends Effect {
  public uTime = 0;
  constructor({ uDiffuse = null, uTime = 0 }: Props = {}) {
    super("ScrollDistortion", fragmentShader, {
      vertexShader,
      uniforms: new Map([
        ["uTime", new Uniform(uTime)],
        ["uDiffuse", new Uniform(uDiffuse)],
      ]),
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

export const ScrollDistortionEffect = forwardRef(
  function ScrollDistortionEffect(
    { uDiffuse = null }: Omit<Props, "uTime">,
    ref: ForwardedRef<Object3D>,
  ) {
    const effect = useMemo(
      () => new ScrollDistortion({ uDiffuse }),
      [uDiffuse],
    );
    return <primitive ref={ref} object={effect} dispose={null} />;
  },
);

interface Props {
  uDiffuse?: any;
  uTime?: number;
}
